import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import faqData from '../../data/faq.json';
import '../../stylesheets/faq.css';

function FAQ() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleQuestion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderAnswer = (answer) => {
    return answer.split('\n').map((line, index) => {
      return <p key={index}>{line}</p>;
    });
  };

  return (
    <>
      <div className="faq-page-background" />
      <div className="faq-container">
        <div className="faq-header">
          <FontAwesomeIcon icon={faQuestionCircle} className="faq-icon" />
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">Find answers to common questions about our programs and services</p>
        </div>
        <div className="faq-list">
          {faqData.faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`faq-item ${expandedId === faq.id ? 'expanded' : ''}`}
              onClick={() => toggleQuestion(faq.id)}
            >
              <div className="faq-question">
                <h2>{faq.question}</h2>
                <FontAwesomeIcon 
                  icon={expandedId === faq.id ? faChevronUp : faChevronDown} 
                  className="faq-arrow"
                />
              </div>
              {expandedId === faq.id && (
                <div className="faq-answer">
                  {renderAnswer(faq.answer)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FAQ;
