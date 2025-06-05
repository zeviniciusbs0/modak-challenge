import { Slot } from "expo-router";

import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "../tamagui.config";
import { useConfigureNotificationsHandler } from "@/common/config/notifications";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	useConfigureNotificationsHandler();

	return (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		<TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme as any}>
			<Slot />
		</TamaguiProvider>
	);
}
