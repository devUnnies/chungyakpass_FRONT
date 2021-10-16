import React, { useEffect, useState } from 'react';
import './Addmember.css';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import SubButton from '../../components/Button/SubButton';

const Td = ({ item, handleRemove, handleEdit }) => {
    const [isAccountShow, setIsAccountShow] = useState(false);
    const [isAssetShow, setIsAssetShow] = useState(false);
    const [isHistoryShow, setIsHistoryShow] = useState(false);
    const [isLimitShow, setIsLimitShow] = useState(false);

    let text = '';

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
        <tr className="allInfoTbodyTr">
            <td className="allInfoTbodyTd"> {item?.name} </td>
            <td className="allInfoTbodyTd">
                {isAccountShow && item?.account !== [] && item?.account[0] ? (
                    <div>
                        {item?.account[0] ? (
                            <span>
                                {item?.account[0].bank.concat('은행')}
                                <br />
                            </span>
                        ) : null}

                        {item?.account[0] ? (
                            <span>
                                {item?.account[0]?.bankbook}
                                <br />
                            </span>
                        ) : null}
                        {item?.account[0] ? (
                            <span>
                                {item?.account[0].joinDate
                                    ? item?.account[0].joinDate
                                          .replace('-', '년 ')
                                          .replace('-', '월 ')
                                          .concat('일')
                                    : null}
                                <br />
                            </span>
                        ) : null}
                        {item?.account[0] ? (
                            <span>
                                {item?.account[0].deposit + '원'}
                                <br />
                            </span>
                        ) : null}
                        {item?.account[0] ? (
                            <span>
                                {item?.account[0].paymentsCount + '회'}
                                <br />
                            </span>
                        ) : null}
                        {item?.account[0] &&
                        item?.account[0].validYn === 'y' ? (
                            <span>유효함</span>
                        ) : null}
                    </div>
                ) : null}{' '}
                <SubButton onClick={() => setIsAccountShow(!isAccountShow)}>
                    {isAccountShow ? '접기' : '더보기'}
                </SubButton>{' '}
            </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item?.birthDate
                    ? item?.birthDate
                          .replace('-', '년 ')
                          .replace('-', '월 ')
                          .concat('일')
                    : null}{' '}
            </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item?.foreignerYn === 'y' ? '외국인' : '내국인'}{' '}
            </td>
            <td className="allInfoTbodyTd"> {item?.relationship} </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item?.householderYn === 'y' ? '세대주' : '세대구성원'}{' '}
            </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item?.soldierYn === 'y' ? '장기복무중' : 'X'}{' '}
            </td>
            {/* <td className="allInfoTbodyTd">
                {' '}
                {item?.spouseYn === 'y' ? '분리세대' : ''}{' '}
            </td> */}
            <td className="allInfoTbodyTd">
                {' '}
                {item?.homelessStartDate
                    ? item?.homelessStartDate
                          .replace('-', '년 ')
                          .replace('-', '월 ')
                          .concat('일')
                    : null}
            </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item?.transferDate
                    ? item?.transferDate
                          .replace('-', '년 ')
                          .replace('-', '월 ')
                          .concat('일')
                    : null}
            </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item?.isMarried === 'y' ? '기혼' : '미혼'}{' '}
            </td>
            <td className="allInfoTbodyTd">
                {item?.isMarried === 'y' && item?.marriedDate !== ''
                    ? item?.marriedDate
                          .replace('-', '년 ')
                          .replace('-', '월 ')
                          .concat('일')
                    : null}{' '}
            </td>
            <td className="allInfoTbodyTd"> {item?.income.concat('원')} </td>
            <td className="allInfoTbodyTd">
                {isAssetShow ? (
                    <div>
                        {item?.assets.map((content, i) => {
                            content.map((content2, j) => {
                                // console.log(JSON.stringify(content2));
                                if (content2.property)
                                    text += content2.property + `\n\r`;

                                if (content2.saleRightYn === 'y')
                                    text += `분양권있음\n\r`;
                                else text += `분양권없음\n\r`;

                                if (
                                    content2?.property === '건물' ||
                                    content2?.property === '토지'
                                ) {
                                    if (
                                        content2?.residentialBuildingYn === 'y'
                                    ) {
                                        text +=
                                            content2?.residentialBuilding +
                                            `\n\r`;
                                    } else {
                                        text +=
                                            content2?.nonResidentialBuilding +
                                            `\n\r`;
                                    }
                                }

                                if (content2?.acquistionDate) {
                                    text +=
                                        content2?.acquistionDate
                                            .replace('-', '년')
                                            .replace('-', '월')
                                            .concat('일취득') + `\n\r`;
                                }

                                if (content2?.dispositionDate) {
                                    text +=
                                        content2?.dispositionDate
                                            .replace('-', '년')
                                            .replace('-', '월')
                                            .concat('일처분') + `\n\r`;
                                }

                                if (
                                    content2?.property === '건물' ||
                                    content2?.property === '토지'
                                ) {
                                    if (content2?.exclusiveArea) {
                                        text +=
                                            content2?.exclusiveArea.concat(
                                                'm²'
                                            ) + `\n\r`;
                                    }
                                }

                                if (content2?.amount) {
                                    text +=
                                        content2?.amount.concat('원') + `\n\r`;
                                }

                                if (content2?.taxBaseDate) {
                                    text +=
                                        content2?.taxBaseDate
                                            .replace('-', '년')
                                            .replace('-', '월')
                                            .concat('일') + `\n\r`;
                                }
                            });
                        })}
                        {text}
                    </div>
                ) : null}
                <SubButton onClick={() => setIsAssetShow(!isAssetShow)}>
                    {isAssetShow ? '접기' : '더보기'}
                </SubButton>
            </td>
            <td className="allInfoTbodyTd">
                {isHistoryShow ? (
                    <div>
                        {item?.histories.map((content, i) => {
                            return (
                                <div>
                                    {content?.houseName ? (
                                        <span>
                                            {content?.houseName}
                                            <br />
                                        </span>
                                    ) : null}
                                    {content?.supply ? (
                                        <span>
                                            {content?.supply}
                                            <br />
                                        </span>
                                    ) : null}
                                    {content?.supply === '특별공급' ? (
                                        <span>
                                            {content?.specialSupply}
                                            <br />
                                        </span>
                                    ) : null}
                                    {content?.housingType ? (
                                        <span>
                                            {content?.housingType}
                                            <br />
                                        </span>
                                    ) : null}
                                    {content?.ranking ? (
                                        <span>
                                            {content?.ranking}
                                            <br />
                                        </span>
                                    ) : null}
                                    {content?.result ? (
                                        <span>
                                            {content?.result}
                                            <br />
                                        </span>
                                    ) : null}
                                    {content?.result === '예비당첨' ? (
                                        <span>
                                            {content?.preliminaryNumber}
                                            <br />
                                        </span>
                                    ) : null}
                                    {content?.winningDate ? (
                                        <span>
                                            {content?.winningDate
                                                .replace('-', '년 ')
                                                .replace('-', '월 ')
                                                .concat('일')}
                                            <br />
                                        </span>
                                    ) : null}
                                    {content?.raffle ? (
                                        <span>
                                            {content?.raffle}
                                            <br />
                                        </span>
                                    ) : null}
                                    {content?.result === '당첨' ? (
                                        <span>{content?.cancelwinYn}</span>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                ) : null}
                <SubButton onClick={() => setIsHistoryShow(!isHistoryShow)}>
                    {isHistoryShow ? '접기' : '더보기'}
                </SubButton>
            </td>
            <td className="allInfoTbodyTd">
                {isLimitShow ? (
                    <div>
                        {item?.limits.map((content, i) => {
                            return (
                                <div>
                                    {content?.reWinningRestrictedDate ? (
                                        <span>
                                            {content?.reWinningRestrictedDate
                                                .replace('-', '년 ')
                                                .replace('-', '월 ')
                                                .concat('일')}
                                            <br />
                                        </span>
                                    ) : null}
                                    <span>
                                        {content?.specialSupplyRestrictedYn ===
                                        '청약불가'
                                            ? '청약불가'
                                            : '청약가능'}
                                    </span>
                                    <br />
                                    {content?.unqualifiedSubscriberRestrictedDate ? (
                                        <span>
                                            {content?.unqualifiedSubscriberRestrictedDate
                                                .replace('-', '년 ')
                                                .replace('-', '월 ')
                                                .concat('일')}
                                            <br />
                                        </span>
                                    ) : null}
                                    {content?.requlatedAreaFirstPriorityRestrictedDate ? (
                                        <span>
                                            {content?.requlatedAreaFirstPriorityRestrictedDate
                                                .replace('-', '년 ')
                                                .replace('-', '월 ')
                                                .concat('일')}
                                            <br />
                                        </span>
                                    ) : null}
                                    {content?.additionalPointSystemRestrictedDate ? (
                                        <span>
                                            {content?.additionalPointSystemRestrictedDate
                                                .replace('-', '년 ')
                                                .replace('-', '월 ')
                                                .concat('일')}
                                        </span>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                ) : null}
                <SubButton onClick={() => setIsLimitShow(!isLimitShow)}>
                    {isLimitShow ? '접기' : '더보기'}
                </SubButton>
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
