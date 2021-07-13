import React, { useState } from 'react';
import "./MemberHousingInfo.css"

function logo () {
    <h3> 구성원 무주택 정보 </h3>
}
function MemberHousingInfo() {

    const [inputs, setInputs] = useState({
      housing: '',
      area: '',
      owned: '',
      value: ''
    }); 
  
    const { housing, area, owned } = inputs; 
  
    const onChange = (e) => { 
      const { housing, area, owned, value }  = e.target;
      setInputs({
        ...inputs,
        [housing]: value,
        [area]: value,
        [owned]: value
      });
    };
  
    return (
      <form>
          주택 소유 여부
          <hr />
          <input 
              type = "radio"
              name = "housing" 
              onChange = { onChange } 
              value = "housing"
              checked = { owner ===  "housing" ? true: false}
          /> 소유하고 있다
          <input 
              type = "radio"
              name = "owner" 
              onChange = { onChange } 
              value = "noneHousing"
              checked = { owner ===  "noneHousing" ? true: false}
          /> 소유하고 있지 않다 <br />
          
          소유 주택 면적
          <hr />
          <input 
              type = "number"
              name = "area" 
              onChange = { onChange } 
              value = { area }
          /> ㎡ <br />
          
          소유 이력 여부
          <hr />
          <input 
              type = "radio"
              name = "owned" 
              onChange = { onChange } 
              value = "owned"
              checked = { owner ===  "owned" ? true: false}
          /> 소유한 적이 있다
          <input 
              type = "radio"
              name = "owner" 
              onChange = { onChange } 
              value = "noneOwned"
              checked = { owner ===  "noneOwned" ? true: false}
          /> 소유한 적이 없다 <br />
          
          무주택 시작 일
          <hr />
          <input 
              type = "date"
              name = "mujutaeg" 
              onChange = { onChange } 
              value = { mujutaeg }
          /> <br />
          
          <button id = "submit" type = "submit"> 제출 </button>
  
          <div>
              <b> 구성원 무주택 정보 </b> <br />
              주택 소유 여부: { housing } <br />
              소유 주택 면적: { area } <br />
              소유 이력 여부: { owned } <br />
              무주택 시작 일: { mujutaeg }
          </div>
      </form>
    )
    }
  export default MemberHousingInfo;
