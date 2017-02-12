import { Component, Input } from "@angular/core";

import { DomSanitizer } from '@angular/platform-browser';

import errorService from "../../assets/services/error.service";
const blobService = require("../../assets/services/blobService");

import * as Bluebird from "bluebird";

@Component({
	selector: "gallery",
	templateUrl: "gallery.html"
})
export class GalleryComponent {
	@Input() images;

	previewChunk: number = 2
	preview: number = this.previewChunk;

	constructor(private sanitizer:DomSanitizer){}

	loadImage(data) {
		const blobid = data.blobID;

		if (data.loaded) {
			return;
		}

		data.loading = true;
		data.decrypting = false;
		data.downloading = false;

		let blob;
		Bluebird.try(() => {
			data.downloading = true;
			return blobService.getBlob(blobid);
		}).then((_blob) => {
			data.downloading = false;
			data.decrypting = true;
			blob = _blob;
			return blob.decrypt();
		}).then(() => {
			return blob.toURL();
		}).then((url) => {
			data.loading = false;
			data.decrypting = false;
			data.loaded = true;
			data.url = this.sanitizer.bypassSecurityTrustUrl(url);
		}).catch(errorService.criticalError);
	}

	loadImagePreviews(images) {
		images.forEach((image) => {
			if (image.upload) {
				return;
			}

			this.loadImage(image.lowest);
		});
	}

	loadMoreImages() {
		this.loadImagePreviews(this.images.slice(this.preview, this.preview + this.previewChunk));
		this.preview += this.previewChunk;
	}

	runGif() {
		return false;
	}

	ngOnInit() {
		console.warn(this.images);
		this.loadImagePreviews(this.images.slice(0, this.preview));
	}

	ngOnDestroy() {
	}
}
