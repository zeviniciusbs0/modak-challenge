import { FlatList } from "react-native";
import type { useListViewModel } from "./list.view-model";
import { ProductCard } from "./components/product-card";
import { View } from "tamagui";

export const ListView = (props: ReturnType<typeof useListViewModel>) => {
	const { products } = props;

	return (
		<View p="$4">
			<FlatList
				data={products}
				renderItem={({ item }) => <ProductCard product={item} />}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
};
