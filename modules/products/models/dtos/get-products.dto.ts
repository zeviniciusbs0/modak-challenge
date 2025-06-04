import type { Product } from "../../types/product";

export type GetProductsDto = {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
};
