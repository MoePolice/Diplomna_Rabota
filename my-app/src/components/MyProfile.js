import { useState, useEffect } from "react";
import { firebase, db } from "../firebase";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!currentUser) {
          throw new Error("User not authenticated");
        }

        const userRef = db.collection("users").doc(currentUser.uid);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          setUser(userDoc.data());
          setDisplayName(userDoc.data().displayName);
          setBio(userDoc.data().bio);
        } else {
          console.log("User does not exist in the database.");
        }

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
      await db.collection("users").doc(currentUser.uid).set(
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
    <div>
      <h2>My Profile</h2>
      <label htmlFor="displayName">Display Name:</label>
      <input
        type="text"
        id="displayName"
        value={displayName}
        onChange={handleDisplayNameChange}
      />
      <label htmlFor="bio">Bio:</label>
      <textarea id="bio" value={bio} onChange={handleBioChange} />
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default MyProfile;
