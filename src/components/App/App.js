import { useCallback, useRef, useState } from "react";
import { LeftPanel } from "../LeftPanel/LeftPanel";
import { CustomNavbar } from "../CustomNavbar/CustomNavbar";
import { Catalog } from "../Catalog/Catalog";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useElasticSearch } from "../../hooks/useElasticSearch";
import { Filters } from "../Filters/Filters";

function App() {
	const [completeQuery, setCompleteQuery] = useState({
		query: "",
		facetFilters: {
			cellular_technology: "",
			memory_storage: "",
			os: "",
			brand: "",
		},
		page: 0,
	});

	const minMaxValuesRef = useRef();

	const { searchResult, hasMore, loading } = useElasticSearch(
		completeQuery,
		minMaxValuesRef
	);

	const observer = useRef();
	const lastBookElementRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					//	Do not remove! helpful to understand infinite scroll
					// console.log("node", node);
					// console.log("entries is intercepted", entries[0]);
					setCompleteQuery((curr) => ({ ...curr, page: curr.page + 1 }));
				}
			});
			if (node) {
				observer.current.observe(node);
			}
		},
		[loading, hasMore, setCompleteQuery]
	);

	return (
		<div className="app__main">
			<CustomNavbar setCompleteQuery={setCompleteQuery} />
			<Filters
				setCompleteQuery={setCompleteQuery}
				aggsInfo={searchResult.aggsInfo}
				maxValues={searchResult.maxValues}
				minMaxValues={minMaxValuesRef.current}
			/>
			<div className="app__main__container">
				<LeftPanel
					aggregations={searchResult.aggsInfo}
					setCompleteQuery={setCompleteQuery}
				/>
				<Catalog
					items={searchResult.items}
					hasMore={hasMore}
					totalElements={searchResult.totalElements}
					loading={loading}
					setCompleteQuery={setCompleteQuery}
					facetFilters={completeQuery.facetFilters}
					lastBookElementRef={lastBookElementRef}
				/>
			</div>
		</div>
	);
}

export default App;
