import React from "react";
import {
  Container,
  Image,
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "./MainPage.css";
import Footer from "./Footer";
import logo from "../img/Logo.jpg";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import CreateGigForm from "../components/CreateGigForm";

function MainPage() {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      currentUser.getIdTokenResult().then((idTokenResult) => {
        if (idTokenResult.claims.type === "client") {
          setUserType("client");
        } else if (idTokenResult.claims.type === "freelancer") {
          setUserType("freelancer");
        }
      });
    }
  }, []);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <Image src={logo} width="200" height="60" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-flex justify-content-between"
          >
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <Form inline className="d-flex">
              <FormControl type="text" placeholder="Search" className="mr-5" />
              <Button variant="outline-success" className="">
                Search
              </Button>
            </Form>
            <Nav className="d-flex justify-content-end">
              <Nav.Link href="login">Log In</Nav.Link>
              <Nav.Link href="signupform">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="my-5">
        <Row>
          <Col md={12}>
            <h1 className="text-center">Welcome to Freelance Webpage</h1>
            <p className="text-center">
              Need help with a project or looking for work? Look no further than
              Freelance Webpage. Our platform connects talented freelancers with
              people like you who need their expertise.
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md={4}>
            <h3 className="text-center">Services</h3>
            <p className="text-center">
              Find the right freelancer for any job, big or small, with
              Freelance Webpage. Our platform offers a wide variety of services,
              from web design to content creation and everything in between.
            </p>
          </Col>
          <Col md={4}>
            <h3 className="text-center">Portfolio</h3>
            <p className="text-center">
              Want to see the work of our talented freelancers? Check out our
              portfolio section to browse through examples of completed projects
              and find inspiration for your own.
            </p>
          </Col>
          <Col md={4}>
            <h3 className="text-center">About</h3>
            <p className="text-center">
              Learn more about Freelance Webpage and the team behind it. Our
              mission is to make it easy for freelancers and clients to find
              each other and work together in a seamless and enjoyable way.
            </p>
          </Col>
        </Row>
      </Container>
      <Container className="my-5">
        <Row>
          <Col md={12}>
            <h2 className="text-center">Contact Us</h2>
            <p className="text-center">
              Have questions or feedback? We're always here to help. Get in
              touch with us through our contact form and we'll get back to you
              as soon as possible.
            </p>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <CreateGigForm />
      <Footer />
    </>
  );
}

export default MainPage;
