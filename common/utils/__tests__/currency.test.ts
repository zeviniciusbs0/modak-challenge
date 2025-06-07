import { CurrencyHandler } from "../currency";

describe("CurrencyHandler", () => {
	describe("format", () => {
		it("should format positive numbers correctly", () => {
			expect(CurrencyHandler.format(99.99)).toBe("$99.99");
			expect(CurrencyHandler.format(1234.56)).toBe("$1,234.56");
			expect(CurrencyHandler.format(0.99)).toBe("$0.99");
		});

		it("should format zero correctly", () => {
			expect(CurrencyHandler.format(0)).toBe("$0.00");
		});

		it("should format negative numbers correctly", () => {
			expect(CurrencyHandler.format(-99.99)).toBe("-$99.99");
			expect(CurrencyHandler.format(-1234.56)).toBe("-$1,234.56");
		});

		it("should format large numbers correctly", () => {
			expect(CurrencyHandler.format(1000000)).toBe("$1,000,000.00");
			expect(CurrencyHandler.format(1234567.89)).toBe("$1,234,567.89");
		});

		it("should format decimal numbers correctly", () => {
			expect(CurrencyHandler.format(99.1)).toBe("$99.10");
			expect(CurrencyHandler.format(99.123)).toBe("$99.12");
			expect(CurrencyHandler.format(99.999)).toBe("$100.00");
		});

		it("should handle edge cases", () => {
			expect(CurrencyHandler.format(0.01)).toBe("$0.01");
			expect(CurrencyHandler.format(0.001)).toBe("$0.00");
			expect(CurrencyHandler.format(0.006)).toBe("$0.01");
		});

		it("should format very small positive numbers", () => {
			expect(CurrencyHandler.format(0.001)).toBe("$0.00");
			expect(CurrencyHandler.format(0.004)).toBe("$0.00");
			expect(CurrencyHandler.format(0.005)).toBe("$0.01");
		});

		it("should format integers without decimal input", () => {
			expect(CurrencyHandler.format(100)).toBe("$100.00");
			expect(CurrencyHandler.format(1)).toBe("$1.00");
		});
	});
});
