import React, { useEffect, useState } from 'react';
import './Member.css';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import SubButton from '../../components/Button/SubButton';

const Td = ({ item, assets, handleEdit, handleRemove }) => {
    const onEdit = () => {
        // console.log(JSON.stringify(item));
        handleEdit(item);
    };

    const onRemove = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            alert('삭제가 완료되었습니다.');
        } else {
            return;
        }
        handleRemove(item?.id);
    };

    const relation = (num) => {
        switch (num) {
            case 1:
                return '본인';
            case 2:
                return '배우자';

            case 3:
                return '부';
            case 4:
                return '모';
            case 5:
                return '배우자의부';
            case 6:
                return '배우자의모';
            case 7:
                return '조부';
            case 8:
                return '조모';
            case 9:
                return '배우자의조부';
            case 10:
                return '배우자의조모';
            case 11:
                return '자녀_일반';
            case 12:
                return '자녀_태아';
            case 13:
                return '자녀의배우자';
            case 14:
                return '손자녀';
            case 15:
                return '손자녀의배우자';
        }
    };

    // const onEdit = () => {
    //     // console.log(JSON.stringify(item));
    //     handleEdit(item);
    // };

    return (
        <>
            {console.log(JSON.stringify(item))}
            {item ? (
                <tr className="membersInfoTbodyTr">
                    {/* 이름 */}
                    <td className="membersInfoTbodyTrTd">
                        <span>{item?.name}</span>
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.birthDay
                            .replace('-', '년 ')
                            .replace('-', '월 ')
                            .concat('일')}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.foreignerYn === 'y' ? '외국인' : '내국인'}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.relation ? item.relation : null}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.soldierYn === 'y' ? '장기복무중' : null}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.marriageDate ? item?.marriageDate : null}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.homelessStartDate
                            ? item?.homelessStartDate
                                  .replace('-', '년 ')
                                  .replace('-', '월 ')
                                  .concat('일')
                            : null}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.transferDate
                            ? item?.transferDate
                                  .replace('-', '년 ')
                                  .replace('-', '월 ')
                                  .concat('일')
                            : null}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.income !== 0
                            ? item?.income + '원'
                            : item?.income === 0
                            ? item?.income + '원'
                            : null}
                    </td>
                    {/* 수정 버튼 */}
                    <td onClick={onEdit} className="modifyContainer">
                        <EditFilled className="modifyColor" />
                    </td>
                    {/* 삭제 버튼 */}
                    <td onClick={onRemove} className="allInfoTbodyTd">
                        <DeleteFilled className="deleteColor" />
                    </td>
                </tr>
            ) : null}
        </>
    );
};

export default Td;
