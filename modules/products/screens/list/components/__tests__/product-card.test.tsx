import { createMockProduct, render } from "@/common/utils/test-utils";
import { ProductCard } from "../product-card";

describe("ProductCard", () => {
	it("should render the product card correctly", () => {
		const { toJSON } = render(<ProductCard product={createMockProduct()} />);

		expect(toJSON()).toMatchSnapshot();
	});

	it("should calculate review count correctly", () => {
		const productWithManyReviews = createMockProduct({
			rating: 3.8,
			reviews: new Array(15).fill({ rating: 4, comment: "Good" }),
		});

		const { getByText } = render(
			<ProductCard product={productWithManyReviews} />,
		);

		expect(getByText("3.8 (15)")).toBeTruthy();
	});

	it("should handle empty reviews array", () => {
		const productWithoutReviews = createMockProduct({
			rating: 0,
			reviews: [],
		});

		const { getByText } = render(
			<ProductCard product={productWithoutReviews} />,
		);

		expect(getByText("0 (0)")).toBeTruthy();
	});
});
