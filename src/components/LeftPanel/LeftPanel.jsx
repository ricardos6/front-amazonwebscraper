import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "./leftPanel.css";
import React, { useRef, useState } from "react";
import { findAllFields } from "../../services/ElasticSearchService";

export const LeftPanel = () => {
	const [items, setItems] = useState([]);
	const searchKeywords = useRef("");

	const params = {
		query: {
			bool: {
				must: [
					{
						match: {
							full: "4g",
						},
					},
				],
				//   "filter": [
				//     { "term":  { "status": "published" }},
				//     { "range": { "publish_date": { "gte": "2015-01-01" }}}
				//   ]
			},
		},
	};
	return (
		<div className="left-panel__main">
			<div className="left-panel__wrapper">
				<div className="left-panel__inputsWrapper">
					<InputGroup className="mb-3" size="sm">
						<Form.Control
							as="input"
							size="sm"
							placeholder="Search"
							onChange={(e) => {
								searchKeywords.current = e.target.value;
							}}
						/>
						<Button
							variant="outline-secondary"
							onClick={() => {
								console.log(searchKeywords.current);
								findAllFields(params).then((result) => {
									console.log("search result", result);
								});
							}}
						>
							Search
						</Button>
					</InputGroup>
				</div>
				<div className="verticalDivider" />
			</div>
		</div>
	);
};
