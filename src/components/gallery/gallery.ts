import { Component, Input } from "@angular/core";

import { DomSanitizer } from '@angular/platform-browser';

import errorService from "../../lib/services/error.service";
const blobService = require("../../lib/services/blobService");

import * as Bluebird from "bluebird";

import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
	selector: "gallery",
	templateUrl: "gallery.html"
})
export class GalleryComponent {
	_images;

	@Input() set images(value: string) {
		this._images = value;

		this.loadPreviews()
	}

	get images(): string {
		return this._images;
	}

	previewChunk: number = 2
	preview: number = this.previewChunk;

	constructor(private sanitizer:DomSanitizer, private photoViewer: PhotoViewer){}

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
			if (image.upload && typeof image.lowest.url === "string") {
				image.highest.url = this.sanitizer.bypassSecurityTrustUrl(image.highest.url);
				image.lowest.url = this.sanitizer.bypassSecurityTrustUrl(image.lowest.url);
				return;
			}

			if (!image.lowest.url && image.lowest.width && image.lowest.height) {
				const canvas = document.createElement("canvas");

				canvas.width = image.lowest.width
				canvas.height = image.lowest.height

				image.lowest.url = this.sanitizer.bypassSecurityTrustUrl(canvas.toDataURL())
			}

			this.loadImage(image.lowest);
		});
	}

	displayImage = (image) => {
		if (image.upload) {
			this.photoViewer.show(image.upload._file.originalUrl);
			return;
		}

		const blobID = image.lowest.blobID;

		blobService.getBlob(blobID).then((blob) => {
			return blob.decrypt().then(() => {
				return blob.getStringRepresentation();
			});
		}).then((base64) => {
			this.photoViewer.show(base64);
		});
	}

	loadMoreImages() {
		this.loadImagePreviews(this.images.slice(this.preview, this.preview + this.previewChunk));
		this.preview += this.previewChunk;
	}

	runGif() {
		return false;
	}

	loadPreviews() {
		this.loadImagePreviews(this.images.slice(0, this.preview));
	}

	ngOnInit() {
		this.loadPreviews()
	}
}
