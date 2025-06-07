import { fireEvent, jest, render } from "@/common/utils/test-utils";
import { Chip } from "../index";

describe("Chip", () => {
	it("should render the chip correctly", () => {
		const { toJSON } = render(<Chip>Chip Test</Chip>);

		expect(toJSON()).toMatchSnapshot();
	});

	describe("interaction priority logic", () => {
		it("should prioritize onRemove over onPress when both provided", () => {
			const mockPress = jest.fn();
			const mockRemove = jest.fn();

			const { getByText } = render(
				<Chip onPress={mockPress} onRemove={mockRemove}>
					Priority Test
				</Chip>,
			);

			const chip = getByText("Priority Test");
			fireEvent.press(chip);

			expect(mockRemove).toHaveBeenCalledTimes(1);
			expect(mockPress).not.toHaveBeenCalled();
		});

		it("should use onPress when onRemove not provided", () => {
			const mockPress = jest.fn();

			const { getByText } = render(<Chip onPress={mockPress}>Press Test</Chip>);

			const chip = getByText("Press Test");
			fireEvent.press(chip);

			expect(mockPress).toHaveBeenCalledTimes(1);
		});
	});
});
