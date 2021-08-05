import React from "react";

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
        <tr>
            <td className = "px-4 py-3"> { item.id } </td>
            <td className = "px-4 py-3"> { item.name } </td>
            <td className = "px-4 py-3"> { item.birth } </td>
            <td className = "px-4 py-3"> { item.nationality } </td>
            <td className = "px-4 py-3"> { item.relationship } </td>
            <td className = "px-4 py-3"> { item.owner } </td>
            <td className = "px-4 py-3"> { item.marriage } </td>
            <td className = "px-4 py-3"> { item.income } </td>
            <td className = "px-4 py-3"> { item.asset } </td>
            <td className = "px-4 py-3"> { item.history } </td>
            <td onClick = { onEdit } className = "text-center text-purple-400 cursor-pointer show-modal">
                <i class = "far fa-edit">수정</i></td>
            <td onClick = { onRemove } className = "text-center text-purple-400 cursor-pointer">
                <i class = "far fa-trash-alt">삭제</i></td>
        </tr>
    )
};

export default Td;