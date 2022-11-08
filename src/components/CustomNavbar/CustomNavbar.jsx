import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./customNavbar.css";
import {useRef, useState} from "react";

export const CustomNavbar = ({setQuery, setPage}) => {
    const searchKeywords = useRef("");
    const [invalidForm, setInvalidForm] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKeywords.current?.length < 4) {
            // Important! Only allowed query with length > 3
            // due to inconsistents with lower values and n-gram tokenizer
            setInvalidForm(true);
        } else {
            setQuery(searchKeywords.current);
            setPage(0);
            setInvalidForm(false);
        }
    };

    return (
        <Navbar className="custom-navbar" expand="lg" variant="dark" fixed="top">
            <Navbar.Brand className="customNavbar__title">
                Mobile Search Engine
            </Navbar.Brand>
            <div className="custom-navbar_search-container">
                <Form onSubmit={handleSearch} hasValidation>
                    <div className="custom-navbar_search-bar">
                        <Form.Control
                            type="search"
                            placeholder={"Search"}
                            size="sm"
                            onChange={(e) => {
                                searchKeywords.current = e.target.value;
                            }}
                            isInvalid={invalidForm}
                        />
                        <Button variant="outline-light" onClick={handleSearch}>
                            Search
                        </Button>
                    </div>
                    {/* TODO: Message "Write minimum 4 characters for user feedback"  */}
                </Form>
            </div>
        </Navbar>
    );
};
