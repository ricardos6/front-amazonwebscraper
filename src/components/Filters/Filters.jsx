import React from "react";
import { StarsFilter } from "./StarsFilter/StarsFilter";
import "./filters.css";

export const Filters = ({ setCompleteQuery }) => {
	return (
		<div className="app__main__more-filters">
			<StarsFilter setCompleteQuery={setCompleteQuery} />
		</div>
	);
};
