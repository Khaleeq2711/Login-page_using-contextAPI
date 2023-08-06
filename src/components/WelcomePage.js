import React, { useState } from "react";

import "./WelcomePage.css";

const WelcomePage = (props) => {
    const [counter,setCounter]=useState(10);
    
    setTimeout(() => {
        setCounter(counter-1);
      }, 1000);
  return (
    <div className="welcome-page">
      <h1>Welcome, Log-in Successful.!</h1>
      <h2>Redirecting in {counter} seconds</h2>
      <button onClick={props.onLogout}>Log Out</button>
    </div>
  );
};

export default WelcomePage;
