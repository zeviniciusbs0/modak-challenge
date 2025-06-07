import { useEffect, useState } from "react";
import { ProductModel } from "../../models/product.model";
import type { Product } from "../../types/product";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

export const useListViewModel = () => {
	const params = useLocalSearchParams<{
		category?: string;
		sortBy?: "price" | "rating";
	}>();

	const [category, setCategory] = useState(params.category);
	const [sortBy, setSortBy] = useState(params.sortBy);

	const { data: products, isLoading } = useQuery({
		queryKey: ["products-list", category, sortBy],
		queryFn: async () => {
			const productModel = new ProductModel();
			const productsList = category
				? await productModel.getProductByCategory(category, {
						sortBy,
					})
				: await productModel.getProducts({
						sortBy,
					});

			return productsList.products;
		},
	});

	const openFilters = () => {
		router.navigate("/products/filter");
	};

	const handleRemoveCategory = () => {
		setCategory(undefined);
	};

	const handleRemoveSortBy = () => {
		setSortBy(undefined);
	};

	return {
		products,
		isLoading,
		openFilters,
		category,
		sortBy,
		handleRemoveCategory,
		handleRemoveSortBy,
	};
};
