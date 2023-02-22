import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { firebase } from "../firebase";
import { createUserWithEmailAndPassword, createUserProfile } from "../firebase";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { state } = useLocation();
  const isClient = state && state.isClient;

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  const handleSignUp = (email, password, name, role) => {
    createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Create user profile
        createUserProfile(user.uid, email, name, role);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  function handleClientSignup() {
    setLoading(true);
    setError("");
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    signup(emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        const email = userCredential.user.email;
        firebase
          .firestore()
          .collection("clients")
          .doc(uid)
          .set({
            email: email,
          })
          .then(() => {
            navigate("/dashboard");
          })
          .catch((error) => {
            setError(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  function handleFreelancerSignup() {
    setLoading(true);
    setError("");
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    signup(emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        const email = userCredential.user.email;
        firebase
          .firestore()
          .collection("freelancers")
          .doc(uid)
          .set({
            email: email,
          })
          .then(() => {
            navigate("/dashboard");
          })
          .catch((error) => {
            setError(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
