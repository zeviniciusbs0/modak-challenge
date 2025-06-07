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
			try {
				const productModel = new ProductModel();
				const product = await productModel.getProductById(id as string);
				return product;
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			} catch (e: any) {
				if (e.response?.status === 404) {
					throw new Error("Product not found");
				}

				throw e;
			}
		},
		retry: false,
	});

	return { product, isLoading, error };
};
