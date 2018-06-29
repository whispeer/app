#!/bin/bash
set -e
set -x

function signAndCopy {
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -storepass $PASS -keystore ./release/my-release-key.keystore ./release/whispeer-$extra-unsigned.apk alias_name

	rm -f ./release/whispeer-$extra.apk

	zipalign -v 4 ./release/whispeer-$extra-unsigned.apk ./release/whispeer-$extra.apk

	rm -f ./release/whispeer-$extra-unsigned.apk
}

if [[ -z "${PASS}" ]]; then
	echo "PASS not set. Exiting build"
	exit 1
fi

if [[ -z "${SENTRY_AUTH_TOKEN}" ]]; then
	echo "SENTRY_AUTH_TOKEN not set. Exiting build"
	exit 1
fi

set -x

npm i
cordova prepare
npm run businessSass

IONIC_SOURCEMAP_DIR=./release/sourcemaps IONIC_MOVE_SOURCE_MAPS=true ionic build --prod
open ./platforms/ios/whispeer\ Messenger.xcworkspace

read -n 1 -s -r -p "Press any key build android"

echo "build for android >= 5"

sed -i .bak 's/android-minSdkVersion" value="16"/android-minSdkVersion" value="21"/g' config.xml

./scripts/setVersionCode.js 5

read -n 1 -s -r -p "Press any key build android >= 5 release"
cordova build android --release
cp ./platforms/android/build/outputs/apk/release/android-release-unsigned.apk ./release/whispeer-android-unsigned.apk

mv config.xml.bak config.xml

echo "build for android 4"

cordova plugin add cordova-plugin-crosswalk-webview
./scripts/setVersionCode.js 0

read -n 1 -s -r -p "Press any key build android 4 release"
cordova build android --release
cp ./platforms/android/build/outputs/apk/release/android-release-unsigned.apk ./release/whispeer-android4-unsigned.apk
cordova plugin rm cordova-plugin-crosswalk-webview

extra=android
signAndCopy

extra=android4
signAndCopy

read -n 1 -s -r -p "Press any key to upload sourcemaps to sentry"

VERSION=`./scripts/getVersion.js`

cp www/build/*.js release/sourcemaps

cd release/sourcemaps
for file in *.js.map
do
	jsfilename=`echo $file | sed -e 's/.map//g'`
	# sed "s/$/ $filename/" $file
	printf "\n//# sourceMappingURL=$file" >> $jsfilename
done
cd ../..

npx sentry-cli releases -o sentry -p messenger new $VERSION
npx sentry-cli releases -o sentry -p messenger files $VERSION upload-sourcemaps release/sourcemaps/ --validate
npx sentry-cli releases -o sentry -p messenger files $VERSION upload-sourcemaps release/sourcemaps/ --url-prefix '~/android_asset/www/build/'
npx sentry-cli releases -o sentry -p messenger files $VERSION upload-sourcemaps release/sourcemaps/ --url-prefix '~/www/build/'
npx sentry-cli releases -o sentry -p messenger files $VERSION upload-sourcemaps release/sourcemaps/ --url-prefix '~/build/'
