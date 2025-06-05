import Constants from "expo-constants";
import { router } from "expo-router";
import type React from "react";
import { type PropsWithChildren, useEffect, useMemo } from "react";
import { BackHandler, KeyboardAvoidingView, Platform } from "react-native";
import { PageContext, usePageContext } from "./context";
import {
	Button,
	H1,
	ScrollView,
	Spinner,
	View,
	type ViewProps,
	type ScrollViewProps,
	YStack,
	XStack,
} from "tamagui";
import { ChevronLeft } from "@tamagui/lucide-icons";

type HeaderProps = PropsWithChildren<
	ViewProps & {
		RightSlot?: React.ReactNode;
	}
>;

export function Header({ children, RightSlot, ...styleProps }: HeaderProps) {
	const handleGoBack = usePageContext((state) => state.handleGoBack);

	return (
		<View
			px="$4"
			py="$4"
			mt={Constants.statusBarHeight}
			bg="$color02"
			{...styleProps}
		>
			<XStack alignItems="center" gap="$4">
				<XStack flex={1} alignItems="center">
					{handleGoBack ? (
						<Button
							chromeless
							p="$0"
							size="$2"
							icon={<ChevronLeft size="$2" />}
							onPress={handleGoBack}
						/>
					) : null}
					<H1 color="$accent1" size="$6" numberOfLines={1}>
						{children}
					</H1>
				</XStack>
				{RightSlot ? RightSlot : null}
			</XStack>
		</View>
	);
}

type BodyProps = PropsWithChildren<
	ScrollViewProps & {
		scroll?: boolean;
	}
>;

export function Body({ children, scroll, ...styleProps }: BodyProps) {
	const isLoading = usePageContext((state) => state.isLoading);
	const Container = useMemo(() => (scroll ? ScrollView : View), [scroll]);

	if (isLoading) {
		return (
			<YStack grow={1} alignItems="center" justifyContent="center">
				<Spinner size="large" />
			</YStack>
		);
	}

	return (
		<Container grow={1} px="$5" {...styleProps}>
			{children}
		</Container>
	);
}

type FooterProps = PropsWithChildren<ViewProps>;
export function Footer({ children, ...styleProps }: FooterProps) {
	return (
		<View pb="$6" px="$6" bg="$background" {...styleProps}>
			{children}
		</View>
	);
}

type PageProps = PropsWithChildren<{
	onGoBack?: () => void;
	isLoading?: boolean;
}>;
function Page({ children, onGoBack, isLoading }: PageProps) {
	const canGoBack = router.canGoBack();

	const handleGoBack = useMemo(() => {
		if (onGoBack) {
			return onGoBack;
		}

		if (!canGoBack) {
			return undefined;
		}
		return router.back;
	}, [onGoBack, canGoBack]);

	useEffect(() => {
		const subscription = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				handleGoBack?.();
				return true;
			},
		);

		return () => subscription.remove();
	}, [handleGoBack]);

	return (
		<PageContext.Provider value={{ handleGoBack, isLoading }}>
			<View flex={1} bg="$background0">
				{children}
			</View>
		</PageContext.Provider>
	);
}

Page.Header = Header;
Page.Body = Body;
Page.Footer = Footer;

export { Page };
