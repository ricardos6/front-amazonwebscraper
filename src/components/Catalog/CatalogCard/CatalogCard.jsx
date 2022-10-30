import React from "react";
import Card from "react-bootstrap/Card";
import Rating from "@mui/material/Rating";
import Spinner from "react-bootstrap/Spinner";
import "./catalogCard.css";

export const CatalogCard = ({ item, lastBookElementRef, loader }) => {
	return (
		<Card className="catalog__card">
			{!loader && (
				<>
					<div className="card__img-wrapper" ref={lastBookElementRef}>
						<Card.Img className="card__img" variant="top" src={item.image} />
					</div>
				</>
			)}
			<Card.Body className="catalog__card-body">
				{!loader && (
					<>
						<Card.Title className="catalog__card-title">
							{item.model_name}
						</Card.Title>
						<div className="catalog__card-body__info">
							<div>{item.brand}</div>
							<div>{item.cellular_technology}</div>
							<div>{item.memory_storage}</div>
							<div>{item.os}</div>
							<div>{item.price}</div>
							<div>{item.connectivity}</div>
							<div>{item.wireless_net_tech}</div>
							<div>{item.screen_size}</div>
						</div>
					</>
				)}

				{loader && (
					<div className="card-loader">
						<Spinner role="status" animation="border" />
					</div>
				)}
			</Card.Body>
			{!loader && (
				<Card.Footer className="catalog__card-footer">
					<>
						<div className="catalog__card-footer-rating">
							{item.rating ? (
								<Rating
									value={item.rating}
									precision={0.1}
									readOnly
									size="small"
								/>
							) : (
								"Not available"
							)}
						</div>

						<div className="catalog__card-footer__number-ratings">
							{item.number_ratings ? `${item.number_ratings} ratings` : ""}
						</div>
					</>
				</Card.Footer>
			)}
		</Card>
	);
};
