import { X } from "@tamagui/lucide-icons";
import { Button } from "tamagui";

type ChipProps = {
	children: React.ReactNode;
	onPress?: () => void;
	active?: boolean;
	onRemove?: () => void;
};

export const Chip = ({ children, onPress, active, onRemove }: ChipProps) => {
	return (
		<Button
			size="$3"
			onPress={onRemove ? onRemove : onPress}
			variant={active ? undefined : "outlined"}
			theme="green"
			icon={onRemove ? <X /> : undefined}
		>
			{children}
		</Button>
	);
};
