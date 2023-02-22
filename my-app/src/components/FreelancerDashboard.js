import React from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import CreateGigForm from "./CreateGigForm";

const FreelancerDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <Container className="my-5 square border p-5">
      <h2 className="text-center mb-4">Freelancer Dashboard</h2>
      {currentUser && currentUser.role === "freelancer" && <CreateGigForm />}
    </Container>
  );
};

export default FreelancerDashboard;
