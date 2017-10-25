#!/bin/bash
set -e
set -x

function signAndCopy {
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -storepass $PASS -keystore ./release/my-release-key.keystore ./release/whispeer-$extra-unsigned.apk alias_name

	rm -f ./release/whispeer-$extra.apk

	zipalign -v 4 ./release/whispeer-$extra-unsigned.apk ./release/whispeer-$extra.apk

	rm -f ./release/whispeer-$extra-unsigned.apk
}

npm run businessSass

./scripts/setVersionCode.js 0

rm -rf platforms plugins www/*
cordova prepare

ionic cordova build android --prod --release
cp ./platforms/android/build/outputs/apk/android-release-unsigned.apk ./release/whispeer-android-unsigned.apk

mv config.xml.bak config.xml

extra=android
signAndCopy
