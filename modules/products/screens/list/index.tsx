import { ListView } from "./list.view";
import { useListViewModel } from "./list.view-model";

const ListScreen = () => {
	const props = useListViewModel();

	return <ListView {...props} />;
};

export default ListScreen;
