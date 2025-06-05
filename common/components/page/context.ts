import { createContextSelector } from "@/common/utils/create-context-selector";
import { createContext } from "use-context-selector";

type ContextProps = {
	handleGoBack?: () => void;
	isLoading?: boolean;
};

const defaultValue = {
	handleGoBack: () => {},
};

export const PageContext = createContext<ContextProps>(defaultValue);

export const usePageContext = createContextSelector(PageContext);
