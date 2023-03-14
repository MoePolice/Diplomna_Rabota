import React from "react";
import SignUp from "./SignUp";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import SignUpForm from "./SignUpForm";
import MainPage from "../MainPage/MainPage";
import RouteWrapper from "./RouteWrapper";
import UserProfile from "./UserProfile";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/dashboard"
            element={
              <RouteWrapper>
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              </RouteWrapper>
            }
          />
          <Route
            path="/update-profile"
            element={
              <RouteWrapper>
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              </RouteWrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <RouteWrapper>
                <SignUp />
              </RouteWrapper>
            }
          />
          <Route
            path="/signup/client"
            element={
              <RouteWrapper>
                <SignUpForm userType="client" />
              </RouteWrapper>
            }
          />
          <Route
            path="/signup/freelancer"
            element={
              <RouteWrapper>
                <SignUpForm userType="freelancer" />
              </RouteWrapper>
            }
          />

          <Route
            path="/signupform"
            element={
              <RouteWrapper>
                <SignUpForm />
              </RouteWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <RouteWrapper>
                <Login />
              </RouteWrapper>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RouteWrapper>
                <ForgotPassword />
              </RouteWrapper>
            }
          />
          <Route
            path="/user-profile"
            element={
              <RouteWrapper>
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              </RouteWrapper>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
