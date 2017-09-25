#!/usr/bin/env sh


# check for node, npm and yarn.

DESIRED_VERSION="v7.10.1"
COMMAND="node"
VERSION_FLAG="-v"

if hash node 2>/dev/null; then
	CURRENT_VERSION=`$COMMAND $VERSION_FLAG`
	if [ "$CURRENT_VERSION" = "$DESIRED_VERSION" ]; then
	    echo " 💚	$COMMAND version matches $DESIRED_VERSION"
	else
	    echo " 💔	$COMMAND $CURRENT_VERSION is installed. The recommended $COMMAND version is $DESIRED_VERSION"
	fi
else
  echo "$COMMAND is not installed"
	exit 2
fi
