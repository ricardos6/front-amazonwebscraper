import React, { useMemo } from "react";
import { Badge, Button } from "react-bootstrap";
import { BsXCircle } from "react-icons/bs";
import "./catalogHeader.css";

export const CatalogHeader = ({
	totalElements,
	facetFilters,
	setCompleteQuery,
}) => {
	const clearFilters = () => {
		setCompleteQuery((curr) => ({
			...curr,
			facetFilters: {
				cellular_technology: "",
				memory_storage: "",
				os: "",
				brand: "",
			},
		}));
	};

	const filtersList = useMemo(() => {
		const removeFilter = (filterKey) => {
			setCompleteQuery((curr) => ({
				...curr,
				facetFilters: {
					...curr.facetFilters,
					[filterKey]: "",
				},
			}));
		};
		const filterNameMapShort = {
			memory_storage: "Storage",
			os: "OS",
			brand: "Brand",
			cellular_technology: "Technology",
		};
		return Object.entries(facetFilters)
			.filter((item) => item[1] !== "")
			.map(([key, value]) => (
				<Badge
					key={key}
					bg="secondary"
					className="catalog-header__filters__badge"
				>
					<span className="catalog-header__filters__badge-content">
						{`${filterNameMapShort[key]}: ${value}`}
						<BsXCircle
							className="catalog-header__filters__badge-icon-delete"
							onClick={() => removeFilter(key)}
						/>
					</span>
				</Badge>
			));
	}, [facetFilters, setCompleteQuery]);

	return (
		<>
			<div className="catalog-header">
				<div className="catalog-header__filters">
					{filtersList.length ? (
						<Button size="sm" variant="danger" onClick={clearFilters}>
							Clear filters
						</Button>
					) : null}
					{filtersList}
				</div>

				<span className="catalog-header__count">{`Total: ${totalElements}`}</span>
			</div>
			<div className="catalog-header__verticalDivider" />
		</>
	);
};
