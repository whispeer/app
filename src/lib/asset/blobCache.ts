import * as Bluebird from "bluebird"
import { File } from '@ionic-native/file';

import Cache from "../services/Cache"
import h from "../helper/helper"

const cache = new Cache("blobs");

const uriToBlob = (blob) => {
	if (typeof blob === "string") {
		return h.dataURItoBlob(blob);
	}

	return blob
}

cache.deleteAll()

const file = new File()

const readFileAsBlob = (path, fileName, type) => file.readAsArrayBuffer(path, fileName).then((buf) => new Blob([buf], { type }))
const readFileAsJSON = (path, fileName) => file.readAsText(path, fileName).then((text) => JSON.parse(text))

const writeBlobToFile = (path, fileName, data: Blob) => file.writeFile(path, fileName, data)
const writeJSONToFile = (path, fileName, data) => file.writeFile(path, fileName, JSON.stringify(data))

const generateInfoFileName = (blobID) => `cache-blob-info-${blobID}`

const blobCache = {
	store: (blob) => {
		const blobID = blob.getBlobID()

		const info = {
			meta: blob.getMeta(),
			decrypted: blob.isDecrypted(),
			path: file.cacheDirectory,
			file: `cache-blob-file-${blobID}`
		}

		const infoFileName = generateInfoFileName(blobID)

		return Bluebird.try(async () => {
			const exists = await file.checkFile(file.cacheDirectory, infoFileName)

			if (exists) {
				debugger
				return
			}

			await writeBlobToFile(info.path, info.file, blob.getBlobData())
			await writeJSONToFile(info.path, infoFileName, info)
		})
	},
	get: (blobID) => {
		const fileName = generateInfoFileName(blobID)

		return Bluebird.try(async () => {
			const exists = await file.checkFile(file.cacheDirectory, fileName)

			if (!exists) {
				throw new Error(`blob cache miss for ${blobID}`);
			}

			const fileInfo = await readFileAsJSON(file.cacheDirectory, fileName)

			const blob = await readFileAsBlob(fileInfo.path, fileInfo.file, "")

			return {
				blob,
				blobID,
				meta: fileInfo.meta
			}
		})
	}
}

export default blobCache
