import React from "react";
import Form from "react-bootstrap/Form";
import "./leftPanel.css";

const aggregationsMapping = {
	os: "Operation System",
	cellular_technology: "Cellular Technology",
	memory_storage: "Storage",
	brand: "Brand",
};

export const LeftPanel = ({ aggregations }) => {
	console.log(aggregations);

	return (
		<div className="left-panel__main">
			<div className="left-panel__wrapper">
				<div className="left-panel__inputsWrapper">
					{Object.entries(aggregations).map(([key, value]) => {
						return (
							<div className="left-panel__agg-wrapper">
								<div className="left-panel__agg-title">
									{aggregationsMapping[key]}
								</div>
								<div>
									{value.buckets.map((agg) => (
										<Form.Check
											type={"checkbox"}
											id={`default-${agg.key}`}
											label={`${agg.key}`}
										/>
									))}
								</div>
							</div>
						);
					})}
				</div>
				{/* <div className="verticalDivider" /> */}
			</div>
		</div>
	);
};
