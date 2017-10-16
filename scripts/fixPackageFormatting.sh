#!/usr/bin/env sh

PACKAGE_JSON="package.json"
PACKAGE_JSON_TMP=".package.json"
INDENT_SCRIPT="import sys, json; json.dump(json.load(sys.stdin), sys.stdout, indent=2)"
cat $PACKAGE_JSON | python -c "$INDENT_SCRIPT" > $PACKAGE_JSON_TMP

if [ $? -eq 0 ]; then
	mv $PACKAGE_JSON_TMP $PACKAGE_JSON
	echo "Fixed package.json formatting"
else
	rm $PACKAGE_JSON_TMP
	echo "Could not fix package.json formatting, beware!"
fi
