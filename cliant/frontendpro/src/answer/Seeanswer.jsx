import React, { useState, useEffect } from 'react';
import axios from '../axiosconfig';
import './Seeanswer.css'; // ✅ import the CSS file


function Seeanswer({ questionId,reload  }) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!questionId) {
      setAnswers([]);
      return;
    }

    const fetchAnswers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/answer/getanswer/${questionId}`);
        setAnswers(response.data);
      } catch (err) {
        setError('Failed to fetch answers. Please try again later.');
        console.error("Error fetching answers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [questionId,reload]);

  return (
    <>
   
    <div className="see-answer-container">
    <h4 className="see-answer-title">Answers:</h4>
    {answers.description}

    {loading && <p className="see-answer-loading">Loading answers...</p>}
    {error && <p className="see-answer-error">{error}</p>}

    {!loading && !error && (
      answers.length === 0 ? (
        <p className="see-answer-empty">No answers yet.</p>
      ) : (
        <div className="see-answer-list">
          {answers.map((a) => (
            <div key={a.id || a._id} className="see-answer-item">
                
           {a.title && <span className="see-answer-title-label"> *** {a.description}**</span>}
              <p className="see-answer-content">{a.answer}</p>
              <div className="see-answer-meta">
                <strong>{a.username || 'Anonymous'}</strong>
             
                {a.title && <span className="see-answer-title-label"> —    {a.description}</span>}
              </div>
             
            </div>
            
          ))}
        </div>
      )
    )}
  </div>
    </>
    
  );
}

export default Seeanswer;
