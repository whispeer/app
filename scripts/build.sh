#!/bin/bash
set -e
set -x

function signAndCopy {
	cp ./platforms/android/build/outputs/apk/$name-unsigned.apk ./release

	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./release/my-release-key.keystore ./release/$name-unsigned.apk alias_name

	rm -f ./release/whispeer-$extra.apk

	zipalign -v 4 ./release/$name-unsigned.apk ./release/whispeer-$extra.apk

	rm -f ./release/$name-unsigned.apk
}

echo "build for android >= 5"

sed -i .bak 's/android-minSdkVersion" value="16"/android-minSdkVersion" value="21"/g' config.xml
rm -rf platforms
rm -rf plugins
cordova prepare

# sed -i .bak 's/^ext.cdvMinSdkVersion/\/\/ext.cdvMinSdkVersion/g' ./plugins/phonegap-plugin-barcodescanner/src/android/barcodescanner.gradle

ionic build android --prod --release
mv config.xml.bak config.xml

echo "build for android 4"

cordova plugin add cordova-plugin-crosswalk-webview

ionic build --release android

name=android-release
extra=android

signAndCopy

name=android-armv7-release
extra=android4

signAndCopy

rm -rf platforms
rm -rf plugins
cordova prepare
