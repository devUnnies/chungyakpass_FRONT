import React, { useState } from 'react';
import './Addmember.css';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import SubButton from '../../components/Button/SubButton';

const Td = ({ item, handleRemove, handleEdit }) => {
    const [isAccountShow, setIsAccountShow] = useState(false);
    const [isAssetShow, setIsAssetShow] = useState(false);
    const [isHistoryShow, setIsHistoryShow] = useState(false);
    const [isLimitShow, setIsLimitShow] = useState(false);

    const onRemove = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            alert('삭제가 완료되었습니다.');
        } else {
            return;
        }
        handleRemove(item.id);
    };

    const onEdit = () => {
        console.log(JSON.stringify(item));
        handleEdit(item);
    };

    console.log(JSON.stringify(item));

    return (
        <tr className="allInfoTbodyTr">
            <td className="allInfoTbodyTd"> {item.name} </td>
            <td className="allInfoTbodyTd">
                {isAccountShow && item.account !== [] ? (
                    <div>
                        {item.account[0] ? (
                            <span>
                                {item.account[0].bank.concat('은행') + '\n'}
                            </span>
                        ) : null}
                        {item.account[0] ? (
                            <span>{item.account[0].bankbook + '\n'}</span>
                        ) : null}
                        {item.account[0] ? (
                            <span>
                                {item.account[0].joinDate
                                    .replace('-', '년 ')
                                    .replace('-', '월 ')
                                    .concat('일') + '\n'}
                            </span>
                        ) : null}
                        {item.account[0] ? (
                            <span>{item.account[0].deposit + '원' + '\n'}</span>
                        ) : null}
                        {item.account[0] ? (
                            <span>
                                {item.account[0].paymentsCount + '회' + '\n'}
                            </span>
                        ) : null}

                        {item.account[0] && item.account[0].validYn === 'y' ? (
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
                {item.birthDate
                    .replace('-', '년 ')
                    .replace('-', '월 ')
                    .concat('일')}{' '}
            </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item.foreignerYn === 'y' ? '외국인' : '내국인'}{' '}
            </td>
            <td className="allInfoTbodyTd"> {item.relationship} </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item.householderYn === 'y' ? '세대주' : '세대구성원'}{' '}
            </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item.soldierYn === 'y' ? '장기복무중' : 'X'}{' '}
            </td>
            {/* <td className="allInfoTbodyTd">
                {' '}
                {item.spouseYn === 'y' ? '분리세대' : ''}{' '}
            </td> */}
            <td className="allInfoTbodyTd">
                {' '}
                {item.homelessStartDate
                    .replace('-', '년 ')
                    .replace('-', '월 ')
                    .concat('일')}{' '}
            </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item.transferDate
                    .replace('-', '년 ')
                    .replace('-', '월 ')
                    .concat('일')}{' '}
            </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item.isMarried === 'y' ? '기혼' : '미혼'}{' '}
            </td>
            <td className="allInfoTbodyTd">
                {' '}
                {console.log(item.marriedDate)}
                {item.isMarried === 'y' && item.marriedDate !== ''
                    ? item.marriedDate
                          .replace('-', '년 ')
                          .replace('-', '월 ')
                          .concat('일')
                    : null}{' '}
            </td>
            <td className="allInfoTbodyTd"> {item.income.concat('원')} </td>
            <td className="allInfoTbodyTd">
                {isAssetShow ? (
                    <div>
                        {item.assets.map((content, i) => {
                            return (
                                <div>
                                    <span>{content.property}</span>
                                    <br />
                                    <span>
                                        {content.saleRightYn === 'y'
                                            ? '분양권 있음'
                                            : '분양권 없음'}
                                    </span>
                                    <br />
                                    <span>
                                        {content.property === '건물' ||
                                        content.property === '토지'
                                            ? content.residentialBuildingYn ===
                                              'y'
                                                ? content.residentialBuilding
                                                : content.nonResidentialBuilding
                                            : null}
                                    </span>
                                    <br />
                                    <span>
                                        {console.log(content.acquistionDate)}
                                        {content.acquistionDate !== ''
                                            ? content.acquistionDate
                                                  .replace('-', '년 ')
                                                  .replace('-', '월 ')
                                                  .concat('일 취득')
                                            : null}
                                    </span>
                                    <br />
                                    <span>
                                        {content.dispositionDate !== ''
                                            ? content.dispositionDate
                                                  .replace('-', '년 ')
                                                  .replace('-', '월 ')
                                                  .concat('일 처분')
                                            : null}
                                    </span>
                                    <br />
                                    {content.property === '건물' ||
                                    content.property === '토지' ? (
                                        <span>
                                            {content.exclusiveArea.concat('m²')}
                                        </span>
                                    ) : null}
                                    <span>{content.amount.concat('원')}</span>
                                    <br />
                                    <span>
                                        {content.taxBaseDate
                                            .replace('-', '년 ')
                                            .replace('-', '월 ')
                                            .concat('일')}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
                <SubButton onClick={() => setIsAssetShow(!isAssetShow)}>
                    {isAssetShow ? '접기' : '더보기'}
                </SubButton>
            </td>
            <td className="allInfoTbodyTd">
                {isHistoryShow ? (
                    <div>
                        {item.histories.map((content, i) => {
                            return (
                                <div>
                                    <span>{content.houseName}</span>
                                    <br />
                                    <span>{content.supply}</span>
                                    <br />
                                    <span>
                                        {content.supply === '특별공급'
                                            ? content.specialSupply
                                            : null}
                                    </span>
                                    <br />
                                    <span>{content.housingType}</span>
                                    <br />
                                    <span>{content.ranking}</span>
                                    <br />
                                    {content.result}
                                    <span>
                                        {content.result === '예비당첨'
                                            ? content.preliminaryNumber
                                            : null}
                                    </span>
                                    <br />
                                    <span>
                                        {content.winningDate
                                            .replace('-', '년 ')
                                            .replace('-', '월 ')
                                            .concat('일')}
                                    </span>
                                    <br />
                                    <span>{content.raffle}</span>
                                    <br />
                                    <span>
                                        {content.result === '당첨'
                                            ? content.cancelwinYn
                                            : null}
                                    </span>
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
                        {item.limits.map((content, i) => {
                            return (
                                <div>
                                    <span>
                                        {content.reWinningRestrictedDate
                                            .replace('-', '년 ')
                                            .replace('-', '월 ')
                                            .concat('일')}
                                    </span>
                                    <br />
                                    <span>
                                        {content.specialSupplyRestrictedYn ===
                                        '청약불가'
                                            ? '청약불가'
                                            : '청약가능'}
                                    </span>
                                    <br />
                                    <span>
                                        {content.unqualifiedSubscriberRestrictedDate
                                            .replace('-', '년 ')
                                            .replace('-', '월 ')
                                            .concat('일')}
                                    </span>
                                    <br />
                                    <span>
                                        {content.requlatedAreaFirstPriorityRestrictedDate
                                            .replace('-', '년 ')
                                            .replace('-', '월 ')
                                            .concat('일')}
                                    </span>
                                    <br />
                                    <span>
                                        {content.additionalPointSystemRestrictedDate
                                            .replace('-', '년 ')
                                            .replace('-', '월 ')
                                            .concat('일')}
                                    </span>
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
