import { useEffect, useState } from "react";
import { findAllFields } from "../services/ElasticSearchService";

const aggregations = {
	aggs: {
		cellular_technology: {
			terms: {
				field: "cellular_technology",
			},
		},
		memory_storage: {
			terms: {
				field: "memory_storage",
			},
		},
		os: {
			terms: {
				field: "os",
			},
		},
		brand: {
			terms: {
				field: "brand",
			},
		},
	},
};

const searchResultInitialInfo = { items: [], aggsInfo: {} };

export const useElasticSearch = (query, page) => {
	const [searchResult, setSearchResult] = useState(searchResultInitialInfo);
	const [hasMore, setHasMore] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setSearchResult(searchResultInitialInfo);
	}, [query]);

	useEffect(() => {
		const params =
			query === "" || query === undefined
				? {}
				: {
						query: {
							bool: {
								must: [
									{
										match: {
											full: query,
										},
									},
								],
								//   "filter": [
								//     { "term":  { "status": "published" }},
								//     { "range": { "publish_date": { "gte": "2015-01-01" }}}
								//   ]
							},
						},
				  };
		setLoading(true);
		findAllFields({ ...params, ...aggregations, from: page * 10, size: 10 })
			.then((result) => {
				setSearchResult((prevItems) => ({
					items: [
						...new Set([
							...prevItems.items,
							...result.hits.hits.map((h) => h._source),
						]),
					],
					aggsInfo: result.aggregations,
				}));
				console.log(result.hits.total.value);
				setHasMore(result.hits.total.value > 0);
				setLoading(false);
			})
			.catch((err) => setError(err));
	}, [query, page]);

	return { searchResult, hasMore, loading, error };
};
