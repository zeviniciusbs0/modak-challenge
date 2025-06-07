import { type ButtonProps, Button as TamaguiButton } from "tamagui";

export const Button = (props: ButtonProps) => {
	const { disabled, ...rest } = props;

	return (
		<TamaguiButton
			size="$4"
			themeInverse={!disabled}
			theme="green"
			disabled={disabled}
			{...rest}
		/>
	);
};
