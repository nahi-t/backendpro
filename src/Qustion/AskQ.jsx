import React, { useState, useEffect } from 'react';
import axios from '../axiosconfig';
import asq from './asq.module.css'

import { IoMdContact } from "react-icons/io";


import { Link } from 'react-router-dom';

function AskQ() {
  
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("/qustion/q")
      .then((response) => setQuestions(response.data))
      .catch((err) => console.error("Error fetching questions:", err));
      
  }, []);

  return (
    <div className={asq.contenar}>
  
      {questions.map((q) => (
  <div key={q.id} className={asq.card}>
    <div className={asq.flexRow}>
      <div className={asq.leftColumn}>
        <IoMdContact className={asq.icon} />
        <h3 className={asq.username}>{q.username}</h3>
      </div>

      <div className={asq.rightColumn}>
        <Link to={`/question/${q.id}`} className={asq.title}>
          <h2>{q.title}</h2>
        </Link>
      </div>
    </div>
    <hr className={asq.divider} />
  </div>
))}


    </div>
  );
}

export default AskQ;  