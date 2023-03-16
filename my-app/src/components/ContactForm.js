import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../firebase";

export default function ContactForm() {
  const emailRef = useRef();
  const messageRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const message = messageRef.current.value;
    db.collection("emails")
      .add({
        email: email,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setMessage("Your message has been sent!");
      })
      .catch((error) => {
        setError("Oops, something went wrong. Please try again later.");
        console.error(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicMessage">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows="3" ref={messageRef} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        Submit
      </Button>
    </Form>
  );
}
