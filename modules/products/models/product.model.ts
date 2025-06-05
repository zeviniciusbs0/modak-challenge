import axiosInstance from "@/common/config/axios";
import type {
	GetProductsDto,
	GetProductsParamsDto,
} from "./dtos/get-products.dto";
import type { Product } from "../types/product";
import type { GetProductCategoriesDto } from "./dtos/get-product-categories.dto";

export class ProductModel {
	private client = axiosInstance;

	async getProducts(params?: GetProductsParamsDto): Promise<GetProductsDto> {
		const response = await this.client.get<GetProductsDto>("/products", {
			params,
		});

		return response.data;
	}

	async getProductById(id: string): Promise<Product> {
		const response = await this.client.get<Product>(`/products/${id}`);

		return response.data;
	}

	async getProductCategories(): Promise<GetProductCategoriesDto> {
		const response = await this.client.get<GetProductCategoriesDto>(
			"/products/categories",
		);

		return response.data;
	}

	async getProductByCategory(
		category: string,
		params?: GetProductsParamsDto,
	): Promise<GetProductsDto> {
		const response = await this.client.get<GetProductsDto>(
			`/products/category/${category}`,
			{
				params,
			},
		);

		return response.data;
	}
}
