export * from "@testing-library/react-native";

export { jest } from "@jest/globals";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	renderHook as originalRenderHook,
	render,
} from "@testing-library/react-native";
import type {
	RenderHookOptions,
	RenderOptions,
} from "@testing-library/react-native";
import React from "react";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../../../tamagui.config";

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				staleTime: Number.POSITIVE_INFINITY,
				gcTime: 0,
			},
			mutations: {
				retry: false,
			},
		},
	});

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const queryClient = createTestQueryClient();

	return React.createElement(
		TamaguiProvider,
		{ config: tamaguiConfig, defaultTheme: "light" },
		React.createElement(QueryClientProvider, { client: queryClient }, children),
	);
};

const customRender = (
	ui: React.ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: Wrapper, ...options });

const customRenderHook = <Result, Props>(
	hook: (initialProps: Props) => Result,
	options?: Omit<RenderHookOptions<Props>, "wrapper">,
) => originalRenderHook(hook, { wrapper: Wrapper, ...options });

export { customRender as render, customRenderHook as renderHook };

export const createMockNavigation = () => ({
	navigate: jest.fn(),
	goBack: jest.fn(),
	dispatch: jest.fn(),
	reset: jest.fn(),
	canGoBack: jest.fn(() => true),
	isFocused: jest.fn(() => true),
});

export const createMockRoute = (params = {}) => ({
	key: "test-route",
	name: "TestScreen",
	params,
});

export const waitForNextTick = () =>
	new Promise((resolve) => setTimeout(resolve, 0));

export const createMockProduct = (overrides = {}) => ({
	id: 1,
	title: "Test Product",
	description: "Test Description",
	price: 99.99,
	category: "test-category",
	thumbnail: "https://test.com/image.jpg",
	images: ["https://test.com/image.jpg"],
	rating: 4.5,
	stock: 10,
	tags: ["test"],
	brand: "Test Brand",
	sku: "TEST-SKU",
	weight: 1,
	dimensions: { width: 10, height: 10, depth: 10 },
	warrantyInformation: "Test warranty",
	shippingInformation: "Test shipping",
	availabilityStatus: "In Stock",
	reviews: [],
	returnPolicy: "Test return",
	minimumOrderQuantity: 1,
	meta: {
		createdAt: "2024-01-01",
		updatedAt: "2024-01-01",
		barcode: "test-barcode",
		qrCode: "test-qr",
	},
	discountPercentage: 0,
	...overrides,
});

export const createMockCategory = (overrides = {}) => ({
	slug: "test-category",
	name: "Test Category",
	url: "https://dummyjson.com/products/category/test-category",
	...overrides,
});
