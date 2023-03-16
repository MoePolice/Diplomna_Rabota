import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/search?q=${query}`);
      const results = await response.json();
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex">
      <Form>
        <Form.Control
          type="text"
          placeholder="Search for services"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mr-sm-2"
        />
      </Form>
      <Button type="submit" variant="outline-success" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
