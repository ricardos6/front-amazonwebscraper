import React, { useState } from "react";
import { deepClone } from "../../utils/utils";
import Button from "react-bootstrap/Button";
import "./leftPanel.css";
import { useEffect } from "react";

const aggregationsMapping = {
	os: "Operation System",
	cellular_technology: "Cellular Technology",
	memory_storage: "Storage",
	brand: "Brand",
};

export const LeftPanel = ({ aggregations, setCompleteQuery }) => {
	const [_aggregations, setAggregations] = useState({});

	useEffect(() => {
		const aggregationsCopy = aggregations ? deepClone(aggregations) : {};
		if (!!aggregationsCopy && Object.keys(aggregationsCopy).length > 0) {
			setAggregations(aggregationsCopy);
		}
	}, [aggregations]);

	const onClickAggregation = (key, value) => {
		setCompleteQuery((curr) => ({
			...curr,
			facetFilters: { ...curr.facetFilters, [key]: value },
			page: 0,
		}));
	};

	return (
		<div className="left-panel__main">
			<div className="left-panel__wrapper">
				<div className="left-panel__inputsWrapper">
					{Object.entries(_aggregations).map(([key, value]) => {
						return (
							<div key={key} className="left-panel__agg-wrapper">
								<div className="left-panel__agg-title">
									{aggregationsMapping[key]}
								</div>
								<div className="left-panel__agg-buckets">
									{value.buckets.map((agg) => (
										<Button
											variant="link"
											key={`${agg.key}`}
											className="left-panel__agg-link"
											onClick={() => onClickAggregation(key, agg.key)}
										>{`${agg.key} (${agg.doc_count})`}</Button>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
