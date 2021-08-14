import React, { useState } from 'react';
import Data from './Data';
import SingleQuestion from './Question';
import './FAQ.css'


const FAQ = () => {
  const [questions, setQuestions] = useState(Data)

  return (
      <div className = "faq_main">
        <div className = "title"><h3 className = "faq_title"> FAQ <span className = "fag_subTitle"> | 자주 묻는 질문 </span> </h3></div>
        <div className='faq_container'>
            <div className='info'>
            {questions.map((question) => (
                <SingleQuestion key={question.id} {...question} />
            ))}
            </div>
        </div>
      </div>
  )
}

export default FAQ;