import * as Bluebird from "bluebird"

import Cache from "../services/Cache"

// What do we want to achieve and how:

// - Group multiple requests together -> download can do that for itself
// - Add cache info so server does not resend full data (esp. for trustManager) -> activeInstance
// - merge new and active -> restore has active and response
// - cache first then update

enum UpdateEvent {
	wake,
	blink
}

enum UpdateAction {
	Reload,
	DeferredReload
}

const DEFERRED_UPDATE_DELAY = 5000

type hookType<ObjectType, CachedObjectType> = {
	download: (id: string, activeInstance: Optional<ObjectType>) => Bluebird<any>,
	load: (response: any, activeInstance: Optional<ObjectType>) => Bluebird<CachedObjectType>,
	restore: (response: CachedObjectType, activeInstance: Optional<ObjectType>) => Bluebird<ObjectType> | ObjectType,
	shouldUpdate: (event: UpdateEvent) => Bluebird<boolean>,
	updateActions: {
		[s: number]: UpdateAction,
	}
	getID: (response: any) => string,
	cacheName: string
}

type Optional<t> = t | null

function createLoader<ObjectType, CachedObjectType>({ download, load, restore, getID, cacheName, shouldUpdate, updateActions }: hookType<ObjectType, CachedObjectType>) {
	let loading: { [s: string]: Bluebird<ObjectType> } = {}
	let byId: { [s: string]: ObjectType } = {}

	const cache = new Cache(cacheName)

	const considerLoaded = (id) => {
		loading = { ...loading }
		delete loading[id]
	}

	const cacheInMemory = (id, instance) => {
		byId = { ...byId, [id]: instance }
		return instance
	}

	const loadFromCache = (id) =>
		cache.get(id)
			.then((cacheResponse) => cacheResponse.data)
			.then((instance) => restore(instance, null))
			.then((instance) => {
				cacheInMemory(id, instance)
				considerLoaded(id)
				scheduleInstanceUpdate(UpdateEvent.wake, id, instance)
				return instance
			})

	const serverResponseToInstance = (response, id, activeInstance: Optional<ObjectType>) =>
		load(response, activeInstance)
			.then((cacheableData) => cache.store(id, cacheableData).thenReturn(cacheableData))
			.then((cachedData) => restore(cachedData, activeInstance))
			.then((instance) => cacheInMemory(id, instance))
			.finally(() => considerLoaded(id))

	const updateInstance = (id, instance: ObjectType) => {
		// TODO
	}

	const updateInstances = () => {
		// TODO
	}

	const scheduleInstancesUpdate = (event: UpdateEvent) => {
		switch(updateActions[event]) {
			case UpdateAction.Reload:
				updateInstances()
				break;
			case UpdateAction.DeferredReload:
				Bluebird.delay(DEFERRED_UPDATE_DELAY).then(() => updateInstances())
		}
	}

	socketService.listen("reconnect", () => scheduleInstancesUpdate(UpdateEvent.blink))

	const scheduleInstanceUpdate = (event: UpdateEvent, id, instance: ObjectType) => {
		switch(updateActions[event]) {
			case UpdateAction.Reload:
				updateInstance(id, instance)
				break;
			case UpdateAction.DeferredReload:
				Bluebird.delay(DEFERRED_UPDATE_DELAY).then(() => updateInstance(id, instance))
		}
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
				loading = {
					...loading,
					[id]: loadFromCache(id)
						.catch(() => serverResponseToInstance(response, id, null))
				}
			}

			 return loading[id]
		}

		static get(id): Bluebird<ObjectType> {
			if (byId[id]) {
				return Bluebird.resolve(byId[id])
			}

			if (!loading[id]) {
				let promise = loadFromCache(id)
					.catch(() => download(id, null).then((response) => serverResponseToInstance(response, id, null))
				)

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
