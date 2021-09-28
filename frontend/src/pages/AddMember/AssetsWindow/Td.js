import React, { useState } from 'react';
import './AssetsWindow.css';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import SubButton from '../../../components/Button/SubButton';

const Td = ({ item, handleRemove, handleEdit }) => {
    const onRemove = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            alert('삭제가 완료되었습니다.');
        } else {
            return;
        }
        handleRemove(item.id);
    };

    const onEdit = () => {
        handleEdit(item);
    };

    console.log(JSON.stringify(item));

    return (
        <tr className="allInfoTbodyTr">
            <td className="allInfoTbodyTd"> {item.id} </td>
            <td className="allInfoTbodyTd"> {item.property} </td>
            <td className="allInfoTbodyTd"> {item.saleRightYn} </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item.residentialBuildingYn === 'y'
                    ? item.residentialBuilding
                    : item.nonResidentialBuilding}{' '}
            </td>

            <td className="allInfoTbodyTd">
                {item.acquistionDate
                    .replace('-0', '년 ')
                    .replace('-0', '월 ')
                    .concat('일')}
            </td>

            <td className="allInfoTbodyTd">
                {item.dispositionDate
                    .replace('-0', '년 ')
                    .replace('-0', '월 ')
                    .concat('일')}
            </td>
            <td className="allInfoTbodyTd"> {item.exclusiveArea} </td>
            <td className="allInfoTbodyTd"> {item.amount} </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item.taxBaseDate
                    .replace('-0', '년 ')
                    .replace('-0', '월 ')
                    .concat('일')}{' '}
            </td>

            <td onClick={onEdit} className="modifyContainer">
                <EditFilled className="modifyColor" />
            </td>
            <td onClick={onRemove} className="deleteContainer">
                <DeleteFilled className="deleteColor" />
            </td>
        </tr>
    );
};

export default Td;
