import React, { useEffect, useState } from 'react';
import './Histories.css';
import SubButton from '../../components/Button/SubButton';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const HistoriesTd = ({ item, handleHistoryEdit, handleRemove }) => {
    const [isHistoryShow, setIsHistoryShow] = useState(false);
    const [isLimitShow, setIsLimitShow] = useState(false);

    const onRemove = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            alert('삭제가 완료되었습니다.');
        } else {
            return;
        }
        handleRemove(item?.id);
    };

    const onEdit = (state) => {
        // console.log(JSON.stringify(item));
        if (state === 'history') handleHistoryEdit(item);
    };

    return (
        <tr className="historiesInfoTbodyTr">
            <td className="historiesInfoTableTbodyTrTd">
                {isHistoryShow && item ? (
                    <div className="historiesContent">
                        <span>{item.houseName}</span>
                        <br />
                        {item.housingType ? (
                            <span>
                                {item.housingType}
                                <br />
                            </span>
                        ) : null}
                        <span>{item.supply}</span>
                        <br />
                        {item.specialSupply ? (
                            <span>
                                {item.specialSupply}
                                <br />
                            </span>
                        ) : null}
                        {item.ranking ? (
                            <span>
                                {item.ranking}
                                <br />
                            </span>
                        ) : null}
                        {item.result ? (
                            <span>
                                {item.result}
                                <br />
                            </span>
                        ) : null}
                        {item.preliminaryNumber ? (
                            <span>
                                {item.preliminaryNumber}
                                <br />
                            </span>
                        ) : null}
                        {item.winningDate ? (
                            <span>
                                {item.winningDate
                                    .replace('-', '년 ')
                                    .replace('-', '월 ')
                                    .concat('일')}
                                <br />
                            </span>
                        ) : null}
                        {item.raffle ? (
                            <span>
                                {item.raffle}
                                <br />
                            </span>
                        ) : null}
                        {item.cancelWinYn === 'n' ? (
                            <span>
                                유지
                                <br />
                            </span>
                        ) : (
                            <span>
                                취소
                                <br />
                            </span>
                        )}
                        {item.ineligibleYn === 'y' ? (
                            <span>
                                {item.ineligibleDate
                                    .replace('-', '년 ')
                                    .replace('-', '월 ')
                                    .concat('일')}
                            </span>
                        ) : (
                            <span>부적격사항 없음</span>
                        )}
                    </div>
                ) : null}
                <SubButton onClick={() => setIsHistoryShow(!isHistoryShow)}>
                    {isHistoryShow ? '접기' : '더보기'}
                </SubButton>
            </td>
            <td onClick={() => onEdit('history')} className="modifyContainer">
                <EditFilled className="modifyColor" />
            </td>
            <td>
                {item.houseMemberChungyakRestrictionReadDto ? (
                    <>
                        {isLimitShow ? (
                            <div className="historiesContent">
                                {item.houseMemberChungyakRestrictionReadDto
                                    .reWinningRestrictedDate ? (
                                    <span>
                                        재당첨제한 :{' '}
                                        {item.houseMemberChungyakRestrictionReadDto.reWinningRestrictedDate
                                            .replace('-', '년 ')
                                            .replace('-', '월 ')
                                            .concat('일')}
                                        <br />
                                    </span>
                                ) : null}
                                {item.houseMemberChungyakRestrictionReadDto
                                    .specialSupplyRestrictedYn ? (
                                    <span>
                                        {item
                                            .houseMemberChungyakRestrictionReadDto
                                            .specialSupplyRestrictedYn === 'y'
                                            ? '청약불가'
                                            : '청약가능'}
                                        <br />
                                    </span>
                                ) : null}
                                {item.houseMemberChungyakRestrictionReadDto
                                    .unqualifiedSubscriberRestrictedDate ? (
                                    <span>
                                        부적격당첨자제한 :{' '}
                                        {item.houseMemberChungyakRestrictionReadDto.unqualifiedSubscriberRestrictedDate
                                            .replace('-', '년 ')
                                            .replace('-', '월 ')
                                            .concat('일')}
                                        <br />
                                    </span>
                                ) : null}
                                {item.houseMemberChungyakRestrictionReadDto
                                    .requlatedAreaFirstPriorityRestrictedDate ? (
                                    <span>
                                        투기청약과열지구 1순위 제한 :{' '}
                                        {item.houseMemberChungyakRestrictionReadDto.requlatedAreaFirstPriorityRestrictedDate
                                            .replace('-', '년 ')
                                            .replace('-', '월 ')
                                            .concat('일')}
                                        <br />
                                    </span>
                                ) : null}
                                {item.houseMemberChungyakRestrictionReadDto
                                    .additionalPointSystemRestrictedDate ? (
                                    <span>
                                        {item.houseMemberChungyakRestrictionReadDto.additionalPointSystemRestrictedDate
                                            .replace('-', '년 ')
                                            .replace('-', '월 ')
                                            .concat('일')}
                                        <br />
                                    </span>
                                ) : null}
                            </div>
                        ) : null}
                        <SubButton onClick={() => setIsLimitShow(!isLimitShow)}>
                            {isLimitShow ? '접기' : '더보기'}
                        </SubButton>
                    </>
                ) : (
                    '데이터 없음'
                )}
            </td>
            <td onClick={onEdit} className="modifyContainer">
                <EditFilled className="modifyColor" />
            </td>

            <td onClick={onRemove} className="historiesInfoTbodyTrTd">
                <DeleteFilled className="deleteColor" />
            </td>
        </tr>
    );
};

export default HistoriesTd;
