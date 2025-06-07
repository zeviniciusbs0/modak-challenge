import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

import { Platform } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";

export interface PushNotificationData {
	screen?: string;
	productId?: string;
	[key: string]: unknown;
}

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldPlaySound: true,
		shouldSetBadge: true,
		shouldShowBanner: true,
		shouldShowList: true,
		shouldShowAlert: true,
	}),
});

export const useConfigureNotificationsHandler = () => {
	const handleRegistrationError = (error: string) => {
		console.error(error);
	};

	const handleNotificationNavigation = (data: PushNotificationData) => {
		// Handle deep linking based on notification data
		if (data.screen && typeof data.screen === "string") {
			router.push(data.screen as never);
		} else if (data.productId) {
			router.push(`/products/${data.productId}` as never);
		}
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
				console.warn(
					"No EAS projectId found. Expo push notifications will not be available.",
				);
				return;
			}
			try {
				const pushTokenString = (
					await Notifications.getExpoPushTokenAsync({
						projectId,
					})
				).data;
				console.log("📱 Expo Push Token:", pushTokenString);
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
			.catch((error: unknown) => setExpoPushToken(`${error}`));

		const notificationListener = Notifications.addNotificationReceivedListener(
			(notification) => {
				console.log("📱 Notification received:", notification);
				setNotification(notification);
			},
		);

		const responseListener =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log("👆 Notification tapped:", response);

				const data: PushNotificationData =
					response.notification.request.content.data;
				handleNotificationNavigation(data);
			});

		return () => {
			notificationListener.remove();
			responseListener.remove();
		};
	}, []);

	return {
		expoPushToken,
		notification,
	};
};

// Send local notification (for testing)
export const sendLocalNotification = async (
	title: string,
	body: string,
	data?: PushNotificationData,
) => {
	await Notifications.scheduleNotificationAsync({
		content: {
			title,
			body,
			data: data || {},
		},
		trigger: null, // Send immediately
	});
};
