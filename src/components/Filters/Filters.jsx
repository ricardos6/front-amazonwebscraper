import React from "react";
import { StarsFilter } from "./StarsFilter/StarsFilter";
import "./filters.css";
import { PriceFilter } from "./PriceFilter/PriceFilter";

export const Filters = ({ setCompleteQuery, aggsInfo }) => {
	return (
		<div className="app__main__more-filters">
			<StarsFilter setCompleteQuery={setCompleteQuery} />
			<PriceFilter setCompleteQuery={setCompleteQuery} aggsInfo={aggsInfo} />
		</div>
	);
};
