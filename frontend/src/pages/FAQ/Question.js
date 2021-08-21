import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import './FAQ.css'

const Question = ({ title, info }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className='question'>
        <div className = "faq_Q">
            <p onClick={() => setExpanded(!expanded)} className='question_title'>
            Q. {title}
            </p>
            <button className='btn' onClick={() => setExpanded(!expanded)}>
            {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </button>
        </div>
      <hr className = "faq_hr"/>
      {expanded && <p className = "faq_A" >A. {info}</p>}
    </article>
  )
}

export default Question;