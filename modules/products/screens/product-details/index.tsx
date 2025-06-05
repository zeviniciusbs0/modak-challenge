import { ProductDetailsView } from "./view";
import { useProductDetailsViewModel } from "./view-model";

const ProductDetailsScreen = () => {
	const props = useProductDetailsViewModel();

	return <ProductDetailsView {...props} />;
};

export default ProductDetailsScreen;
