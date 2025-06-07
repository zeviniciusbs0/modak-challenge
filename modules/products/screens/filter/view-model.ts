import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ProductModel } from "../../models/product.model";
import type { Category } from "../../types/category";

const ORDER_BY_OPTIONS = [
	{
		label: "Price",
		value: "price",
	},
	{
		label: "Rating",
		value: "rating",
	},
] as const;

export const useFilterViewModel = () => {
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null,
	);
	const [sortBy, setSortBy] = useState<"price" | "rating" | null>(null);
	const [isValid, setIsValid] = useState(false);

	const { data: categories, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const productModel = new ProductModel();
			const categories = await productModel.getProductCategories();
			return categories;
		},
	});

	const handleSelectCategory = (category: Category) => {
		setSelectedCategory((prev) =>
			prev?.slug === category.slug ? null : category,
		);
	};

	const handleSelectOrderBy = (value: "price" | "rating") => {
		setSortBy((prev) => (prev === value ? null : value));
	};

	useEffect(() => {
		setIsValid(!!selectedCategory || !!sortBy);
	}, [selectedCategory, sortBy]);

	const handleSubmit = () => {
		router.replace({
			pathname: "/products/list",
			params: {
				category: selectedCategory?.slug,
				sortBy,
			},
		});
	};

	return {
		categories,
		selectedCategory,
		handleSelectCategory,
		ORDER_BY_OPTIONS,
		sortBy,
		handleSelectOrderBy,
		isValid,
		handleSubmit,
		isLoading,
	};
};
