import * as Bluebird from "bluebird"

type hookType = {
	 downloadHook: (id: any) => Bluebird<any>,
	 loadHook: (response: any) => Bluebird<any>
}

export default ({ downloadHook, loadHook }: hookType) => {
	const loading = {}
	const byId = {}

	return class ObjectLoader {
		static getLoaded(id) {
			if (!ObjectLoader.isLoaded(id)) {
				throw new Error(`Not yet loaded: ${id}`)
			}

			return byId[id]
		}

		static isLoaded(id) {
			return byId.hasOwnProperty(id)
		}

		static isLoading(id) {
			return loading.hasOwnProperty(id)
		}

		static load(response, id = response.server.id) {
			if (byId[id]) {
				return Bluebird.resolve(byId[id])
			}

			if (!loading[id]) {
				loading[id] = loadHook(response).then((instance) => {
					byId[id] = instance
					delete loading[id]

					return instance
				}).finally(() => {
					delete loading[id]
				})
			}

			 return loading[id]
		}

		static get(id) {
			if (byId[id]) {
				return Bluebird.resolve(byId[id])
			}

			if (!loading[id]) {
				loading[id] = downloadHook(id).then((response) => loadHook(response)).then((instance) => {
					byId[id] = instance

					return instance
				}).finally(() => {
					delete loading[id]
				})
			}

			 return loading[id]
		}
	}
}
