#!/bin/bash
set -e
set -x

function signAndCopy {
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -storepass $PASS -keystore ./release/my-release-key.keystore ./release/whispeer-$extra-unsigned.apk alias_name

	rm -f ./release/whispeer-$extra.apk

	zipalign -v 4 ./release/whispeer-$extra-unsigned.apk ./release/whispeer-$extra.apk

	rm -f ./release/whispeer-$extra-unsigned.apk
}

echo "build for android >= 5"

sed -i .bak 's/android-minSdkVersion" value="16"/android-minSdkVersion" value="21"/g' config.xml

./scripts/setVersionCode.js 5

rm -rf platforms plugins www/*
cordova prepare

# sed -i .bak 's/^ext.cdvMinSdkVersion/\/\/ext.cdvMinSdkVersion/g' ./plugins/phonegap-plugin-barcodescanner/src/android/barcodescanner.gradle

ionic cordova build android --prod --release
cp ./platforms/android/build/outputs/apk/android-release-unsigned.apk ./release/whispeer-android-unsigned.apk

mv config.xml.bak config.xml

echo "build for android 4"

cordova plugin add cordova-plugin-crosswalk-webview
./scripts/setVersionCode.js 0

ionic cordova build --release android
cp ./platforms/android/build/outputs/apk/android-release-unsigned.apk ./release/whispeer-android4-unsigned.apk

rm -rf platforms plugins www/*

extra=android
signAndCopy

extra=android4
signAndCopy
