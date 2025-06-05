import { useEffect, useState } from "react";
import { ProductModel } from "../../models/product.model";
import type { Product } from "../../types/product";

export const useListViewModel = () => {
	const [products, setProducts] = useState<Product[]>([]);

	const getProducts = async () => {
		const productModel = new ProductModel();
		const productsList = await productModel.getProducts();

		setProducts(productsList.products);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getProducts();
	}, []);

	return { products };
};
