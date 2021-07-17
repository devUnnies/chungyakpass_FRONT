import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./MemberHousingInfo.css"

function logo () {
    <h3> 구성원 무주택 정보 </h3>
}
function MemberHousingInfo() {

    const [inputs, setInputs] = useState(' '); 
  
    const { name, housing, area, owned, mujutaeg } = inputs; 
  
    const onChange = (e) => { 
      const { name,housing, area, owned, mujutaeg, value }  = e.target;
      setInputs({
        ...inputs,
        [name]: value,
        [housing]: value,
        [area]: value,
        [owned]: value,
        [mujutaeg]: value
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
              checked = { housing ===  "housing" ? true: false}
          /> 소유하고 있다
          <input 
              type = "radio"
              name = "housing" 
              onChange = { onChange } 
              value = "noneHousing"
              checked = { housing ===  "noneHousing" ? true: false}
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
              checked = { owned ===  "owned" ? true: false}
          /> 소유한 적이 있다
          <input 
              type = "radio"
              name = "owned" 
              onChange = { onChange } 
              value = "noneOwned"
              checked = { owned ===  "noneOwned" ? true: false}
          /> 소유한 적이 없다 <br />
          
          무주택 시작 일
          <hr />
          <input 
              type = "date"
              name = "mujutaeg" 
              onChange = { onChange } 
              value = { mujutaeg }
          /> <br />

          <Link to = '/member'>
            <button id = "submit" type = "submit"> 이전 </button>
          </Link>
          <Link to = '/addMember'>
            <button id = "submit" type = "submit"> 제출 </button>
          </Link>

  
          <div>
              <b> 구성원 무주택 정보 </b> <br />
              주택 소유 여부: { housing } <br />
              소유 주택 면적: { area } ㎡ <br />
              소유 이력 여부: { owned } <br />
              무주택 시작 일: { mujutaeg }
          </div>
      </form>
    )
    }
  export default MemberHousingInfo;
