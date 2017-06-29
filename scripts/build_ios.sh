rm -rf node_modules platforms plugins www/*
yarn
cordova prepare
ionic build ios --prod
open ./platforms/ios/whispeer\ Messenger.xcodeproj
