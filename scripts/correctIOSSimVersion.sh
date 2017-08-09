#/bin/sh

set -x
set -e

if [ ! -d "./platforms/ios" ]; then
	echo "ios platform not yet installed not fixing ios-sim"
  exit 0
fi

echo "Installing correct version of npm package ios-sim@5.0.13"

cd platforms/ios/cordova
npm i ios-sim@5.0.13
cd ../../..
