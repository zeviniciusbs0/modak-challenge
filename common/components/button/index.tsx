import { Button as TamaguiButton, type ButtonProps } from "tamagui";

export const Button = (props: ButtonProps) => {
	const { disabled } = props;

	return (
		<TamaguiButton
			size="$4"
			themeInverse={!disabled}
			theme="green"
			{...props}
		/>
	);
};
