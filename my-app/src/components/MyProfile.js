import { useState, useEffect } from "react";
import { firebase, db } from "../firebase";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
};
