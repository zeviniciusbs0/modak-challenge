import { useEffect, useState } from "react";
import { ProductModel } from "../../models/product.model";
import type { Product } from "../../types/product";
import { router, useLocalSearchParams } from "expo-router";

export const useListViewModel = () => {
	const params = useLocalSearchParams<{
		category?: string;
		sortBy?: "price" | "rating";
	}>();

	const [category, setCategory] = useState(params.category);
	const [sortBy, setSortBy] = useState(params.sortBy);

	const [products, setProducts] = useState<Product[]>([]);

	const getProducts = async () => {
		const productModel = new ProductModel();
		const productsList = category
			? await productModel.getProductByCategory(category, {
					sortBy,
				})
			: await productModel.getProducts({
					sortBy,
				});

		setProducts(productsList.products);
	};

	const openFilters = () => {
		router.push("/products/filter");
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getProducts();
	}, [category, sortBy]);

	const handleRemoveCategory = () => {
		setCategory(undefined);
	};

	const handleRemoveSortBy = () => {
		setSortBy(undefined);
	};

	return {
		products,
		openFilters,
		category,
		sortBy,
		handleRemoveCategory,
		handleRemoveSortBy,
	};
};
