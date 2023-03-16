import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firebase, db } from "../firebase";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import CreateGigForm from "./CreateGigForm";
import SearchBar from "./SearchBar";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [gigs, setGigs] = useState([]);
  const [showGigs, setShowGigs] = useState(false);
  const [isFreelancer, setIsFreelancer] = useState(false);

  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!currentUser) {
          throw new Error("User not authenticated");
        }

        const userRef = db.collection("freelancers").doc(currentUser.uid);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          setUser(userDoc.data());
          setDisplayName(userDoc.data().displayName);
          setBio(userDoc.data().bio);
          setIsFreelancer(userDoc.data().userType === "freelancer");
        } else {
        }

        const gigsRef = db
          .collection("freelancers")
          .doc(currentUser.uid)
          .collection("gigs");

        const gigsQuery = gigsRef.where(
          "freelancerId",
          "==",
          currentUser.uid.toString()
        );

        const gigsSnapshot = await gigsQuery.get();

        const gigsData = gigsSnapshot.docs.map((doc) => {
          const data = doc.data();
          const freelancerId = data.freelancerId || null;
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            createdAt: data.createdAt,
            deadline: data.deadline,
            freelancerId: freelancerId,
            price: data.price,
          };
        });

        setGigs(gigsData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleUpdateProfile = async () => {
    try {
      await db.collection("freelancers").doc(currentUser.uid).set(
        {
          displayName,
          bio,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      console.log("Profile updated successfully.");
      setDisplayName("");
      setBio("");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const handleToggleGigs = () => {
    setShowGigs(!showGigs);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-3">
      <h2>My Profile</h2>
      <Form>
        <Form.Group controlId="formDisplayName">
          <Form.Label>Display Name:</Form.Label>
          <Form.Control
            type="text"
            value={displayName}
            onChange={handleDisplayNameChange}
          />
        </Form.Group>
        <Form.Group controlId="formBio">
          <Form.Label>Bio:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={bio}
            onChange={handleBioChange}
          />
        </Form.Group>
        <Button className="w-100 auto mt-3" onClick={handleUpdateProfile}>
          Update Profile
        </Button>
        <hr />
        <Link to="/dashboard">
          <Button variant="primary" className="w-100 auto my-3">
            Change email or password
          </Button>
        </Link>
        <hr />
        {isFreelancer && (
          <>
            <h3>My Gigs</h3>
            <Button className="w-100 auto mt-3" onClick={handleToggleGigs}>
              {showGigs ? "Hide My Gigs" : "Show My Gigs"}
            </Button>
            {showGigs && (
              <ListGroup>
                {gigs &&
                  gigs.map((gig) => {
                    return (
                      <ListGroup.Item key={gig.id}>
                        <h5>{gig.name}</h5>
                        <p>Price: ${gig.price}</p>
                        <p>Description: {gig.description}</p>
                        <p>Deadline: {gig.deadline}</p>
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
            )}
          </>
        )}
      </Form>
      {isFreelancer && <CreateGigForm />}
    </Container>
  );
};

export default UserProfile;
