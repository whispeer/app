import * as Bluebird from "bluebird"
import { File } from '@ionic-native/file'

import Cache from "../services/Cache"
import h from "../helper/helper" // tslint:disable-line:no-unused-variable

const BLOB_CACHE_DIR = "blobCache"
const LOCK_TIMEOUT = 30 * 1000
const FILE = new File()

const fixFileReader = () => {
	const win: any = window
	if (win.FileReader[win.Zone.__symbol__('originalDelegate')])
		win.FileReader = win.FileReader[win.Zone.__symbol__('originalDelegate')]
}

let cacheDirectoryPromise:Bluebird<string> = null
const getCacheDirectory = () => {
	if (!cacheDirectoryPromise) {
		const basePath = FILE.cacheDirectory
		const desiredPath = `${basePath}${BLOB_CACHE_DIR}/`
		cacheDirectoryPromise = Bluebird.resolve(FILE.checkDir(basePath, BLOB_CACHE_DIR)).then(success => {
			return desiredPath
		}).catch(error => {
			return FILE.createDir(basePath, BLOB_CACHE_DIR, true).then(dirEntry => {
				return desiredPath
			}).catch(error => {
				throw new Error('Could not create blob cache directory.')
			})
		})
	}

	return cacheDirectoryPromise
}

const readFileAsBlob = (path, filename, type) => {
	fixFileReader()
	return FILE.readAsArrayBuffer(path, filename).then((buf) => new Blob([buf], { type }))
}
const writeToFile = (path, filename, data: Blob) => {
	fixFileReader()
	return FILE.writeFile(path, filename, data)
}
const existsFile = (path, filename) =>
	FILE.checkFile(path, filename).catch((e) => {
		if (e.code === 1) {
			return false
		}
		return Bluebird.reject(e)
	})

const idToFileName = (blobID) => `${blobID}.blob`

let clearing = false
let storing = 0
const noPendingStorageOperations = () => {
	return new Bluebird((resolve) => {
		const busyWait = setInterval(() => {
			if (storing === 0) {
				resolve()
				clearInterval(busyWait)
			}
		}, 10)
	}).timeout(LOCK_TIMEOUT).catch(Bluebird.TimeoutError, () => {})
}

const blobCache = {

	clear: () => {
		console.log ("clear blobCache")
		return Bluebird.try(async () => {
			clearing = true
			await noPendingStorageOperations()
			console.log ("clear blobCache 2 ")
			await FILE.removeRecursively(FILE.cacheDirectory, BLOB_CACHE_DIR)
				.catch(error => {
					// There really is little we can do here, but logouts, e.g., should not
					// fail because we failed to clear.
					console.warn('Cannot remove cache, resolving promise anyway.')
					return true
				})

			console.log ("clear blobCache 3")
		}).finally(() => clearing = false)
	},

	moveFileToBlob: (currentDirectory, currentFilename, blobID) => {
		return Bluebird.try(async () => {
			if (clearing) throw new Error('Cannot get blob, currently clearing cache.')
			const path = await getCacheDirectory()
			const filename = idToFileName(blobID)
			return FILE.moveFile(currentDirectory, currentFilename, path, filename)
		})
	},

	store: (blob) => {
		return Bluebird.try(async () => {
			if (clearing) throw new Error('Cannot store blob, currently clearing cache.')
			storing++
			console.warn(`storing++ ${storing-1} -> ${storing}, blob: ${blob.getBlobID()}`)
			const blobID = blob.getBlobID()

			if (!blob.isDecrypted()) {
				throw new Error("trying to store an undecrypted blob")
			}

			const path = await getCacheDirectory()
			console.log("getCacheDir", path)
			const filename = idToFileName(blobID)
			const exists = await existsFile(path, filename)
			console.log("existsFile", path, filename, exists)

			if (!exists) {
				console.log("write now!")
				if (storing > 3) {
					debugger
				}
				await writeToFile(path, filename, blob.getBlobData())
				console.log("writeFile")
			}

			return `${path}${filename}`
		}).catch((e) => {
			console.error(e)
			return Bluebird.reject(e)
		}).finally(() => {
			storing--
			console.warn(`storing-- ${storing+1} -> ${storing}, blob: ${blob.getBlobID()}`)
		})
	},

	getBlobUrl: (blobID) => {
		return Bluebird.try(async () => {
			if (clearing) throw new Error('Cannot get blob URL, currently clearing cache.')
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
			if (clearing) throw new Error('Cannot get blob, currently clearing cache.')
			const path = await getCacheDirectory()
			const filename = idToFileName(blobID)
			const blob = await readFileAsBlob(path, filename, "")
			return { blob, blobID, decrypted: true, meta: {} }
		})
	}
}

export default blobCache

// delete previous cache
;(new Cache("blobs")).deleteAll().catch(() => console.warn("Could not delete legacy blobs from idb cache"))
