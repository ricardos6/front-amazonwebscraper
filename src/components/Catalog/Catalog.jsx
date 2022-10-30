import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { CatalogCard } from "./CatalogCard/CatalogCard";
import "./catalog.css";

export const Catalog = ({ items, loading, ...props }) => {
	return !loading ? (
		<div className="catalog__main">
			<Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4 catalog__row">
				{items.map((item, idx) => (
					<Col key={idx} className="catalog__col">
						<CatalogCard item={item} />
					</Col>
				))}
			</Row>
		</div>
	) : (
		<div className="catalog-loader">
			<Spinner role="status" animation="border" />
		</div>
	);
};
