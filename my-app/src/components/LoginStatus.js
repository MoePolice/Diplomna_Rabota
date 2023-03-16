import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LoginStatus() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch {
      console.log("Failed to log out");
    }
  }

  return (
    <div className="d-flex justify-content-center mt-2">
      {currentUser ? (
        <Button
          variant="primary"
          style={{ width: "120px" }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}
