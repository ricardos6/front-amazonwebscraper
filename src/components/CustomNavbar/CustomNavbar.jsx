import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./customNavbar.css";
import { useRef } from "react";

export const CustomNavbar = ({ setQuery }) => {
	const searchKeywords = useRef("");

	const handleSearch = (e) => {
		e.preventDefault();
		setQuery(searchKeywords.current);
	};

	return (
		<Navbar className="custom-navbar" expand="lg" variant="dark" fixed="top">
			<Navbar.Brand className="customNavbar__title">
				Mobile Search Engine
			</Navbar.Brand>
			<Form className="d-flex" onSubmit={handleSearch}>
				<Form.Control
					type="search"
					placeholder="Search"
					className="me-2"
					size="sm"
					onChange={(e) => {
						searchKeywords.current = e.target.value;
					}}
				/>
				<Button variant="outline-light" onClick={handleSearch}>
					Search
				</Button>
			</Form>
		</Navbar>
	);
};
