import React, {useState} from "react";

const Modal = ({ selectedData, handleCancel, handleEditSubmit }) => {
    const [edited, setEdited] = useState(selectedData);

    const onCancel = () => {
        handleCancel();
    }

    const onEditChange = (e) => {
        setEdited({
            ...edited,
            [e.target.name]: e.target.value,
            [e.target.birth]: e.target.value,
            [e.target.nationality]: e.target.value,
            [e.target.relationship]: e.target.value,
            [e.target.owner]: e.target.value,
            [e.target.marriage]: e.target.value,
            [e.target.income]: e.target.value,
            [e.target.asset]: e.target.value,
            [e.target.history]: e.target.value
        })
    }

    const onSubmitEdit = (e) => {
        e.preventDefault();
        handleEditSubmit(edited);
    }

    return (
        <div>
            <div>
                <div>
                    <h3> 구성원 정보 수정하기 </h3>
                    <i class = "fas fa-edit" onClick = {onCancel}></i>
                </div>

                <form onSubmit = {onSubmitEdit}>
                    <div>
                        <div> ID: {edited.id} </div>
                        <div> 이름: <input type = "text" name = "name" value = {edited.name} onChange = {onEditChange} /></div>
                        <div> 생년월일: <input type = "date" name = "birth" value = {edited.birth} onChange = {onEditChange} /></div>
                        <div> 내/외국인:
                            <input type = "radio" name = "nationality" value = {edited.nationality} onChange = {onEditChange} value = "local" checked = { edited.history ===  "local" ? true: false}/> 내국인 <br />
                            <input type = "radio" name = "nationality" value = {edited.nationality} onChange = {onEditChange} value = "foreigner" checked = { edited.history ===  "foreigner" ? true: false}/> 외국인 <br />
                        </div>
                        <div> 신청자와의 관계: 
                        <select
                            name = "relationship" 
                            value = {edited.relationship}
                            onChange = {onEditChange} >
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
                        </select>
                        </div>
                        <div> 세대주 여부:
                            <input type = "radio" name = "owner" value = {edited.owner} onChange = {onEditChange} value = "owner" checked = { edited.owner ===  "owner" ? true: false}/>세대주이다
                            <input type = "radio" name = "owner" value = {edited.owner} onChange = {onEditChange} value = "noneOwner" checked = { edited.owner ===  "noneOwner" ? true: false}/>세대주가 아니다
                        </div>
                        <div> 혼인 여부:
                            <input type = "radio" name = "marriage" value = {edited.marriage} onChange = {onEditChange} value = "noneMarried" checked = { edited.marriage ===  "noneMarried" ? true: false}/>미혼
                            <input type = "radio" name = "marriage" value = {edited.marriage} onChange = {onEditChange} value = "married" checked = { edited.marriage ===  "married" ? true: false}/>기혼 <br />
                        </div>
                        <div> 월 평균 소득: <input type = "number" name = "income" value = {edited.income} onChange = {onEditChange} /></div>
                        <div> 자산: <input type = "text" name = "asset" value = {edited.asset} onChange = {onEditChange} /></div>
                        <div> 청약 당첨 이력:
                            <input type = "radio" name = "history" value = {edited.history}  onChange = {onEditChange} value = "exist" checked = { edited.history ===  "exist" ? true: false}/> 당첨 이력 존재
                            <input type = "radio" name = "history" value = {edited.history} onChange = {onEditChange} value = "none" checked = { edited.history ===  "none" ? true: false}/> 당첨 이력 전무 <br />
                        </div>
                    </div>

                    <div>
                        <button onClick = {onCancel}> 취소 </button>
                        <button type = "submit"> 수정 </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;