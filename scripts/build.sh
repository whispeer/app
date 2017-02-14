set -x
set -e

ionic build android --prod --release

cp platforms/android/build/outputs/apk/android-release-unsigned.apk release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./release/my-release-key.keystore ./release/android-release-unsigned.apk alias_name
rm -f release/whispeer.apk
zipalign -v 4 release/android-release-unsigned.apk release/whispeer.apk
