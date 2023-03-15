import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="d-flex">
      <Form onSubmit={handleSubmit} inline>
        <Form.Control
          type="text"
          placeholder="Search for services"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mr-sm-2"
        />
      </Form>
      <Button type="submit" variant="outline-success" onClick={handleSubmit}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
