import React, { useState, useContext } from "react";
import axios from "../axiosconfig";
import { appprovide } from "../App";
import "./Addanswer.css"; // ✅ import CSS file

function Addanswer({ questionId, onSubmitSuccess }) {
  const { user } = useContext(appprovide);
  const [a, seta] = useState({ answer: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    seta((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/answer/answer", {
        answer: a.answer,
        id: questionId,
        userid: user.userid,
      });

      alert("Answer submitted successfully!");
      seta({ answer: "" });
      onSubmitSuccess(); // ✅ trigger parent to refresh
    } catch (err) {
      console.error("Failed to submit answer:", err);
      alert("Failed to submit answer.");
    }
  };

  return (
    <div className="add-answer-container">
      <form className="add-answer-form" onSubmit={handleSubmit}>
        <label htmlFor="answer" className="add-answer-label">Answer</label>
        <input
          type="text"
          name="answer"
          id="answer"
          className="add-answer-input"
          value={a.answer}
          onChange={handleChange}
          required
        />
        <button type="submit" className="add-answer-button">Submit</button>
      </form>
    </div>
  );
}

export default Addanswer;
