import * as Bluebird from "bluebird"
import { File, FileEntry } from '@ionic-native/file'

import Cache from "../services/Cache"
import h from "../helper/helper" // tslint:disable-line:no-unused-variable

const BLOB_CACHE_DIR = "blobCache"
const LOCK_TIMEOUT = 30 * 1000
const FILE = new File()

const isAndroid = () => window.device && window.device.platform === "Android"

export const fixFileReader = () => {
	const win: any = window
	const delegateName = win.Zone.__symbol__('OriginalDelegate')
	if (win.FileReader[delegateName]) {
		console.warn("Fixing file reader!")
		win.FileReader = win.FileReader[delegateName]
	}
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
const writeToFile = (path, filename, data: Blob | string) => {
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
		return Bluebird.try(async () => {
			clearing = true
			await noPendingStorageOperations()
			await FILE.removeRecursively(FILE.cacheDirectory, BLOB_CACHE_DIR)
				.catch(error => {
					// There really is little we can do here, but logouts, e.g., should not
					// fail because we failed to clear.
					console.warn('Cannot remove cache, resolving promise anyway.')
					return true
				})
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

	readFileAsArrayBuffer: (directory: string, name: string) =>
		Bluebird.resolve(FILE.readAsArrayBuffer(directory, name)),

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
			const filename = idToFileName(blobID)
			const exists = await existsFile(path, filename)

			if (!exists) {
				await writeToFile(path, filename, blob.getBlobData())
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

	copyBlobToDownloads: (blobID, filename: string) => {
		return Bluebird.try(async () => {
			const cacheDir = await getCacheDirectory()
			const blobFile = idToFileName(blobID)
			const exists = await existsFile(cacheDir, blobFile)
			const path = isAndroid() ? `${FILE.externalRootDirectory}Download/` : `${FILE.tempDirectory}`

			if (!exists) {
				throw new Error(`cannot copy blob, blob does not exist: ${filename}`)
			}

			await FILE.copyFile(cacheDir, blobFile, path, filename)

			return `${path}${filename}`
		})
	},

	getFileMimeType: (url) => Bluebird.resolve(FILE.resolveLocalFilesystemUrl(url))
		.then((file: FileEntry) => new Bluebird<any>((resolve, reject) => file.file(resolve, reject))
		.then((file) => file.type)),

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
