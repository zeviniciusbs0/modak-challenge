import axiosInstance from "@/config/axios";
import type { GetProductsDto } from "./dtos/get-products.dto";

export class ProductModel {
	private client = axiosInstance;

	async getProducts(): Promise<GetProductsDto> {
		const response = await this.client.get<GetProductsDto>("/products");

		return response.data;
	}
}
