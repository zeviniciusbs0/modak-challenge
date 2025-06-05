import { CurrencyHandler } from "@/common/utils/currency";
import type { Product } from "@/modules/products/types/product";
import { router } from "expo-router";
import { Card, H3, Image, Paragraph } from "tamagui";

type ProductCardProps = {
	product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
	const handlePress = () => {
		router.push(`/products/${product.id}`);
	};

	return (
		<Card elevate onPress={handlePress} size="$4" bordered my="$2">
			<Card.Header>
				<Image
					source={{ uri: product.thumbnail }}
					flex={1}
					width="100%"
					height={200}
				/>
			</Card.Header>
			<Card.Footer flexDirection="column" padded>
				<Paragraph color="$accent2" numberOfLines={2}>
					{product.title}
				</Paragraph>
				<H3 color="$red10">{CurrencyHandler.format(product.price)}</H3>
			</Card.Footer>
		</Card>
	);
};
