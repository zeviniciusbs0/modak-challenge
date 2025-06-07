import { FlatList } from "react-native";
import type { useListViewModel } from "./view-model";
import { ProductCard } from "./components/product-card";
import { Button, Spinner, XStack, YStack } from "tamagui";
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
		isFetchingNextPage,
		loadMore,
	} = props;

	return (
		<Page hideBackButton>
			<Page.Header>Products</Page.Header>
			<Page.Body pb="$4">
				<XStack gap="$2" py="$3" px="$4">
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
					<YStack justify="center" items="center" flex={1}>
						<Spinner size="large" />
					</YStack>
				) : (
					<FlatList
						data={products}
						renderItem={({ item }) => <ProductCard product={item} />}
						keyExtractor={(item) => item.id.toString()}
						showsVerticalScrollIndicator={false}
						onEndReached={loadMore}
						onEndReachedThreshold={0.5}
						ListFooterComponent={() =>
							isFetchingNextPage ? <Spinner my="$2" size="small" /> : null
						}
					/>
				)}
			</Page.Body>
		</Page>
	);
};
