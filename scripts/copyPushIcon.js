#!/usr/bin/env node

var fs = require('fs-extra')
var path = require('path');

var inputFolder = path.join(__dirname, '../', 'resources/android/icon_push/');
var outputFolder = path.join(__dirname, '../', '/platforms/android/res/');

console.log(inputFolder);
console.log(outputFolder);

console.log('------------------------------------------------------------------------------------------');
console.log("Running hook");
console.log('------------------------------------------------------------------------------------------');

fs.copySync(inputFolder, outputFolder);
