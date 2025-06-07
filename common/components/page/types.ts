import type { PropsWithChildren } from "react";
import type React from "react";
import type { ScrollViewProps, ViewProps } from "tamagui";

export type HeaderProps = PropsWithChildren<
	ViewProps & {
		RightSlot?: React.ReactNode;
	}
>;

export type BodyProps = PropsWithChildren<
	ScrollViewProps & {
		scroll?: boolean;
	}
>;

export type FooterProps = PropsWithChildren<ViewProps>;

export type PageProps = PropsWithChildren<{
	onGoBack?: () => void;
	hideBackButton?: boolean;
	isLoading?: boolean;
}>;

export type ContextProps = {
	handleGoBack?: () => void;
	isLoading: boolean;
	hideBackButton: boolean;
};
