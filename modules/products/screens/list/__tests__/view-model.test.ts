import { renderHook, jest } from "@/common/utils/test-utils";
import { useListViewModel } from "../view-model";

// Mock expo-router
const mockNavigate = jest.fn();
const mockUseLocalSearchParams = jest.fn();

jest.mock("expo-router", () => ({
	router: {
		navigate: mockNavigate,
		isReady: true,
	},
	useLocalSearchParams: () => mockUseLocalSearchParams(),
}));

describe("useListViewModel", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseLocalSearchParams.mockReturnValue({});
	});

	describe("initialization", () => {
		it("should handle default params correctly", () => {
			mockUseLocalSearchParams.mockReturnValue({});

			const { result } = renderHook(() => useListViewModel());

			// The hook should initialize without crashing
			expect(result.current).toBeDefined();
			expect(typeof result.current.openFilters).toBe("function");
			expect(typeof result.current.handleRemoveCategory).toBe("function");
			expect(typeof result.current.handleRemoveSortBy).toBe("function");
		});

		it("should handle URL params correctly", () => {
			mockUseLocalSearchParams.mockReturnValue({
				category: "electronics",
				sortBy: "price",
			});

			const { result } = renderHook(() => useListViewModel());

			expect(result.current.category).toBe("electronics");
			expect(result.current.sortBy).toBe("price");
		});
	});

	describe("navigation functions", () => {
		it("should call navigate when openFilters is called", () => {
			const { result } = renderHook(() => useListViewModel());

			result.current.openFilters();

			expect(mockNavigate).toHaveBeenCalledWith("/products/filter");
		});
	});

	describe("filter management", () => {
		it("should update category state when handleRemoveCategory is called", () => {
			mockUseLocalSearchParams.mockReturnValue({
				category: "electronics",
				sortBy: "price",
			});

			const { result } = renderHook(() => useListViewModel());

			// Initial state
			expect(result.current.category).toBe("electronics");

			// Remove category
			result.current.handleRemoveCategory();

			// Category should be undefined after removal
			expect(result.current.category).toBeUndefined();
		});

		it("should update sortBy state when handleRemoveSortBy is called", () => {
			mockUseLocalSearchParams.mockReturnValue({
				category: "electronics",
				sortBy: "price",
			});

			const { result } = renderHook(() => useListViewModel());

			// Initial state
			expect(result.current.sortBy).toBe("price");

			// Remove sortBy
			result.current.handleRemoveSortBy();

			// SortBy should be undefined after removal
			expect(result.current.sortBy).toBeUndefined();
		});
	});

	describe("hook structure", () => {
		it("should return all expected properties", () => {
			const { result } = renderHook(() => useListViewModel());

			expect(result.current).toHaveProperty("products");
			expect(result.current).toHaveProperty("isLoading");
			expect(result.current).toHaveProperty("openFilters");
			expect(result.current).toHaveProperty("category");
			expect(result.current).toHaveProperty("sortBy");
			expect(result.current).toHaveProperty("handleRemoveCategory");
			expect(result.current).toHaveProperty("handleRemoveSortBy");
		});
	});
});
