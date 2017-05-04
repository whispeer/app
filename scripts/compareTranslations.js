#!/usr/bin/env node

var fs = require("fs")
var flatten = require("array-flatten")

var getAllKeys = function (obj, previousKey) {
	return flatten(Object.keys(obj).map(function (key) {
		if (typeof obj[key] !== "object") {
			return previousKey + "." + key
		}

		return getAllKeys(obj[key], previousKey + "." + key)
	}))
}

var files = fs.readdirSync("./src/assets/i18n/").map(function (file) {
	return {
		name: file,
		keys: getAllKeys(JSON.parse(fs.readFileSync("./src/assets/i18n/" + file)), "")
	}
})

var mainFile = files.pop()

files.forEach(function (file) {
	file.keys.forEach(function (key) {
		if (mainFile.keys.indexOf(key) === -1) {
			console.warn("Missing in " + mainFile.name + " but present in " + file.name + ": " + key)
		}
	})
	mainFile.keys.forEach(function (key) {
		if (file.keys.indexOf(key) === -1) {
			console.warn("Missing in " + file.name + " but present in " + mainFile.name + ": " + key)
		}
	})
})
