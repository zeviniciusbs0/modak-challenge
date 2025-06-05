import { Button } from "tamagui";

type ChipProps = {
	children: React.ReactNode;
	onPress?: () => void;
	active?: boolean;
};

export const Chip = ({ children, onPress, active }: ChipProps) => {
	return (
		<Button
			size="$3"
			onPress={onPress}
			variant={active ? undefined : "outlined"}
			theme="green"
		>
			{children}
		</Button>
	);
};
