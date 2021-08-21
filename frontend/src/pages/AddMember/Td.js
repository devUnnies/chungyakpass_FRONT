import React from "react";
import './Addmember.css';

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
            <td className = "allInfoTbodyTd"> { item.birth } </td>
            <td className = "allInfoTbodyTd"> { item.nationality } </td>
            <td className = "allInfoTbodyTd"> { item.relationship } </td>
            <td className = "allInfoTbodyTd"> { item.owner } </td>
            <td className = "allInfoTbodyTd"> { item.marriage } </td>
            <td className = "allInfoTbodyTd"> { item.income } </td>
            <td className = "allInfoTbodyTd"> { item.asset } </td>
            <td className = "allInfoTbodyTd"> { item.history } </td>
            <td onClick = { onEdit } className = "text-center text-purple-400 cursor-pointer show-modal">
                <i class = "far fa-edit">수정</i></td>
            <td onClick = { onRemove } className = "text-center text-purple-400 cursor-pointer">
                <i class = "far fa-trash-alt">삭제</i></td>
        </tr>
    )
};

export default Td;