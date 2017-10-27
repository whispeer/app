#!/bin/bash
set -e
set -x

npm run businessSass
rm -rf node_modules platforms plugins www/*
yarn
cordova prepare
ionic build --prod
open ./platforms/ios/whispeer\ Messenger.xcworkspace
