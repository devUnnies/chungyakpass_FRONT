import React, { useState } from 'react';
import "./PassbookInfo.css"

function logo () {
    <h3> 청약통장 정보 입력 </h3>
}
function PassbookInfo() {

  const [inputs, setInputs] = useState({
    passBook: '',
    joinDate: '',
    number: '',
    price: '',
    usage: '',
    value: ''
  }); 

  const { passBook, joinDate, number, price, usage } = inputs; 

  const onChange = (e) => { 
    const { passBook, joinDate, number, price, usage, value }  = e.target;
    setInputs({
      ...inputs,
      [passBook]: value,
      [joinDate]: value,
      [number]: value,
      [price]: value,
      [usage]: value
    });
  };

  return (
    <form>
        통장 종류
        <hr />
        <select
            name = "passBook" 
            onChange = { onChange } 
            value = { passBook }>
            <option value = "none"> ---선택--- </option>
            <option value = "Jonghab">주택청약종합저축</option>
            <option value = "Jeochug">청약저축</option>
            <option value = "Yegeum">청약예금</option>
            <option value = "Bugeum">청약부금</option>
        </select> <br />

        가입 일자
        <hr />
        <input 
            type = "date"
            name = "joinDate" 
            onChange = { onChange } 
            value = { joinDate }
        /> <br />
        
        납입 횟수
        <hr />
        <input 
            type = "number"
            name = "number" 
            onChange = { onChange } 
            value = { number }
        /> 회 <br />
        
        납입 금액
        <hr />
        <input 
            type = "number"
            name = "price" 
            onChange = { onChange } 
            value = { price }
        /> 원 <br />

        청약통장 사용 이력 여부
        <hr />
        <input 
            type = "radio"
            name = "usage" 
            onChange = { onChange } 
            value = "used"
            checked = { usage ===  "used" ? true: false}
        /> 사용 이력 존재
        <input 
            type = "radio"
            name = "usage" 
            onChange = { onChange } 
            value = "noneUsed"
            checked = { usage ===  "noneUsed" ? true: false}
        /> 사용 이력 없음 <br />
        
        <button id = "submit" type = "submit"> 제출 </button>

        <div>
            <b> 청약통장 정보 </b> <br />
            통장 종류: { passBook } <br />
            가입 일자: { joinDate } <br />
            납입 횟수: { number } <br />
            납입 금액: { price } <br />
            청약통장 사용 이력 여부: { usage }
        </div>
    </form>
  )
}
export default PassbookInfo;
