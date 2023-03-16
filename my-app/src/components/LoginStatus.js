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
    <div className="w-100 text-center mt-2">
      {currentUser ? (
        <Button variant="primary" onClick={handleLogout}>
          Log Out
        </Button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}
