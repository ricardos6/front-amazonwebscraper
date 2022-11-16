import React from "react";
import Form from "react-bootstrap/Form";
import { split } from "../utils";

export const ScreenSizeFilter = ({ setCompleteQuery, minMaxValues }) => {
	const listOptionsCalculated = React.useMemo(() => {
		if (minMaxValues?.screen_size) {
			const values = split(
				minMaxValues?.screen_size?.min.value,
				minMaxValues?.screen_size?.max.value,
				6
			);
			console.log("values split", values);

			if (values[0] === 0) {
				values.splice(0, 1);
			}
			const listOrdered = [
				{
					label: "Any",
					minValue: 0,
					maxValue: 0,
				},
			].concat(
				values.map((v, idx, array) => {
					return {
						label: idx === 0 ? `${0} - ${v}` : `${array[idx - 1]} - ${v}`,
						minValue: idx === 0 ? 0 : array[idx - 1],
						maxValue: v,
					};
				})
			);

			return listOrdered || [];
		}
	}, [minMaxValues?.screen_size]);

	console.log("listOptionsCalculated", listOptionsCalculated);

	const onChange = (key, value) => {
		setCompleteQuery((curr) => {
			const { screen_size, ...rest } = {
				screen_size: undefined,
				...curr.rangeFilters,
			};
			return {
				...curr,
				rangeFilters: {
					...rest,
					[key]: {
						gte: listOptionsCalculated?.[value]?.minValue,
						lte: listOptionsCalculated?.[value]?.maxValue,
					},
					...(listOptionsCalculated?.[value]?.minValue === 0
						? {
								[key]: {
									gte: 0,
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
				<Form.Label className="filter-label">Screen size</Form.Label>
				<Form.Select
					size="sm"
					className="more-filters__filter"
					defaultValue={0}
					onChange={(e) => {
						onChange("screen_size", e.target.value);
					}}
				>
					{listOptionsCalculated ? (
						listOptionsCalculated
							.sort((a, b) => a.maxValue > b.maxValue)
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
