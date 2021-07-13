import React, { useState } from 'react';
import "./MemberInfo.css"

function logo () {
    <h3> 구성원 정보 입력 </h3>
}
function MemberInfo() {

  const [inputs, setInputs] = useState({
    name: '',
    birth: '',
    relationship: '',
    residence: '',
    marriage: '',
    nationality: '',
    value: ''
  }); 

  const { name, birth, relationship, residence, marriage, nationality } = inputs; 

  const onChange = (e) => { 
    const { name, birth, relationship, residence, marriage, nationality, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
      [birth]: value,
      [relationship]: value,
      [residence]: value,
      [marriage]: value,
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
        
        신청자와의 관계
        <hr />
        <select
            name = "relationship" 
            onChange = { onChange } 
            value = { relationship }>
            <option value = "none"> ---선택--- </option>
            <option value = "Child">자녀</option>
            <option value = "Parent">부모</option>
            <option value = "PartnerChild">배우자의 자녀</option>
        </select> <br />

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
        /> 미혼
        <input 
            type = "radio"
            name = "marriage" 
            onChange = { onChange } 
            value = "married"
            checked = { marriage ===  "married" ? true: false}
        /> 기혼 <br />

        내/외국인
        <hr />
        <input 
            type = "radio"
            name = "nationality" 
            onChange = { onChange } 
            value = "local"
            checked = { nationality ===  "local" ? true: false}
        /> 내국인
        <input 
            type = "radio"
            name = "nationality" 
            onChange = { onChange } 
            value = "foreigner"
            checked = { nationality ===  "foreigner" ? true: false}
        /> 외국인 <br />
        
        <button id = "submit" type = "submit"> 제출 </button>

        <div>
            <b> 구성원 정보 </b> <br />
            이름: { name } <br />
            생년월일: { birth } <br />
            신청자와의 관계: { relationship } <br />
            거주지역: { residence } <br />
            혼인 여부: { marriage } <br />
            내/외국인: { nationality }
        </div>
    </form>
  )
  }
export default MemberInfo;