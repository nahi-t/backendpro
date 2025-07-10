import React, { useState, useEffect } from 'react';
import axios from '../axiosconfig';

function AskQ() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("/qustion/q") // make sure path matches backend
      .then((response) => setQuestions(response.data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  return (
    <div>
      <h2>Questions</h2>
      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <h3>{q.title}</h3>
          <p>{q.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default AskQ;
