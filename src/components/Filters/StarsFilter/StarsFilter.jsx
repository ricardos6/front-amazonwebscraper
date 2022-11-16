import React from "react";
import Form from "react-bootstrap/Form";
import "../filters.css";

const starsFilterOptions = {
	0: {
		value: 0,
		label: "Any",
	},
	1: {
		value: 1,
		label: "1 or more",
	},
	1.5: {
		value: 1.5,
		label: "1.5 or more",
	},
	2: {
		value: 2,
		label: "2 or more",
	},
	2.5: {
		value: 2.5,
		label: "2.5 or more",
	},
	3: {
		value: 3,
		label: "3 or more",
	},
	3.5: {
		value: 3.5,
		label: "3.5 or more",
	},
	4: {
		value: 4,
		label: "4 or more",
	},
	4.5: {
		value: 4.5,
		label: "4.5 or more",
	},
};

export const StarsFilter = ({ setCompleteQuery }) => {
	const onChange = (key, value, operation) => {
		setCompleteQuery((curr) => ({
			...curr,
			rangeFilters: {
				...curr.rangeFilters,
				[key]: { gte: value },
			},
		}));
	};

	return (
		<span>
			<Form.Group>
				<Form.Label className="filter-label">Rating</Form.Label>
				<Form.Select
					size="sm"
					className="more-filters__filter"
					defaultValue={0}
					onChange={(e) => {
						onChange("rating", e.target.value, "gte");
					}}
				>
					{Object.entries(starsFilterOptions)
						.sort()
						.map(([key, value]) => {
							return (
								<option key={key} label={value.label} value={value.value}>
									{value.label}
								</option>
							);
						})}
				</Form.Select>
			</Form.Group>
		</span>
	);
};
