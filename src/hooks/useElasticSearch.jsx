import React, { useEffect, useState } from "react";
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
		"max-price": {
			max: {
				field: "price",
			},
		},
		"min-price": {
			min: {
				field: "price",
			},
		},
		"max-screen-size": {
			max: {
				field: "screen_size",
			},
		},
		"min-screen-size": {
			min: {
				field: "screen_size",
			},
		},
	},
};

const searchResultInitialInfo = { items: [], aggsInfo: {}, totalElements: 0 };

export const useElasticSearch = (completeQuery) => {
	const [searchResult, setSearchResult] = useState(searchResultInitialInfo);
	const [hasMore, setHasMore] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const queryTransformed = React.useMemo(() => {
		return completeQuery.query === "" || completeQuery.query === undefined
			? []
			: completeQuery.query
					.split(" ")
					.map((q) => ({ match: { full: `${q}` } }));
	}, [completeQuery.query]);

	const facetFiltersTransformed = React.useMemo(
		() =>
			Object.entries(completeQuery.facetFilters)
				.filter(([_, value]) => value && value !== "")
				.map((item) => ({ term: { [item[0]]: item[1] } })),
		[completeQuery.facetFilters]
	);

	const rangeFiltersTransformed = React.useMemo(() => {
		return Object.entries(completeQuery.rangeFilters || {})
			.filter(([_, value]) => {
				return value.gte !== "0" && value.lte !== "0";
			})
			.map((item) => {
				return {
					range: { [item[0]]: item[1] },
				};
			});
	}, [completeQuery.rangeFilters]);

	useEffect(() => {
		const params = {
			query: {
				function_score: {
					query: {
						bool: {
							must: queryTransformed.concat(rangeFiltersTransformed),
							filter: facetFiltersTransformed,
						},
					},
					boost: "2",
					script_score: {
						script: {
							source:
								"(doc['rating'].value + doc['number_ratings'].value) / 100000",
						},
					},
					score_mode: "max",
					boost_mode: "multiply",
				},
			},
		};

		setLoading(true);
		findAllFields({
			...params,
			...aggregations,
			from: completeQuery.page * 10,
			size: 10,
		})
			.then((result) => {
				if (result?.status !== undefined && result.status !== 200) {
					setSearchResult(() => ({
						items: [],
						aggsInfo: {},
						totalElements: 0,
					}));
					return;
				}
				setSearchResult((prevItems) => ({
					items: [
						...new Set([
							...(completeQuery.page > 0 ? prevItems.items : []),
							...result?.hits?.hits?.map?.((h) => h?._source ?? []),
						]),
					],
					aggsInfo: result.aggregations,
					totalElements: result.hits.total.value,
					maxValues: {
						"max-price": result.aggregations["max-price"].value,
						"min-price": result.aggregations["min-price"].value,
					},
				}));
				setHasMore(completeQuery.page * 10 + 10 < result.hits.total.value);
				setLoading(false);
			})
			.catch(() => {
				setSearchResult(() => ({
					items: [],
					aggsInfo: {},
					totalElements: 0,
				}));
				setHasMore(false);
				setLoading(false);
			});
	}, [
		completeQuery,
		facetFiltersTransformed,
		queryTransformed,
		rangeFiltersTransformed,
	]);

	return { searchResult, hasMore, loading, error };
};
