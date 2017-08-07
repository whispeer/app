import * as Bluebird from "bluebird"
import { File } from '@ionic-native/file';

import Cache from "../services/Cache"
import h from "../helper/helper"

const FILE = new File()
const PATH = `${FILE.cacheDirectory}/Blobs`

const readFileAsBlob = (path, fileName, type) =>
	FILE.readAsArrayBuffer(path, fileName)
		.then((buf) => new Blob([buf], { type }))

const writeToFile = (path, fileName, data: Blob) =>
	FILE.writeFile(path, fileName, data)

const existsFile = (path, fileName) =>
	FILE.checkFile(path, fileName).catch(e =>
		e.code === 1 ? false : Bluebird.reject(e))

const blobCache = {

	store: (blob) => Bluebird.try( async () => {
		const blobID = blob.getBlobID()
		const filename = `${blobID}.blob`
		const exists = await existsFile(PATH, filename)
		if (!blob.isDecrypted()) {
			console.warn('Cannot store an encrypted blob')
			throw new Error('Cannot store an encrypted blob')
		}
		if (!exists) {
			console.info('saving blob...')
			await writeToFile(PATH, filename, blob.getBlobData())
			console.info('blob saved')
		}
		console.info(`blob is in ${filename}`)
		return `${filename}`
	}),

	getBlobUrl: (blobID) => Bluebird.try( async () => {
		const filename = `${blobID}.blob`
		const exists = await existsFile(PATH, filename)
		if (!exists) {
			console.warn(`cannot get blob url, blob does not exist: ${filename}`)
			throw new Error(`cannot get blob url, blob does not exist: ${filename}`)
		}
		return `${PATH}${filename}`
	}),

	isLoaded: (blobID) =>
		blobCache.getBlobUrl(blobID).then(() => true).catch(() => false),

	get: (blobID) => Bluebird.try( async () => {
		const filename = `${blobID}.blob`
		console.warn(`reading blob from file ${filename}...`)
		const blob = await readFileAsBlob(PATH, filename, "")
		console.warn(`successfully read blob from file ${filename}...`)
		return { blob, blobID, decrypted: true, meta: {} }
	})
}

export default blobCache

// empty legacy cache
;(new Cache("blobs")).deleteAll()
