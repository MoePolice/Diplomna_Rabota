import React, { useState, useEffect } from "react";
import { firebase, db } from "../firebase";
import { Container, Form, Button } from "react-bootstrap";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [gigs, setGigs] = useState([]);

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
        } else {
          console.log("User does not exist in the database.");
        }

        const gigsRef = userRef.collection("gigs");
        const gigsQuery = gigsRef.where("freelancerId", "==", currentUser.uid);
        const gigsSnapshot = await gigsQuery.get();

        const gigsData = gigsSnapshot.docs.map((doc) => doc.data());
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
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
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

        <Button variant="primary" onClick={handleUpdateProfile}>
          Update Profile
        </Button>

        <hr />

        <h3>My Gigs</h3>
        <ListGroup>
          {gigs &&
            gigs.map((gig) => (
              <li key={gig.id}>
                <p>{gig.title}</p>
                <p>{gig.description}</p>
                <p>{gig.price}</p>
              </li>
            ))}
        </ListGroup>
      </Form>
    </Container>
  );
};
