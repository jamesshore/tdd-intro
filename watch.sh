#!/bin/sh

. build/scripts/prebuild.sh
while node build/scripts/watch.js $*; do
	echo "Restarting..."
done
