import { useEffect, useMemo, useState } from "react";
import { ProductModel } from "../../models/product.model";
import { router, useLocalSearchParams } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";

const LIMIT = 20;

export const useListViewModel = () => {
	const params = useLocalSearchParams<{
		category?: string;
		sortBy?: "price" | "rating";
	}>();

	const [category, setCategory] = useState(params.category ?? undefined);
	const [sortBy, setSortBy] = useState(params.sortBy ?? undefined);

	const {
		data,
		isLoading,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		error,
	} = useInfiniteQuery({
		queryKey: ["products-list", category, sortBy],
		queryFn: async ({ pageParam = 0 }) => {
			const productModel = new ProductModel();
			const productsList = category
				? await productModel.getProductByCategory(category, {
						sortBy,
						limit: LIMIT,
						skip: pageParam,
					})
				: await productModel.getProducts({
						sortBy,
						limit: LIMIT,
						skip: pageParam,
					});

			return productsList;
		},
		getNextPageParam: (lastPage, pages) => {
			const totalFetched = pages.reduce(
				(acc, page) => acc + page.products.length,
				0,
			);
			return totalFetched < lastPage.total ? totalFetched : undefined;
		},
		initialPageParam: 0,
	});

	const products = useMemo(
		() => data?.pages.flatMap((page) => page.products) ?? [],
		[data],
	);

	const openFilters = () => {
		router.navigate("/products/filter");
	};

	const handleRemoveCategory = () => {
		setCategory(undefined);
		router.setParams({ category: undefined });
	};

	const handleRemoveSortBy = () => {
		setSortBy(undefined);
		router.setParams({ sortBy: undefined });
	};

	const loadMore = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	return {
		products,
		isLoading,
		isFetchingNextPage,
		hasNextPage,
		loadMore,
		openFilters,
		category,
		sortBy,
		handleRemoveCategory,
		handleRemoveSortBy,
		error,
	};
};
