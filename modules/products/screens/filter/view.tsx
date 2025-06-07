import { Chip } from "@/common/components/chip";
import { Page } from "@/common/components/page";
import { H1, XStack, YStack } from "tamagui";
import type { useFilterViewModel } from "./view-model";
import { Button } from "@/common/components/button";

export const FilterView = (props: ReturnType<typeof useFilterViewModel>) => {
	const {
		categories,
		selectedCategory,
		handleSelectCategory,
		ORDER_BY_OPTIONS,
		sortBy,
		handleSelectOrderBy,
		isValid,
		handleSubmit,
		isLoading,
	} = props;

	return (
		<Page isLoading={isLoading}>
			<Page.Header>Filters</Page.Header>
			<Page.Body px="$4">
				<YStack gap="$3">
					<H1 size="$3">Order by</H1>
					<XStack flexWrap="wrap" gap="$2">
						{ORDER_BY_OPTIONS.map((option) => (
							<Chip
								key={option.value}
								active={sortBy === option.value}
								onPress={() => handleSelectOrderBy(option.value)}
							>
								{option.label}
							</Chip>
						))}
					</XStack>
					<H1 size="$3">Categories</H1>
					<XStack flexWrap="wrap" gap="$2">
						{categories?.map((category) => (
							<Chip
								key={category.slug}
								active={selectedCategory?.slug === category.slug}
								onPress={() => handleSelectCategory(category)}
							>
								{category.name}
							</Chip>
						))}
					</XStack>
				</YStack>
			</Page.Body>
			<Page.Footer>
				<Button disabled={!isValid} onPress={handleSubmit}>
					Filter
				</Button>
			</Page.Footer>
		</Page>
	);
};
