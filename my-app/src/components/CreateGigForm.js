import React, { useState } from "react";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import { createGig } from "../firebase";

const CreateGigForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createGig(name, price, deadline, description);
      alert("Gig created successfully!");
      setName("");
      setPrice("");
      setDescription("");
      setDeadline("");
    } catch (error) {
      console.error("Error creating gig: ", error);
      const errorMessage = error.message || "Error creating gig!";
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form.Group controlId="formBasicName">
        <Form.Label>Gig Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formBasicDeadline">
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter deadline"
          value={deadline}
          min={today}
          onChange={(event) => setDeadline(event.target.value)}
        />
      </Form.Group>

      <Button className="w-100 auto mt-3" variant="primary" type="submit">
        Create Gig
      </Button>
    </Form>
  );
};

export default CreateGigForm;
