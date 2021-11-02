import React, { useEffect, useState } from 'react';
import './Histories.css';
import SubButton from '../../components/Button/SubButton';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const HistoriesTd = ({ item, handleEdit, handleRemove }) => {
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

    const onEdit = () => {
        // console.log(JSON.stringify(item));
        handleEdit(item);
    };

    return (
        <tr className="historiesInfoTbodyTr">
            <td className="historiesInfoTableTbodyTrTd">
                {isHistoryShow && item.history ? (
                    <div className="historiesContent">
                        <span>{item.history.houseName}</span>
                        <br />
                        {item.history.housingType ? (
                            <span>
                                {item.history.housingType}
                                <br />
                            </span>
                        ) : null}
                        <span>{item.history.supply}</span>
                        <br />
                        {item.history.specialSupply ? (
                            <span>
                                {item.history.specialSupply}
                                <br />
                            </span>
                        ) : null}
                        {item.history.ranking ? (
                            <span>
                                {item.history.ranking}
                                <br />
                            </span>
                        ) : null}
                        {item.history.result ? (
                            <span>
                                {item.history.result}
                                <br />
                            </span>
                        ) : null}
                        {item.history.preliminaryNumber ? (
                            <span>
                                {item.history.preliminaryNumber}
                                <br />
                            </span>
                        ) : null}
                        {item.history.winningDate ? (
                            <span>
                                {item.history.winningDate
                                    .replace('-', '년 ')
                                    .replace('-', '월 ')
                                    .concat('일')}
                                <br />
                            </span>
                        ) : null}
                        {item.history.raffle ? (
                            <span>
                                {item.history.raffle}
                                <br />
                            </span>
                        ) : null}
                        {item.history.cancelYn === 'n' ? (
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
                        {item.history.ineligibleYn === 'y' ? (
                            <span>
                                {item.history.ineligibleDate
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
            <td>
                {item.limit ? (
                    <>
                        {isLimitShow ? (
                            <div className="historiesContent">
                                {item.limit.reWinningRestrictedDate ? (
                                    <span>
                                        재당첨제한 :{' '}
                                        {item.limit.reWinningRestrictedDate
                                            .replace('-', '년 ')
                                            .replace('-', '월 ')
                                            .concat('일')}
                                        <br />
                                    </span>
                                ) : null}
                                {item.limit.specialSupplyRestrictedYn ? (
                                    <span>
                                        {item.limit
                                            .specialSupplyRestrictedYn === 'y'
                                            ? '청약불가'
                                            : '청약가능'}
                                        <br />
                                    </span>
                                ) : null}
                                {item.limit
                                    .unqualifiedSubscriberRestrictedDate ? (
                                    <span>
                                        부적격당첨자제한 :{' '}
                                        {item.limit.unqualifiedSubscriberRestrictedDate
                                            .replace('-', '년 ')
                                            .replace('-', '월 ')
                                            .concat('일')}
                                        <br />
                                    </span>
                                ) : null}
                                {item.limit
                                    .requlatedAreaFirstPriorityRestrictedDate ? (
                                    <span>
                                        투기청약과열지구 1순위 제한 :{' '}
                                        {item.limit.requlatedAreaFirstPriorityRestrictedDate
                                            .replace('-', '년 ')
                                            .replace('-', '월 ')
                                            .concat('일')}
                                        <br />
                                    </span>
                                ) : null}
                                {item.limit
                                    .additionalPointSystemRestrictedDate ? (
                                    <span>
                                        {item.limit.additionalPointSystemRestrictedDate
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

            <td onClick={onRemove} className="historiesInfoTbodyTrTd">
                <DeleteFilled className="deleteColor" />
            </td>
        </tr>
    );
};

export default HistoriesTd;
