import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ProductModel } from "../../models/product.model";

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
