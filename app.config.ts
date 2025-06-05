const config = {
	expo: {
		name: "modak-technical-challenge",
		slug: "modak-technical-challenge",
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
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
			edgeToEdgeEnabled: true,
			package: "com.modak.technicalchallenge",
		},
		web: {
			favicon: "./assets/favicon.png",
		},
		plugins: [
			"expo-router",
			[
				"expo-dev-client",
				{
					launchMode: "most-recent",
				},
			],
		],
	},
};

export default config;
