import { FilterView } from "./view";
import { useFilterViewModel } from "./view-model";

const FilterScreen = () => {
	const props = useFilterViewModel();

	return <FilterView {...props} />;
};

export default FilterScreen;
