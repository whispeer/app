import h from "../helper/helper";
const validator = require("validation/validator");
const SecuredData = require("asset/securedDataWithMetaData")

import * as Bluebird from "bluebird"
import ObjectLoader from "../services/cachedObjectLoader"

import Observer from '../asset/observer';

interface ProfileOptions {
	isPublicProfile?: boolean
}

export default class Profile extends Observer {
	private securedData: any;
	private isPublicProfile: boolean;
	private id: String | number;

	constructor(data: any, options?: ProfileOptions) {
		super();

		options = options || {};

		this.isPublicProfile = options.isPublicProfile === true;

		this.securedData = SecuredData.createRaw(data.content, data.meta, {
			type: "profile",
			removeEmpty: true,
			encryptDepth: 1
		});

		this.checkProfile();

		if (data.profileid) {
			this.id = data.profileid;
		}
	}

	checkProfile = () => {
		const err = validator.validate("profile", this.securedData.contentGet());

		if (err) {
			throw err;
		}
	}

	getID = () => {
		if (!this.id) {
			return;
		}

		return this.isPublicProfile ? "public-" + this.id : "private-" + this.id;
	};

	getUpdatedData = (signKey: string) => {
		//pad updated profile
		//merge paddedProfile and updatedPaddedProfile
		//sign/hash merge
		//encrypt merge

		return this.decrypt().bind(this).then(() => {
			if (this.isPublicProfile) {
				return this.sign(signKey);
			} else {
				return this.securedData.getUpdatedData(signKey);
			}
		})
	};

	sign = (signKey: string, cb?: Function) => {
		if (!this.isPublicProfile) {
			throw new Error("please encrypt private profiles!");
		}

		return this.securedData.sign(signKey).then((signedMeta: any) => {
			return {
				content: this.securedData.contentGet(),
				meta: signedMeta
			};
		}).nodeify(cb);
	};

	decrypt = (cb?: Function) => {
		return this.securedData.decrypt().then(() => {
			this.checkProfile();
		}).nodeify(cb);
	};

	signAndEncrypt = (signKey: string, cryptKey: string) => {
		if (this.isPublicProfile) {
			throw new Error("no encrypt for public profiles!");
		}

		return this.securedData._signAndEncrypt(signKey, cryptKey)
	};

	updated = () => {
		return this.securedData.updated();
	};

	changed = () => {
		return this.securedData.isChanged();
	};

	setFullProfile = (data: any, cb?: Function) => {
		return this.decrypt().then(() => {
			this.securedData.contentSet(data);
		}).nodeify(cb);
	};

	setAttribute = (attr: string, value: any) => {
		return this.decrypt().then(() => {
			this.securedData.contentSetAttr(attr, value);
		})
	};

	removeAttribute = (attr: string) => {
		return this.decrypt().then(() => {
			this.securedData.contentRemoveAttr(attr);
		})
	}

	getFull = (cb?: Function) => {
		return this.decrypt().then(() => {
			return this.securedData.contentGet();
		}).nodeify(cb);
	};

	getAttribute = (attrs: any, cb?: Function) => {
		return this.decrypt().then(() => {
			return h.deepGet(this.securedData.contentGet(), attrs);
		}).nodeify(cb);
	};

}
