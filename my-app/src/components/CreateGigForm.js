import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createGig } from "../firebase";

const CreateGigForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    createGig(name, price, deadline)
      .then(() => {
        alert("Gig created successfully!");
        setName("");
        setPrice("");
        setDeadline("");
      })
      .catch((error) => {
        console.error("Error creating gig: ", error);
        alert("Error creating gig!");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Gig Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPrice">
        <Form.Label>Gig Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDeadline">
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter deadline"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Gig
      </Button>
    </Form>
  );
};

export default CreateGigForm;
