import type { Product } from "../../types/product";

export type GetProductsParamsDto = {
	sortBy?: "price" | "rating";
	limit?: number;
	skip?: number;
};

export type GetProductsDto = {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
};
