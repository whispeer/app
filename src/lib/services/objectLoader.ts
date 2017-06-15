import * as Bluebird from "bluebird"

type hookType = {
	downloadHook: (id: any) => Bluebird<any>,
	loadHook: (response: any) => Bluebird<any>
}

export default ({ downloadHook, loadHook }: hookType) => {
	let loading = {}
	let byId = {}

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
				let promise = loadHook(response).then((instance) => {
					byId = {
						...byId,
						[id]: instance
					}

					loading = { ...loading }
					delete loading[id]

					return instance
				}).finally(() => {
					delete loading[id]
				})

				loading = {
					...loading,
					[id]: promise
				}
			}

			 return loading[id]
		}

		static get(id) {
			if (byId[id]) {
				return Bluebird.resolve(byId[id])
			}

			if (!loading[id]) {
				let promise = downloadHook(id).then((response) => loadHook(response)).then((instance) => {
					byId = {
						...byId,
						[id]: instance
					}

					loading = { ...loading }
					delete loading[id]

					return instance
				}).finally(() => {
					delete loading[id]
				})

				loading = {
					...loading,
					[id]: promise
				}
			}

			 return loading[id]
		}
	}
}
