import { ListView } from "./view";
import { useListViewModel } from "./view-model";

const ListScreen = () => {
	const props = useListViewModel();

	return <ListView {...props} />;
};

export default ListScreen;
