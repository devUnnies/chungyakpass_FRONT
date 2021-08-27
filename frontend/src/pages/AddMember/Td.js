import React, { useState } from 'react';
import './Addmember.css';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import SubButton from '../../components/Button/SubButton';

const Td = ({ item, handleRemove, handleEdit }) => {
    const [isShow, setIsShow] = useState(false);
    const [isAssetShow, setIsAssetShow] = useState(false);

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

    return (
        <tr className="allInfoTbodyTr">
            <td className="allInfoTbodyTd"> {item.id} </td>
            <td className="allInfoTbodyTd"> {item.name} </td>
            <td className="allInfoTbodyTd">
                {isShow ? (
                    <div>
                        <span>
                            {item.relationship === '본인' ? item.bank : null}
                        </span>
                        <br />
                        <span>
                            {item.relationship === '본인'
                                ? item.bankbook
                                : null}
                        </span>
                        <br />
                        <span>
                            {item.relationship === '본인'
                                ? item.joinDate
                                      .replace('-', '년 ')
                                      .replace('-', '월 ')
                                      .concat('일')
                                : null}
                        </span>
                        <br />
                        <span>
                            {item.relationship === '본인'
                                ? item.deposit + '원'
                                : null}
                        </span>
                        <br />
                        <span>
                            {item.relationship === '본인'
                                ? item.paymentsCount + '회'
                                : null}
                        </span>
                        <br />
                        <span>
                            {item.relationship === '본인' &&
                            item.validYn === 'y'
                                ? '유효함'
                                : null}
                        </span>
                    </div>
                ) : null}{' '}
                <SubButton onClick={() => setIsShow(!isShow)}>
                    {isShow ? '접기' : '더보기'}
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
                            if (content.haveAssets === 'y') {
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
                                            {console.log(
                                                content.acquistionDate
                                            )}
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
                                                {content.exclusiveArea.concat(
                                                    'm²'
                                                )}
                                            </span>
                                        ) : null}
                                        <span>
                                            {content.amount.concat('원')}
                                        </span>
                                        <br />
                                        <span>
                                            {content.taxBaseDate
                                                .replace('-', '년 ')
                                                .replace('-', '월 ')
                                                .concat('일')}
                                        </span>
                                    </div>
                                );
                            }
                        })}
                    </div>
                ) : null}
                <SubButton onClick={() => setIsAssetShow(!isAssetShow)}>
                    {isAssetShow ? '접기' : '더보기'}
                </SubButton>
            </td>
            <td className="allInfoTbodyTd">
                {' '}
                {item.history === 'y' ? '있음' : '없음'}{' '}
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
