import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { firebase } from "../firebase";
import { createUserWithEmailAndPassword, createUserProfile } from "../firebase";

export default function SignUp() {
  const [firstNameRef, setFirstName] = useState("");
  const [lastNameRef, setLastName] = useState("");
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

      if (isClient) {
        await handleClientSignup();
      } else {
        await handleFreelancerSignup();
      }

      navigate("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  // const handleSignUp = (email, password, name, role) => {
  //   createUserWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       // Create user profile
  //       createUserProfile(user.uid, email, name, role);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //     });
  // };

  async function handleClientSignup() {
    setLoading(true);
    setError("");

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      await createUser(
        emailRef.current.value,
        passwordRef.current.value,
        "client"
      );
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleFreelancerSignup() {
    setLoading(true);
    setError("");

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      await createUser(
        emailRef.current.value,
        passwordRef.current.value,
        "freelancer"
      );

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function createUser(email, password, userType) {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;
    const userData = {
      email: email,
      userType: userType,
      firstName: firstNameRef,
      lastName: lastNameRef,
    };

    if (userType === "client") {
      await firebase.firestore().collection("clients").doc(uid).set(userData);
    } else {
      await firebase
        .firestore()
        .collection("freelancers")
        .doc(uid)
        .set(userData);
    }

    return userCredential;
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="first-name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstNameRef}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="last-name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastNameRef}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
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
