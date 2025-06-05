import { useEffect, useState } from "react";
import { ProductModel } from "../../models/product.model";
import type { Product } from "../../types/product";
import { useLocalSearchParams } from "expo-router";

export const useProductDetailsViewModel = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [product, setProduct] = useState<Product | null>(null);
	const { id } = useLocalSearchParams();

	const getProduct = async () => {
		setIsLoading(true);
		const productModel = new ProductModel();
		const product = await productModel.getProductById(id as string);
		setIsLoading(false);
		setProduct(product);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getProduct();
	}, []);

	return { product, isLoading };
};
