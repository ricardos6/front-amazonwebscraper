import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { CatalogCard } from "./CatalogCard/CatalogCard";
import { CatalogHeader } from "./CatalogHeader/CatalogHeader";
import "./catalog.css";

export const Catalog = ({
	items,
	hasMore,
	totalElements,
	loading,
	setCompleteQuery,
	facetFilters,
	lastBookElementRef,
}) => {
	return (
		<div className="catalog-container">
			<CatalogHeader
				totalElements={totalElements}
				facetFilters={facetFilters}
				setCompleteQuery={setCompleteQuery}
				loading={loading}
			/>
			<div className="catalog__main">
				<Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4 catalog__row">
					{items.map((item, idx) => (
						<Col key={idx} className="catalog__col">
							<CatalogCard item={item} />
						</Col>
					))}
					{hasMore && (
						<Col key={"loader"} className="catalog__col">
							<div className="catalog-loader" ref={lastBookElementRef}>
								<Spinner role="status" animation="border" />
							</div>
						</Col>
					)}
				</Row>
			</div>
		</div>
	);
};
