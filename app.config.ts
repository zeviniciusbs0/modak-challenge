const config = {
	expo: {
		name: "modak-technical-challenge",
		slug: "modak-challenge",
		scheme: "modakchallenge",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/icon.png",
		userInterfaceStyle: "light",
		newArchEnabled: true,
		splash: {
			image: "./assets/splash-icon.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		ios: {
			supportsTablet: true,
			bundleIdentifier: "com.modak.technicalchallenge",
			googleServicesFile: "./GoogleService-Info.plist",
			entitlements: {
				"aps-environment": "development",
			},
			infoPlist: {
				UIBackgroundModes: ["remote-notification"],
			},
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
			edgeToEdgeEnabled: true,
			package: "com.modak.technicalchallenge",
			googleServicesFile: "./google-services.json",
		},
		web: {
			favicon: "./assets/favicon.png",
		},
		extra: {
			eas: {
				projectId: "fa9ca408-1b62-42c7-8829-ca7bfc744694",
			},
		},
		plugins: [
			"expo-router",
			"@react-native-firebase/app",
			[
				"expo-dev-client",
				{
					launchMode: "most-recent",
				},
			],
			[
				"expo-build-properties",
				{
					ios: {
						useFrameworks: "static",
					},
				},
			],
		],
	},
};

export default config;
