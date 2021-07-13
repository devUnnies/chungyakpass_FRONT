import React, { useState } from 'react';
import "./PersonalInfo.css"

function logo() {
    <h3> 신청자 입력 정보 </h3>
}

function PersonalInfo() {

  const [inputs, setInputs] = useState(' '); 

  const { name, birth, owner, seperation, residence, marriage, marryDate, nationality } = inputs; 
  const onChange = (e) => { 
    const { name, birth, owner, seperation, residence, marriage, marryDate, nationality, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
      [birth]: value,
      [owner]: value,
      [seperation]: value, 
      [residence]: value,
      [marriage]: value,
      [marryDate]: value,
      [nationality]: value
    });
  };

  return (
    <form>
        이름
        <hr />
        <input
            type = "text"
            name = "name" 
            onChange = { onChange } 
            value = { name }
        /> <br />

        생년월일
        <hr />
        <input 
            type = "date"
            name = "birth" 
            onChange = { onChange } 
            value = { birth }
        /> <br />

        세대주 여부
        <hr />
        <input 
            type = "radio"
            name = "owner" 
            onChange = { onChange } 
            value = "owner"
            checked = { owner ===  "owner" ? true: false}
        /> 세대주 이다 <br />
        <input 
            type = "radio"
            name = "owner" 
            onChange = { onChange } 
            value = "noneOwner"
            checked = { owner ===  "noneOwner" ? true: false}
        /> 세대주가 아니다 <br />

        분리세대 여부
        <hr />
        <input 
            type = "radio"
            name = "seperation" 
            onChange = { onChange } 
            value = "seperation"
            checked = { seperation ===  "seperation" ? true: false}
        /> 분리세대 이다 <br />
        <input 
            type = "radio"
            name = "seperation" 
            onChange = { onChange } 
            value = "noneSeperation"
            checked = { seperation ===  "noneSeperation" ? true: false}
        /> 분리세대가 아니다 <br />

        거주지역
        <hr />
        <select
            name = "residence" 
            onChange = { onChange } 
            value = { residence }>
            <option value = "none"> ---선택--- </option>
            <option value = "Gyeongi"> 경기 </option>
            <option value = "Incheon"> 인천 </option>
            <option value = "Busan"> 부산 </option>
        </select> <br />

        혼인 여부
        <hr />
        <input 
            type = "radio"
            name = "marriage" 
            onChange = { onChange } 
            value = "noneMarried"
            checked = { marriage ===  "noneMarried" ? true: false}
        /> 미혼 <br />
        <input 
            type = "radio"
            name = "marriage" 
            onChange = { onChange } 
            value = "married"
            checked = { marriage ===  "married" ? true: false}
        /> 기혼 <br />

        혼인(예정) 일
        <hr />
        <input 
            type = "date"
            name = "marryDate" 
            onChange = { onChange } 
            value = { marryDate }
        /> <br />

        내/외국인
        <hr />
        <input 
            type = "radio"
            name = "nationality" 
            onChange = { onChange } 
            value = "local"
            checked = { nationality ===  "local" ? true: false}
        /> 내국인 <br />
        <input 
            type = "radio"
            name = "nationality" 
            onChange = { onChange } 
            value = "foreigner"
            checked = { nationality ===  "foreigner" ? true: false}
        /> 외국인 <br />
        
        <button id = "submit" type = "submit"> 제출 </button>

        <div>
            <b> 회원 정보 </b> <br />
            이름: { name } <br />
            생년월일: { birth } <br />
            세대주 여부: { owner } <br />
            분리세대 여부: { seperation } <br />
            거주지역: { residence } <br />
            혼인 여부: { marriage } <br />
            혼인(예정) 일: { marryDate } <br />
            내/외국인: { nationality }
        </div>
    </form>
  )
  } 
export default PersonalInfo;