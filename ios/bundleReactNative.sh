#!/bin/sh

export NODE_BINARY=node

if [[ "${SENTRY_ENABLED}" = "true" ]]; then
	echo "Sentry native integration is enabled"

	./makeSentryProperties.sh

	export SENTRY_PROPERTIES=sentry.properties
	../node_modules/sentry-cli-binary/bin/sentry-cli react-native xcode ../node_modules/react-native/packager/react-native-xcode.sh
else
	echo "Sentry native integration is not enabled"
	../node_modules/react-native/packager/react-native-xcode.sh
fi
