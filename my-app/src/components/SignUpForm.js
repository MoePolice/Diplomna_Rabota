import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();

  const handleClientSignUp = () => {
    navigate("/signup", { state: { isClient: true } });
  };

  const handleFreelancerSignUp = () => {
    navigate("/signup", { state: { isClient: false } });
  };

  return (
    <Container className="my-5 square border p-5">
      <h2 className="text-center mb-4">Join as a client or freelancer</h2>
      <Row className="flex-row align-items-center justify-content-center">
        <Col xs={12} sm={6} className="mb-3">
          <Button
            variant="primary"
            className="w-100"
            onClick={handleClientSignUp}
          >
            Client
          </Button>
        </Col>
        <Col xs={12} sm={6} className="mb-3">
          <Button
            variant="secondary"
            className="w-100"
            onClick={handleFreelancerSignUp}
          >
            Freelancer
          </Button>
        </Col>
      </Row>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </Container>
  );
};

export default SignUpForm;
