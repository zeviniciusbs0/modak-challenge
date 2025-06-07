import { Slot } from "expo-router";

import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";

import { useConfigureNotificationsHandler } from "@/common/config/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { tamaguiConfig } from "../tamagui.config";

const queryClient = new QueryClient();

export const unstable_settings = {
	initialRouteName: "/products/list",
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const { expoPushToken } = useConfigureNotificationsHandler();

	// Log push token for debugging/testing
	React.useEffect(() => {
		if (expoPushToken) {
			console.log("🔗 Push Token Available:", expoPushToken);
		}
	}, [expoPushToken]);

	return (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		<TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme as any}>
			<QueryClientProvider client={queryClient}>
				<Slot />
			</QueryClientProvider>
		</TamaguiProvider>
	);
}
