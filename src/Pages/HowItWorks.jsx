import React from "react";
import "./HowItWorks.css";

function HowItWorks() {
  return (
    <div className="howitworks-container">
      <h1 className="howitworks-title">How It Works</h1>

      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <h2 className="step-title">Ask a Question</h2>
          <p className="step-description">
            Start by posting a clear and detailed question about the topic you need help with.
          </p>
        </div>

        <div className="step">
          <div className="step-number">2</div>
          <h2 className="step-title">Get Answers</h2>
          <p className="step-description">
            Community members will provide answers, explanations, or suggestions to help you out.
          </p>
        </div>

        <div className="step">
          <div className="step-number">3</div>
          <h2 className="step-title">Interact & Learn</h2>
          <p className="step-description">
            Engage with the answers, ask follow-up questions, and contribute your own knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
