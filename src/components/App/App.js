import { LeftPanel } from "../LeftPanel/LeftPanel";
import { CustomNavbar } from "../CustomNavbar/CustomNavbar";
import { Catalog } from "../Catalog/Catalog";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import { useElasticSearch } from "../../hooks/useElasticSearch";
import { Filters } from "../Filters/Filters";

function App() {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);

	const { searchResult, hasMore, loading, error } = useElasticSearch(
		query,
		page
	);

	return (
		<div className="app__main">
			<CustomNavbar setQuery={setQuery} />
			<Filters />
			<div className="app__main__container">
				<LeftPanel aggregations={searchResult.aggsInfo} />
				<Catalog items={searchResult.items} loading={loading} />
			</div>
		</div>
	);
}

export default App;
