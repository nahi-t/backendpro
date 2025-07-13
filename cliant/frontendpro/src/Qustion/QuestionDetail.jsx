import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Addanswer from '../answer/Addanswer.jsx';
import Seeanswer from '../answer/Seeanswer.jsx';
import './QuestionDetail.css'; // ✅ import the CSS

function QuestionDetail() {
  const { id } = useParams();
  const [reloadAnswers, setReloadAnswers] = useState(false);

  const handleAnswerSubmitted = () => {
    setTimeout(() => {
      setReloadAnswers(prev => !prev);
    }, 300);
  };

  return (
    <div className="question-detail-container">
      <h2 className="question-title">Question #{id}</h2>
      <Link to={"/"}>Go to Home page</Link>
      <div className="answer-section">
        <Addanswer questionId={id} onSubmitSuccess={handleAnswerSubmitted} />
        <Seeanswer questionId={id} reload={reloadAnswers} />
      </div>
    
    </div>
  );
}

export default QuestionDetail;
