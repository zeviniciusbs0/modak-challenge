import { createContextSelector } from "@/common/utils/create-context-selector";
import { createContext } from "use-context-selector";
import type { ContextProps } from "./types";

const defaultValue = {
	handleGoBack: () => {},
	isLoading: false,
	hideBackButton: false,
};

export const PageContext = createContext<ContextProps>(defaultValue);

export const usePageContext = createContextSelector(PageContext);
