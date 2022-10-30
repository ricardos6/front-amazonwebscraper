import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { CatalogCard } from "./CatalogCard/CatalogCard";
import "./catalog.css";

export const Catalog = ({ items, hasMore, lastBookElementRef }) => {
	return (
		<div className="catalog__main">
			<Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4 catalog__row">
				{items.map((item, idx) => {
					let props = {};
					if (items.length === idx + 1) {
						props = { lastBookElementRef: lastBookElementRef };
					}
					return (
						<Col key={idx} className="catalog__col">
							<CatalogCard item={item} {...props} />
						</Col>
					);
				})}
				{hasMore && (
					<Col key={"loader"} className="catalog__col">
						<div className="catalog-loader">
							<Spinner role="status" animation="border" />
						</div>
					</Col>
				)}
			</Row>
		</div>
	);
};
