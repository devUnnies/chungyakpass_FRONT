import React from "react";
import './Addmember.css';
import {EditFilled, DeleteFilled} from '@ant-design/icons';

const Td = ({item, handleRemove, handleEdit}) => {
    const onRemove = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            alert("삭제가 완료되었습니다.")
        } else {
            return
        }
        handleRemove(item.id)
    }

    const onEdit = () => {
        handleEdit(item);
    }

    return ( 
        <tr className="allInfoTbodyTr">
            <td className = "allInfoTbodyTd"> { item.id } </td>
            <td className = "allInfoTbodyTd"> { item.name } </td>
            <td className = "allInfoTbodyTd"> { item.birthDate.replace('-','년 ').replace('-','월 ').concat('일') } </td>
            <td className = "allInfoTbodyTd"> { item.foreignerYn==="y"? "외국인":"내국인" } </td>
            <td className = "allInfoTbodyTd"> { item.relationship } </td>
            <td className = "allInfoTbodyTd"> { item.householderYn==="y"? "세대주":"세대구성원" } </td>
            <td className = "allInfoTbodyTd"> { item.soldierYn==="y"? "장기복무중":"" } </td>
            <td className = "allInfoTbodyTd"> { item.homelessStartDate.replace('-','년 ').replace('-','월 ').concat('일') } </td>
            <td className = "allInfoTbodyTd"> { item.isMarried==="y"? "기혼":"미혼" } </td>
            <td className = "allInfoTbodyTd"> { item.marriageDate } </td>
            <td className = "allInfoTbodyTd"> { item.income.concat('원') } </td>
            <td className = "allInfoTbodyTd"> { item.asset.concat('m2') } </td>
            <td className = "allInfoTbodyTd"> { item.history==="y"? "있음": "없음"} </td>
            <td onClick = { onEdit } className = "modifyContainer">
                <EditFilled className="modifyColor" /></td>
            <td onClick = { onRemove } className = "deleteContainer">
                <DeleteFilled className="deleteColor" /></td>
        </tr>
    )
};

export default Td;