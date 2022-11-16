import React from "react";
import Form from "react-bootstrap/Form";
import { priceList } from "./priceList";
import "../filters.css";

export const PriceFilter = ({ setCompleteQuery, aggsInfo }) => {
	const onChange = (key, value) => {
		setCompleteQuery((curr) => {
			const { price, ...rest } = { price: undefined, ...curr.rangeFilters };
			return {
				...curr,
				rangeFilters: {
					...rest,
					[key]: {
						gte: priceList[value].minValue,
						lte: priceList[value].maxValue,
					},
					...(priceList[value].minValue === 0
						? {
								[key]: {
									gte: 0,
								},
						  }
						: {}),
					...(priceList[value].maxValue === -1
						? {
								[key]: {
									gte: 2000,
								},
						  }
						: {}),
				},
			};
		});
	};

	return (
		<span>
			<Form.Group>
				<Form.Label className="filter-label">Price</Form.Label>
				<Form.Select
					size="sm"
					className="more-filters__filter"
					defaultValue={0}
					onChange={(e) => {
						onChange("price", e.target.value);
					}}
				>
					{Object.entries(priceList || {})
						.sort(([aKey], [bKey]) => aKey > bKey)
						.map(([key, value]) => {
							return (
								<option key={key} label={value.label} value={key}>
									{value.label}
								</option>
							);
						})}
				</Form.Select>
			</Form.Group>
		</span>
	);
};
