npm run businessSass
rm -rf node_modules platforms plugins www/*
yarn
cordova prepare
ionic cordova build ios --prod
open ./platforms/ios/whispeer\ Messenger.xcworkspace
