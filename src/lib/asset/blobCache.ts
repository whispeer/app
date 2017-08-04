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

const existsFile = (path, fileName) =>
	file.checkFile(path, fileName).catch((e) => {
		if (e.code === 1) {
			return false
		}

		return Bluebird.reject(e)
	})

const blobInfoMatches = (info, storedBlobInfo) => {
	return h.deepEqual(info.meta, storedBlobInfo.meta)
}

const writeCacheInfoFile = (blobID, info) =>
	writeJSONToFile(file.cacheDirectory, generateInfoFileName(blobID), info)

const readCacheInfoFile = (blobID) =>
	readFileAsJSON(file.cacheDirectory, generateInfoFileName(blobID))

const removeCacheInfoFile = (blobID) =>
	file.removeFile(file.cacheDirectory, generateInfoFileName(blobID))

const existsCacheInfoFile = (blobID) =>
	existsFile(file.cacheDirectory, generateInfoFileName(blobID))

const blobCache = {
	store: (blob) => {
		return Bluebird.try(async () => {
			const blobID = blob.getBlobID()

			if (!blob.isDecrypted()) {
				throw new Error("trying to store an undecrypted blob")
			}

			const info = {
				meta: blob.getMeta(),
				path: file.cacheDirectory,
				file: `cache-blob-file-${blobID}`
			}

			const exists = await existsCacheInfoFile(blobID)

			if (exists) {
				const storedBlobInfo = await readCacheInfoFile(blobID)
				const storedBlobExists = await existsFile(storedBlobInfo.path, storedBlobInfo.file)

				if (storedBlobExists && blobInfoMatches(info, storedBlobInfo)) {
					return `${storedBlobInfo.path}${storedBlobInfo.file}`
				}

				await removeCacheInfoFile(blobID)
				await file.removeFile(storedBlobInfo.path, storedBlobInfo.file)

				await writeBlobToFile(storedBlobInfo.path, storedBlobInfo.file, blob.getBlobData())

				info.file = storedBlobInfo.file
				info.path = storedBlobInfo.path
			} else {
				await writeBlobToFile(info.path, info.file, blob.getBlobData())
			}

			await writeCacheInfoFile(blobID, info)

			return `${info.path}${info.file}`
		})
	},
	getBlobUrl: (blobID) => {
		return Bluebird.try(async () => {
			const exists = await existsCacheInfoFile(blobID)

			if (!exists) {
				throw new Error("blob not cached")
			}

			const { path, file } = await readCacheInfoFile(blobID)

			const blobFileExists = await existsFile(path, file)

			if (!blobFileExists) {
				await removeCacheInfoFile(blobID)

				throw new Error("blob not cached")
			}

			return `${path}${file}`
		})
	},
	isLoaded: (blobID) => {
		return Bluebird.try(async () => {
			const exists = await existsCacheInfoFile(blobID)

			if (!exists) {
				return false
			}

			const { path, file } = await readCacheInfoFile(blobID)

			const blobFileExists = await existsFile(path, file)

			if (!blobFileExists) {
				await removeCacheInfoFile(blobID)

				return false
			}

			return true
		})
	},
	get: (blobID) => {
		const fileName = generateInfoFileName(blobID)

		return Bluebird.try(async () => {
			const exists = await existsCacheInfoFile(blobID)

			if (!exists) {
				throw new Error(`blob cache miss for ${blobID}`);
			}

			const fileInfo = await readCacheInfoFile(blobID)

			const blob = await readFileAsBlob(fileInfo.path, fileInfo.file, "")

			return {
				blob,
				blobID,
				decrypted: fileInfo.decrypted,
				meta: fileInfo.meta
			}
		})
	}
}

export default blobCache
