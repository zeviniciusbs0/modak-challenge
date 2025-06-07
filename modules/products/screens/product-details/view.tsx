import { CurrencyHandler } from "@/common/utils/currency";
import type { useProductDetailsViewModel } from "./view-model";
import { H1, H3, Image, Paragraph, XStack, YStack } from "tamagui";
import { Page } from "@/common/components/page";
import { StarFull } from "@tamagui/lucide-icons";

export const ProductDetailsView = (
	props: ReturnType<typeof useProductDetailsViewModel>,
) => {
	const { product, isLoading } = props;

	return (
		<Page isLoading={isLoading}>
			<Page.Header>Product Details</Page.Header>
			<Page.Body scroll bg="$background04" px="$0">
				{product ? (
					<>
						<Image
							source={{ uri: product.images[0] }}
							width="100%"
							height={200}
						/>
						<YStack gap="$2" mt="$4" px="$5">
							<XStack items="center" gap="$1" mt="$1">
								<StarFull size="$1" color="$yellow10" />
								<Paragraph>
									{product.rating} ({product.reviews.length})
								</Paragraph>
							</XStack>
							<XStack justify="space-between" items="center">
								<H3 color="$red10">{CurrencyHandler.format(product.price)}</H3>
								<Paragraph color="$accent2">By {product.brand}</Paragraph>
							</XStack>
							<H3>{product.title}</H3>
							<Paragraph>{product.availabilityStatus}</Paragraph>
							<Paragraph>{product.description}</Paragraph>
						</YStack>
					</>
				) : (
					<Paragraph>Product not found</Paragraph>
				)}
			</Page.Body>
		</Page>
	);
};
