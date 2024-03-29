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
import { Link } from "react-router-dom";
import Footer from "./Footer";
import logo from "../img/Logo.jpg";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import CreateGigForm from "../components/CreateGigForm";
import LoginStatus from "../components/LoginStatus";
import Dashboard from "../components/Dashboard";
import UserProfile from "../components/UserProfile";
import SearchBar from "../components/SearchBar";
import SearchGigs from "../components/SearchGigs";
import ContactForm from "../components/ContactForm";

function ProfileButton() {
  return (
    <Link to="/user-profile">
      <Button
        variant="primary"
        style={{ width: "120px" }}
        className="d-flex justify-content-center mt-2"
      >
        My Profile
      </Button>
    </Link>
  );
}

function MainPage() {
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("freelancers")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists && doc.data().userType === "freelancer") {
              setUserType("freelancer");
            } else {
              setUserType("client");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
            setUserType(null);
          });
      } else {
        setUserType(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, [auth.onAuthStateChanged]);

  const handleSearch = async (e) => {
    console.log(searchQuery);
    return new Promise(async (resolve, reject) => {
      try {
        const results = await db
          .collectionGroup("gigs")
          .where("title", ">=", searchQuery)
          .where("title", "<=", searchQuery + "\uf8ff")
          .get();
        setSearchResults(
          results.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        resolve();
      } catch (error) {
        console.log("Error searching gigs:", error);
        setSearchResults([]);
        reject(error);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch()
      .then(() => {})
      .catch((error) => {});
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">
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
            <SearchBar handleSearch={handleSubmit} />

            {/* <SearchGigs gigs={searchResults} /> */}
            <Nav className="d-flex justify-content-end">
              {userType === null ? (
                <>
                  <Nav.Item>
                    <Nav.Link href="login">Log In</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="client-or-freelancer">Sign Up</Nav.Link>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <ProfileButton />
                  <LoginStatus />
                </>
              )}
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
              Freelance Webpage. This is the platform that connects talented
              freelancers with people like you who need their expertise.
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
              Freelance Webpage. The platform offers a wide variety of services,
              from web design to content creation and everything in between.
            </p>
          </Col>
          <Col md={4}>
            <h3 className="text-center">Explore Gigs</h3>
            <p className="text-center">
              Looking for talented freelancers to work on your project? Browse
              through our collection of gigs to find projects that you like and
              get inspiration for your own.
            </p>
          </Col>
          <Col md={4}>
            <h3 className="text-center">About</h3>
            <p className="text-center">
              Learn more about Freelance Webpage. The mission of the website is
              to make it easy for freelancers and clients to find each other and
              work together in a seamless and enjoyable way.
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
            <ContactForm />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default MainPage;
