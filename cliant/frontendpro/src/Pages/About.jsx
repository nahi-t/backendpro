import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About This Application</h1>
      <p className="about-text">
        This is a Question & Answer application designed to help users ask questions and receive answers from the community.
      </p>
      <p className="about-text">
        Whether you need technical help, advice, or want to share knowledge, this platform is built to foster meaningful conversations and solutions.
      </p>
      <p className="about-text">
        Developed by <strong>Nahom</strong>, with a passion for building useful and interactive web applications.
      </p>
      <p className="about-text">
        Thank you for using this app. Your questions and answers make this community valuable!
      </p>
    </div>
  );
}

export default About;
