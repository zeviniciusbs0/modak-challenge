import { useEffect, useState } from "react";
import { ProductModel } from "../../models/product.model";
import type { Category } from "../../types/category";
import { router } from "expo-router";

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
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null,
	);
	const [sortBy, setSortBy] = useState<"price" | "rating" | null>(null);
	const [isValid, setIsValid] = useState(false);

	const getCategories = async () => {
		const productModel = new ProductModel();
		const categories = await productModel.getProductCategories();

		setCategories(categories);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getCategories();
	}, []);

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
	};
};
