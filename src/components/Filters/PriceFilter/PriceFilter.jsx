import React from "react";
import Form from "react-bootstrap/Form";
import { split } from "../utils";
import "../filters.css";

export const PriceFilter = ({ setCompleteQuery, minMaxValues }) => {
	const listOptionsCalculated = React.useMemo(() => {
		if (minMaxValues?.price) {
			const values = split(
				minMaxValues?.price?.min.value,
				minMaxValues?.price?.max.value,
				6
			);
			const listOrdered = [
				{
					label: "Any",
					minValue: 0,
					maxValue: 0,
				},
			].concat(
				values.map((v, idx, array) => {
					return {
						label: idx === 0 ? `${0}€ - ${v}€` : `${array[idx - 1]}€ - ${v}€`,
						minValue: idx === 0 ? 0 : array[idx - 1],
						maxValue: v,
					};
				})
			);

			return listOrdered || [];
		}
	}, [minMaxValues?.price]);

	const onChange = (key, value) => {
		setCompleteQuery((curr) => {
			const { price, ...rest } = { price: undefined, ...curr.rangeFilters };
			return {
				...curr,
				rangeFilters: {
					...rest,
					[key]: {
						gte: listOptionsCalculated?.[value]?.minValue,
						lte: listOptionsCalculated?.[value]?.maxValue,
					},
					...(listOptionsCalculated?.[value]?.maxValue === 0
						? {
								[key]: {
									gte: 0,
								},
						  }
						: {}),
					...(listOptionsCalculated?.[value]?.maxValue === -1
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
					{listOptionsCalculated ? (
						listOptionsCalculated
							.sort((a, b) => a.maxValue < b.maxValue)
							.map((item, idx) => {
								return (
									<option key={idx} label={item.label} value={idx}>
										{item.label}
									</option>
								);
							})
					) : (
						<option>Loading...</option>
					)}
				</Form.Select>
			</Form.Group>
		</span>
	);
};
