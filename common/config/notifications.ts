import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

import { Platform } from "react-native";
import { useEffect, useState } from "react";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldPlaySound: true,
		shouldSetBadge: true,
		shouldShowBanner: true,
		shouldShowList: true,
	}),
});

export const useConfigureNotificationsHandler = () => {
	const handleRegistrationError = (error: string) => {
		console.error(error);
	};

	async function registerForPushNotificationsAsync() {
		if (Platform.OS === "android") {
			Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}

		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				handleRegistrationError(
					"Permission not granted to get push token for push notification!",
				);
				return;
			}
			const projectId =
				Constants?.expoConfig?.extra?.eas?.projectId ??
				Constants?.easConfig?.projectId;
			if (!projectId) {
				handleRegistrationError("Project ID not found");
			}
			try {
				const pushTokenString = (
					await Notifications.getExpoPushTokenAsync({
						projectId,
					})
				).data;
				console.log(pushTokenString);
				return pushTokenString;
			} catch (e: unknown) {
				handleRegistrationError(`${e}`);
			}
		} else {
			handleRegistrationError(
				"Must use physical device for push notifications",
			);
		}
	}
	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState<
		Notifications.Notification | undefined
	>(undefined);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		registerForPushNotificationsAsync()
			.then((token) => setExpoPushToken(token ?? ""))
			.catch((error: any) => setExpoPushToken(`${error}`));

		const notificationListener = Notifications.addNotificationReceivedListener(
			(notification) => {
				setNotification(notification);
			},
		);

		const responseListener =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			notificationListener.remove();
			responseListener.remove();
		};
	}, []);
};
