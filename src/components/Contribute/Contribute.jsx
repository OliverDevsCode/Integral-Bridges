import React, { useState, useEffect } from "react";
import { auth, provider } from "../../utils/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

import { useNavigate } from 'react-router-dom';


import Button from '../Button/Button';

import { writeSeed } from "../../utils/databaseAccess";

import './Contribute.css'

const Contribute = () => {
  const [user, setUser] = useState(null);
  const [seed, setSeed] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, provider).catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in first.");
      return;
    }
    ///send data to firebase
    console.log(`User:`,user)
    console.log({ seed, title, submittedBy: user.displayName , userId: user.providerData[0].uid });
    const submissionData = { seed, title, submittedBy: name , userId: user.providerData[0].uid }
    const result = writeSeed(submissionData)
    if(result === null){
      console.log("Failed")
      alert("Please Try Again")
    }
  };

  if (!user) {
    return (
  <div className="signin-container">
    <h2>Please sign in with GitHub to contribute</h2>
    <button className="github-signin-button" onClick={handleSignIn}>
      Sign In with GitHub
    </button>
  </div>
);
  }

  return (
    <div className="contribute-container">
      <Button
      className="back-button-wrapper"
      text="Go Back"
      textcolor="white"
      buttoncolor="red"
      onClick={() => navigate(-1)}
      />
      <h2>Contribute a Seed</h2>
      <form onSubmit={handleSubmit} className="contribute-form">
        <input
          placeholder="Seed"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          required
        />
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Submit Seed</button>
      </form>
    </div>
  );
};

export default Contribute;
