import React from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import "./Home.css";
import { Link } from "react-router-dom";
  
function Home () {
  return (
    <div className="page">
      <h1>Home Page</h1>
      <br />
      <ul>
        <li className="items">
          {/* Endpoint to route to Home component */}
          <Link to="/"><h3> Home </h3></Link>
        </li>
        <li className="items">
          {/* Endpoint to route to About component */}
          <Link to="/login"><h4> Login </h4></Link>
        </li>
        <li className="items">
          {/* Endpoint to route to Contact Us component */}
          <Link to="/signup"><h4> Signup </h4></Link>
        </li>
      </ul>
    </div>

    // <div>
    //   <h1>Home Page</h1>
    // </div>
  );
};
  
export default Home;