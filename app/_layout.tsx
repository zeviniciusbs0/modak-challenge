import { Slot } from "expo-router";
import { createTamagui, TamaguiProvider } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";
import { SafeAreaView } from "react-native-safe-area-context";

const config = createTamagui(defaultConfig);

type Config = typeof config;

declare module "tamagui" {
	interface TamaguiCustomConfig extends Config {}
}

export default function RootLayout() {
	return (
		<SafeAreaView edges={["top"]}>
			<TamaguiProvider config={config}>
				<Slot />
			</TamaguiProvider>
		</SafeAreaView>
	);
}
