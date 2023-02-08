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

function MainPage() {
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
              <Nav.Link href="signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="my-5">
        <Row>
          <Col md={12}>
            <h1 className="text-center">Welcome to Freelance Webpage</h1>
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              auctor, massa id consectetur iaculis, quam nulla auctor diam, vel
              placerat lacus ipsum id odio.
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md={4}>
            <h3 className="text-center">Services</h3>
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              auctor, massa id consectetur iaculis, quam nulla auctor diam, vel
              placerat lacus ipsum id odio.
            </p>
          </Col>
          <Col md={4}>
            <h3 className="text-center">Portfolio</h3>
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              auctor, massa id consectetur iaculis, quam nulla auctor diam, vel
              placerat lacus ipsum id odio.
            </p>
          </Col>
          <Col md={4}>
            <h3 className="text-center">About</h3>
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              auctor, massa id consectetur iaculis, quam nulla auctor diam, vel
              placerat lacus ipsum id odio.
            </p>
          </Col>
        </Row>
      </Container>
      <Container className="my-5">
        <Row>
          <Col md={12}>
            <h2 className="text-center">Contact Us</h2>
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              auctor, massa id consectetur iaculis, quam nulla auctor diam, vel
              placerat lacus ipsum id odio.
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
      <Footer />
    </>
  );
}

export default MainPage;
