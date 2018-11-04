#!/usr/bin/env sh

echo "          _     _"
echo "__      _| |__ (_)___ _ __   ___  ___ _ __"
echo "\ \ /\ / / '_ \| / __| '_ \ / _ \/ _ \ '__|"
echo " \ V  V /| | | | \__ \ |_) |  __/  __/ |"
echo "  \_/\_/ |_| |_|_|___/ .__/ \___|\___|_|"
echo "                     |_|"
echo "Checking versions"
echo

function checkVersion () {
	local COMMAND=$1
	local VERSION_FLAG=$2
	local DESIRED_VERSION=$3
	if hash $COMMAND 2>/dev/null; then
		local CURRENT_VERSION=`$COMMAND $VERSION_FLAG 2>&1`
		if [ "$CURRENT_VERSION" = "$DESIRED_VERSION" ]; then
			echo " ✅   $COMMAND version matches $DESIRED_VERSION"
		else
			echo " ⚠️   $COMMAND $CURRENT_VERSION is installed. The recommended $COMMAND version is $DESIRED_VERSION, current version is $CURRENT_VERSION"
		fi
	else
		echo " 💩   $COMMAND is not installed"
		exit 2
	fi

}

# check node foundation
checkVersion node -v 'v8.11.1'
checkVersion npm -v '5.6.0'

# check cordova and ionic
checkVersion cordova -v '7.1.0'
checkVersion ionic --version '3.19.0'

# for completeness, show ionic info
ionic info

# platform specific tools
checkVersion ios-deploy -V '1.9.2'

# tools
checkVersion python --version 'Python 2.7.10'
