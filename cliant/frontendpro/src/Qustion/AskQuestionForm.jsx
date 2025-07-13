import React, { useState } from "react";
import axios from "../axiosconfig";
import "./AskQuestionForm.css";
import { Link } from "react-router-dom";
import HowItWorks from "../Pages/HowItWorks"

function AskQuestionForm() {
  const token = localStorage.getItem('authToken'); // ✅ fix key name

  const [data, setdata] = useState({
    title: "",
    description: "",
    tags: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "qustion/qustion",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}` // ✅ fixed here too
          }
        }
      );

      alert(response.data.msg || "Question sent successfully!");

      // Clear form
      setdata({
        title: "",
        description: "",
        tags: ""
      });

    } catch (error) {
      if (error.response) {
        console.error("Backend responded with:", error.response.data);
        alert("Error: " + (error.response.data.msg || "Bad request"));
      } else {
        console.error("Network or unknown error:", error.message);
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <>
    <HowItWorks />
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Title:</label>
        <input
          className="form-input"
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description:</label>
        <textarea
          className="form-textarea"
          name="description"
          value={data.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Tags (comma separated):</label>
        <input
          className="form-input"
          type="text"
          name="tags"
          value={data.tags}
          onChange={handleChange}
          required
        />
      </div>

      <button className="submit-button" type="submit">Submit Question</button>
      <Link to={"/"}>Go to Home Page</Link>
    </form>
    </> );
}

export default AskQuestionForm;
