import type { Product } from "../../types/product";

export type GetProductsParamsDto = {
	sortBy?: "price" | "rating";
};

export type GetProductsDto = {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
};
