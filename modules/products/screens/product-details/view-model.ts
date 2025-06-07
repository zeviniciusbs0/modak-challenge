import { useEffect, useState } from "react";
import { ProductModel } from "../../models/product.model";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

export const useProductDetailsViewModel = () => {
	const { id } = useLocalSearchParams();

	const {
		data: product,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["product-details", id],
		queryFn: async () => {
			const productModel = new ProductModel();
			const product = await productModel.getProductById(id as string);
			return product;
		},
	});

	useEffect(() => {
		if (error) {
			router.replace("/products/list");
		}
	}, [error]);

	return { product, isLoading };
};
