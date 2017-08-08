import * as Bluebird from "bluebird"
import { File } from '@ionic-native/file'

import Cache from "../services/Cache"
import h from "../helper/helper"

const BLOB_CACHE_DIR = "blobCache"
const FILE = new File()

const readFileAsBlob = (path, filename, type) =>
	FILE.readAsArrayBuffer(path, filename).then((buf) => new Blob([buf], { type }))
const writeToFile = (path, filename, data: Blob) =>
	FILE.writeFile(path, filename, data)
const existsFile = (path, filename) =>
	FILE.checkFile(path, filename).catch((e) => {
		if (e.code === 1) {
			return false
		}
		return Bluebird.reject(e)
	})

const idToFileName = (blobID) => `${blobID}.blob`
const getCacheDirectory = () => {
	return Bluebird.resolve(FILE.cacheDirectory)
}

const blobCache = {

	clear: () => {
		console.error('Clearing the cache is not implemented')
	},

	moveFileToBlob: (currentDirectory, currentFilename, blobID) => {
		return Bluebird.try(async () => {
			const path = await getCacheDirectory()
			const filename = idToFileName(blobID)
			return FILE.moveFile(currentDirectory, currentFilename, path, filename)
		})
	},

	store: (blob) => {
		return Bluebird.try(async () => {
			const blobID = blob.getBlobID()

			if (!blob.isDecrypted()) {
				throw new Error("trying to store an undecrypted blob")
			}

			const path = await getCacheDirectory()
			const filename = idToFileName(blobID)
			const exists = await existsFile(path, filename)

			if (!exists) {
				await writeToFile(path, filename, blob.getBlobData())
			}

			return `${path}${filename}`

		})
	},

	getBlobUrl: (blobID) => {
		return Bluebird.try(async () => {
			const path = await getCacheDirectory()
			const filename = idToFileName(blobID)
			const exists = await existsFile(path, filename)

			if (!exists) {
				throw new Error(`cannot get blob url, blob does not exist: ${filename}`)
			}

			return `${path}${filename}`
		})
	},

	isLoaded: (blobID) => blobCache.getBlobUrl(blobID).then(() => true).catch(() => false),

	get: (blobID) => {

		return Bluebird.try(async () => {
			const path = await getCacheDirectory()
			const filename = idToFileName(blobID)
			const blob = await readFileAsBlob(path, filename, "")
			return { blob, blobID, decrypted: true, meta: {} }
		})
	}
}

export default blobCache

// delete previous cache
;(new Cache("blobs")).deleteAll()

