import React,{useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "../axiosconfig";

function Navbar() {
 
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
        Question & Answer application
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/" className="navbar-item">Home</Link></li>
          <li><Link to="/ask" className="navbar-item">How to work</Link></li>
          <li><Link to="/about" className="navbar-item">About</Link></li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
