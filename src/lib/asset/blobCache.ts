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

const writeToFile = (path, fileName, data: Blob) => file.writeFile(path, fileName, data)

const existsFile = (path, fileName) =>
	file.checkFile(path, fileName).catch((e) => {
		if (e.code === 1) {
			return false
		}

		return Bluebird.reject(e)
	})

const idToFileName = (blobID) => `${blobID}.blob`

const blobCache = {
	moveFileToBlob: (fileDirectory, fileName, blobID) => {
		return file.moveFile(fileDirectory, fileName, file.cacheDirectory, idToFileName(blobID))
	},

	store: (blob) => {
		// can throw
		return Bluebird.try(async () => {
			const blobID = blob.getBlobID()

			if (!blob.isDecrypted()) {
				throw new Error("trying to store an undecrypted blob")
			}

			const path = file.cacheDirectory
			const filename = idToFileName(blobID)

			const exists = await existsFile(path, filename)

			if (!exists) {
				console.info('saving blob...')
				await writeToFile(path, filename, blob.getBlobData())
				console.info('blob saved')
			}

			console.info(`blob is in ${filename}`)
			return `${path}${filename}`

		})
	},

	getBlobUrl: (blobID) => {
		// can throw
		return Bluebird.try(async () => {
			const path = file.cacheDirectory
			const filename = idToFileName(blobID)
			const exists = await existsFile(path, filename)

			if (!exists) {
				console.warn(`cannot get blob url, blob does not exist: ${filename}`)
				throw new Error(`cannot get blob url, blob does not exist: ${filename}`)
			}

			return `${path}${filename}`
		})
	},

	isLoaded: (blobID) => blobCache.getBlobUrl(blobID).then(() => true).catch(() => false),

	get: (blobID) => {

		return Bluebird.try(async () => {
			const path = file.cacheDirectory
			const filename = idToFileName(blobID)

			console.warn(`reading blob from file ${filename}...`)
			const blob = await readFileAsBlob(path, filename, "")
			console.warn(`successfully read blob from file ${filename}...`)

			return { blob, blobID, decrypted: true, meta: {} }
		})
	}
}

export default blobCache
