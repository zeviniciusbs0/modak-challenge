import { FlatList } from "react-native";
import type { useListViewModel } from "./view-model";
import { ProductCard } from "./components/product-card";
import { Button, View, XStack, YStack } from "tamagui";
import { Page } from "@/common/components/page";
import { Filter } from "@tamagui/lucide-icons";
import { Chip } from "@/common/components/chip";

export const ListView = (props: ReturnType<typeof useListViewModel>) => {
	const { products, openFilters, category, sortBy } = props;

	return (
		<Page>
			<Page.Header>Products</Page.Header>
			<Page.Body>
				<XStack gap="$2" py="$3">
					<Button onPress={openFilters} size="$3" icon={<Filter size="$1" />} />
					{category && <Chip active>{category}</Chip>}
					{sortBy && <Chip active>{sortBy}</Chip>}
				</XStack>
				<FlatList
					data={products}
					renderItem={({ item }) => <ProductCard product={item} />}
					keyExtractor={(item) => item.id.toString()}
				/>
			</Page.Body>
		</Page>
	);
};
