import * as Bluebird from "bluebird"

type hookType<ObjectType, CachedObjectType> = {
	download: (id: any) => Bluebird<any>,
	load: (response: any) => Bluebird<CachedObjectType>,
	restore: (response: CachedObjectType) => Bluebird<ObjectType>,
	getID: (response: any) => any,
	cacheName: string
}

function createLoader<ObjectType, CachedObjectType>({ download, load, restore, getID, cacheName }: hookType<ObjectType, CachedObjectType>) {
	let loading: { [s: string]: Bluebird<ObjectType> } = {}
	let byId: { [s: string]: ObjectType } = {}

	// const cache = new Cache(cacheName)

	const getFromCache = (id) => Bluebird.reject("getFromCache(id): not yet implemented")

	const storeInCache = (cacheableData) => cacheableData

	const considerLoaded = (id) => {
		loading = { ...loading }
		delete loading[id]
	}

	const cacheInMemory = (id, instance) => {
		byId = {
			...byId,
			[id]: instance
		}

		return instance
	}

	const loadFromCache = (id) => {
		return getFromCache(id)
			.then(restore)
			.then((instance) => cacheInMemory(id, instance))
			.finally(() => considerLoaded(id))
	}

	const serverResponseToInstance = (response, id) => {
		return load(response)
			.then(storeInCache)
			.then(restore)
			.then((instance) => cacheInMemory(id, instance))
			.finally(() => considerLoaded(id))
	}

	return class ObjectLoader {
		static getLoaded(id): ObjectType {
			if (!ObjectLoader.isLoaded(id)) {
				throw new Error(`Not yet loaded: ${id}`)
			}

			return byId[id]
		}

		static isLoaded(id) {
			return byId.hasOwnProperty(id)
		}

		static load(response): Bluebird<ObjectType> {
			const id = getID(response)

			if (byId[id]) {
				return Bluebird.resolve(byId[id])
			}

			if (!loading[id]) {
				let promise = serverResponseToInstance(response, id)

				loading = {
					...loading,
					[id]: promise
				}
			}

			 return loading[id]
		}

		static get(id): Bluebird<ObjectType> {
			if (byId[id]) {
				return Bluebird.resolve(byId[id])
			}

			if (!loading[id]) {
				let promise = download(id).then((response) => serverResponseToInstance(response, id))

				loading = {
					...loading,
					[id]: promise
				}
			}

			 return loading[id]
		}

		static getAll = () => {
			return byId
		}

		static addLoaded = (id, obj: ObjectType) => {
			byId[id] = obj
		}
	}
}

export default createLoader
