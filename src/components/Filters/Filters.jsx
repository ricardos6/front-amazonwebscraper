import React from "react";
import { StarsFilter } from "./StarsFilter/StarsFilter";
import { PriceFilter } from "./PriceFilter/PriceFilter";
import { ScreenSizeFilter } from "./ScreenSizeFilter/ScreenSizeFilter";
import "./filters.css";
import { NumberRatingsFilter } from "./NumberRatingsFilter/NumberRatingsFilter";

export const Filters = ({ setCompleteQuery, aggsInfo, minMaxValues }) => {
	return (
		<div className="app__main__more-filters">
			<StarsFilter setCompleteQuery={setCompleteQuery} />
			<PriceFilter
				setCompleteQuery={setCompleteQuery}
				minMaxValues={minMaxValues}
			/>
			<ScreenSizeFilter
				setCompleteQuery={setCompleteQuery}
				minMaxValues={minMaxValues}
			/>
			<NumberRatingsFilter
				setCompleteQuery={setCompleteQuery}
				minMaxValues={minMaxValues}
			/>
		</div>
	);
};
