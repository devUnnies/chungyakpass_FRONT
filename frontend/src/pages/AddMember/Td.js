import React from "react";

const Td = ({item, handleRemove, handleEdit}) => {
    const onRemove = () => {
        handleRemove(item.id)
    }

    const onEdit = () => {
        handleEdit(item);
    }

    return ( 
        <tr>
            <td> { item.id } </td>
            <td> { item.name } </td>
            <td> { item.birth } </td>
            <td> { item.nationality } </td>
            <td> { item.relationship } </td>
            <td> { item.owner } </td>
            <td> { item.marriage } </td>
            <td> { item.income } </td>
            <td> { item.asset } </td>
            <td> { item.history } </td>
            <td onClick = { onEdit }>
                <i class = "far fa-edit">수정</i></td>
            <td onClick = { onRemove }>
                <i class = "far fa-trash-alt">삭제</i></td>
        </tr>
    )
};

export default Td;