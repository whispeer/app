#!/bin/bash
set -e
set -x

rm -rf node_modules platforms plugins www/*
yarn
cordova prepare
npm run businessSass
ionic build --prod
open ./platforms/ios/whispeer\ Messenger.xcworkspace
