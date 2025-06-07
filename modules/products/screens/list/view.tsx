import { FlatList } from "react-native";
import type { useListViewModel } from "./view-model";
import { ProductCard } from "./components/product-card";
import { Button, Spinner, View, XStack, YStack } from "tamagui";
import { Page } from "@/common/components/page";
import { Filter } from "@tamagui/lucide-icons";
import { Chip } from "@/common/components/chip";

export const ListView = (props: ReturnType<typeof useListViewModel>) => {
	const {
		products,
		isLoading,
		openFilters,
		category,
		sortBy,
		handleRemoveCategory,
		handleRemoveSortBy,
	} = props;

	return (
		<Page>
			<Page.Header>Products</Page.Header>
			<Page.Body>
				<XStack gap="$2" py="$3">
					<Button onPress={openFilters} size="$3" icon={<Filter size="$1" />} />
					{category && (
						<Chip onRemove={handleRemoveCategory} active>
							{category}
						</Chip>
					)}
					{sortBy && (
						<Chip onRemove={handleRemoveSortBy} active>
							{sortBy}
						</Chip>
					)}
				</XStack>
				{isLoading ? (
					<YStack justifyContent="center" alignItems="center" flex={1}>
						<Spinner size="large" />
					</YStack>
				) : (
					<FlatList
						data={products}
						renderItem={({ item }) => <ProductCard product={item} />}
						keyExtractor={(item) => item.id.toString()}
					/>
				)}
			</Page.Body>
		</Page>
	);
};
