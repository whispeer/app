import * as Bluebird from "bluebird"
import { File } from '@ionic-native/file'

import Cache from "../services/Cache"
import h from "../helper/helper"

const file = new File()
const readFileAsBlob = (path, fileName, type) =>
	file.readAsArrayBuffer(path, fileName).then((buf) => new Blob([buf], { type }))
const writeToFile = (path, fileName, data: Blob) =>
	file.writeFile(path, fileName, data)
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
		return Bluebird.try(async () => {
			const blobID = blob.getBlobID()

			if (!blob.isDecrypted()) {
				throw new Error("trying to store an undecrypted blob")
			}

			const path = file.cacheDirectory
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
			const path = file.cacheDirectory
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
			const path = file.cacheDirectory
			const filename = idToFileName(blobID)
			const blob = await readFileAsBlob(path, filename, "")
			return { blob, blobID, decrypted: true, meta: {} }
		})
	}
}

export default blobCache

// delete previous cache
;(new Cache("blobs")).deleteAll()

