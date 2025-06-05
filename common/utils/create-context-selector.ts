import { type Context, useContextSelector } from "use-context-selector";

export const createContextSelector =
	<T>(context: Context<T>) =>
	<Selected>(selector: (state: T) => Selected) => {
		return useContextSelector(context, selector);
	};
