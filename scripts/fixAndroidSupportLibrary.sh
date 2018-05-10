#/bin/sh

set -x
set -e

if [ ! -d "./platforms/android" ]; then
	echo "android platform not yet installed not updating support library resolution strategy"
  exit 0
fi

if grep -q "com.android.support:support-v4:26.1.0" ./platforms/android/build.gradle; then
  echo "build.gradle was already updated."
	exit 0
fi

echo "Updating gradle support library resolution strategy"

echo "
configurations.all {
    resolutionStrategy {
        force 'com.android.support:support-v4:26.1.0'
    }
}
" >> ./platforms/android/build.gradle
