import axiosInstance from "@/common/config/axios";
import type { GetProductsDto } from "./dtos/get-products.dto";
import type { Product } from "../types/product";

export class ProductModel {
	private client = axiosInstance;

	async getProducts(): Promise<GetProductsDto> {
		const response = await this.client.get<GetProductsDto>("/products");

		return response.data;
	}

	async getProductById(id: string): Promise<Product> {
		const response = await this.client.get<Product>(`/products/${id}`);

		return response.data;
	}
}
