import React from 'react';
import { Link } from 'react-router-dom';
import './AddMemberField.css';

const AddMemberField = ({value, onChange, onCreate, onKeyPress}) => {
  return (
    <div id="form">
      <input value={value} onChange={onChange} onKeyPress={onKeyPress}/>
      <div onClick={onCreate}>
        <Link to = '/member'>
            <button id = "submit" type = "submit"> 추가 </button>
        </Link>
      </div>
    </div>
  );
};

export default AddMemberField;