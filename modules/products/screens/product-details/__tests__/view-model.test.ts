import { jest, renderHook } from "@/common/utils/test-utils";
import { useProductDetailsViewModel } from "../view-model";

const mockReplace = jest.fn();
const mockUseLocalSearchParams = jest.fn();

jest.mock("expo-router", () => ({
	router: {
		replace: mockReplace,
	},
	useLocalSearchParams: () => mockUseLocalSearchParams(),
}));

describe("useProductDetailsViewModel", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseLocalSearchParams.mockReturnValue({ id: "123" });
	});

	describe("initialization", () => {
		it("should initialize without crashing", () => {
			mockUseLocalSearchParams.mockReturnValue({ id: "123" });

			const { result } = renderHook(() => useProductDetailsViewModel());

			expect(result.current).toBeDefined();
			expect(result.current).toHaveProperty("product");
			expect(result.current).toHaveProperty("isLoading");
		});

		it("should handle undefined id parameter", () => {
			mockUseLocalSearchParams.mockReturnValue({ id: undefined });

			const { result } = renderHook(() => useProductDetailsViewModel());

			expect(result.current).toBeDefined();
		});
	});

	describe("hook structure", () => {
		it("should return expected properties", () => {
			const { result } = renderHook(() => useProductDetailsViewModel());

			expect(result.current).toHaveProperty("product");
			expect(result.current).toHaveProperty("isLoading");
			expect(typeof result.current.isLoading).toBe("boolean");
		});

		it("should handle different id values", () => {
			mockUseLocalSearchParams.mockReturnValue({ id: "123" });
			const { unmount } = renderHook(() => useProductDetailsViewModel());
			unmount();

			mockUseLocalSearchParams.mockReturnValue({ id: "456" });
			const { result } = renderHook(() => useProductDetailsViewModel());

			expect(result.current).toBeDefined();
		});
	});
});
