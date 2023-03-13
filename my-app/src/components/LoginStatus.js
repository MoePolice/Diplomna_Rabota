import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginStatus() {
  const { currentUser } = useAuth();

  return (
    <div className="w-100 text-center mt-2">
      {currentUser ? (
        <button className="btn btn-primary">Log Out</button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}
