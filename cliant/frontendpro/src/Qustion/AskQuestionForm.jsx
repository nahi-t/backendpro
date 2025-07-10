import React, { useState } from "react";
import axios from "../axiosconfig";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Tags (comma separated):</label>
        <input
          type="text"
          name="tags"
          value={data.tags}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Submit Question</button>
    </form>
  );
}

export default AskQuestionForm;
