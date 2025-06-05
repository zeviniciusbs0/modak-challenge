import { FlatList } from "react-native";
import type { useListViewModel } from "./view-model";
import { ProductCard } from "./components/product-card";
import { View } from "tamagui";
import { Page } from "@/common/components/page";

export const ListView = (props: ReturnType<typeof useListViewModel>) => {
	const { products } = props;

	return (
		<Page>
			<Page.Header>Products</Page.Header>
			<Page.Body>
				<FlatList
					data={products}
					renderItem={({ item }) => <ProductCard product={item} />}
					keyExtractor={(item) => item.id.toString()}
				/>
			</Page.Body>
		</Page>
	);
};
