import React, { useState } from 'react';
import "./Addmember.css" 

const Post = ({ onSaveData }) => {
    const [form, setForm] = useState({
        name: '',
        birth: '',
        nationality: '',
        relationship: '',
        owner: '',
        marriage: '',
        income: '',
        asset: '',
        history: ''
    });

    const onChange = (e) => {
        const {name, birth, nationality, relationship, owner, marriage, income, asset, history, value} = e.target;
        setForm({
            ...form,
            [name]: value,
            [birth]: value,
            [nationality]: value,
            [relationship]: value,
            [owner]: value,
            [marriage]: value,
            [income]: value,
            [asset]: value,
            [history]: value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveData(form)
        console.log(form);
        setForm({
            name: '',
            birth: '',
            nationality: '',
            relationship: '',
            owner: '',
            marriage: '',
            income: '',
            asset: '',
            history: ''
        })
    }

    return (
        <>
        <div id = "addMember"> <h3> 구성원 추가하기 </h3> </div>
        <form onSubmit = {handleSubmit}>
            <div>
                이름
                <hr />
                <input
                    type = "text"
                    name = "name"
                    value = {form.name}
                    onChange = {onChange}
                /> <br />

                생년월일
                <hr />
                <input
                    type = "date"
                    name = "birth"
                    value = {form.birth}
                    onChange = {onChange}
                /> <br />

                내/외국인
                <hr />
                <input
                    type = "radio"
                    name = "nationality"
                    onChange = {onChange}
                    value = "local"
                    checked = { form.nationality ===  "local" ? true: false}
                /> 내국인 <br />

                <input
                    type = "radio"
                    name = "nationality"
                    onChange = {onChange}
                    value = "foreigner"
                    checked = { form.nationality ===  "foreigner" ? true: false}
                /> 외국인 <br />

                신청자와의 관계
                <hr />
                <select
                    name = "relationship" 
                    value = {form.relationship}
                    onChange = {onChange} >
                    <option value = "none"> ---선택--- </option>
                    <option value = "Partner">배우자의 부모</option>
                    <option value = "Parent">부모</option>
                    <option value = "Child">자녀</option>
                    <option value = "PartnerParent">배우자의 부모</option>
                    <option value = "ChildPartner">자녀의 배우자</option>
                    <option value = "Grandparent">조부모</option>
                    <option value = "Grandchildren">손자녀</option>
                    <option value = "PartnerGrandparent">배우자의 조부모</option>
                    <option value = "GrandchildrenPartner">손자녀의 배우자</option>
                </select> <br />

                세대주 여부
                <hr />
                <input 
                    type = "radio"
                    name = "owner" 
                    onChange = {onChange} 
                    value = "owner"
                    checked = { form.owner ===  "owner" ? true: false}
                /> 세대주 이다 <br />
                <input 
                    type = "radio"
                    name = "owner" 
                    onChange = {onChange} 
                    value = "noneOwner"
                    checked = { form.owner ===  "noneOwner" ? true: false}
                /> 세대주가 아니다 <br />

                혼인 여부
                <hr />
                <input 
                    type = "radio"
                    name = "marriage" 
                    onChange = {onChange} 
                    value = "noneMarried"
                    checked = { form.marriage ===  "noneMarried" ? true: false}
                /> 미혼
                <input 
                    type = "radio"
                    name = "marriage" 
                    onChange = {onChange} 
                    value = "married"
                    checked = { form.marriage ===  "married" ? true: false}
                /> 기혼 <br />

                월 평균 소득
                <hr />
                <input 
                    type = "number"
                    name = "income" 
                    onChange = {onChange} 
                    value = { form.income }
                /> 원 <br />

                자산
                <hr />
                <input 
                    type = "number"
                    name = "asset" 
                    onChange = {onChange} 
                    value = { form.asset }
                /> ㎡ <br />

                청약 당첨 이력
                <hr />
                <input 
                    type = "radio"
                    name = "history" 
                    onChange = {onChange} 
                    value = "exist"
                    checked = { form.history ===  "exist" ? true: false}
                /> 당첨 이력 존재
                <input 
                    type = "radio"
                    name = "history" 
                    onChange = {onChange} 
                    value = "none"
                    checked = { form.history ===  "none" ? true: false}
                /> 당첨 이력 전무 <br />
            </div>

            <div>
                <button type = "submit"> 저장 </button>
            </div>
        </form>
    </>
    );
};

export default Post;