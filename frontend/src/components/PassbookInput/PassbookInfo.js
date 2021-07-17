import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./PassbookInfo.css"

function logo() {
    <h3> 신청자 입력 정보 </h3>
}
function PassbookInfo() {

  const [inputs, setInputs] = useState(' '); 

  const { name, passbook, joinDate, number, price, usage } = inputs; 

  const onChange = (e) => { 
    const { name, passbook, joinDate, number, price, usage, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
      [passbook]: value, 
      [joinDate]: value,
      [number]: value,
      [price]: value,
      [usage]: value
    });
  };

  return (
    <form>
        청약 통장 종류
        <hr />
        <select
            name = "passbook" 
            onChange = { onChange } 
            value = { passbook }>
            <option value = "none"> ---선택--- </option>
            <option value = "Jonghab">주택청약종합저축</option>
            <option value = "Jeochug">청약저축</option>
            <option value = "Yegeum">청약예금</option>
            <option value = "Bugeum">청약부금</option>
        </select> <br />

        청약 통장 가입일
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

        <Link to = '/common'>
            <button id = "submit" type = "submit"> 이전 </button>
        </Link>
        <Link to = '/housing'>
            <button id = "submit" type = "submit"> 다음 </button>
        </Link>

        <div>
            <b> 회원 정보 </b> <br />
            청약 통장 종류: { passbook } <br />
            청약 통장 가입일: { joinDate } <br />
            납입 횟수: { number } <br />
            납입 금액: { price } <br />
            청약 통장 사용 이력: { usage }
        </div>
    </form>

    
  )
  } 
export default PassbookInfo;