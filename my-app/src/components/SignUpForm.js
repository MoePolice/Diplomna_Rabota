import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

const SignUpForm = () => {
  return (
    <Container
      className="my-5"
      style={{ border: "1px solid black", width: "200%", height: "100%" }}
    >
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Join as a client or freelancer</h2>
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <Button variant="primary" block>
                Client
              </Button>
            </Col>
            <Col xs={12} md={6}>
              <Button variant="secondary" block>
                Freelancer
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <Button variant="success" block>
            Create Account
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <p className="text-center">Already have an account?</p>
          <p className="text-center">Log In</p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
