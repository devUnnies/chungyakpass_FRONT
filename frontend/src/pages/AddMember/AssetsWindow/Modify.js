import React, { useState, useEffect } from 'react';
import {
    QuestionCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';

const Modify = ({
    selectedData,
    startDates,
    setStartDates,
    handleCancel,
    handleEditSubmit,
    birthDate,
    ineligibleDate,
}) => {
    const [edited, setEdited] = useState(selectedData);
    const [logicData, setLogicData] = useState({
        isInheritance: '',
        conditionType: '',
    });
    const [isNoStruct, setIsNoStruct] = useState(false);
    const [startDate, setStartDate] = useState(birthDate);
    const [ineliDate, setIneliDate] = useState(
        new Date(ineligibleDate).getMonth() + 3
    );

    const [failMsg, setFailMsg] = useState(null);

    const logic = () => {
        if (edited.property === '건물') {
            setIsNoStruct(false);
            // 3개월 이내 처분한 상속주택인지?
            if (
                logicData.isInheritance === 'y' &&
                new Date(edited.dispositionDate) <= ineliDate
            ) {
                setIsNoStruct(true);
                setEdited({ ...edited, exceptionHouseYn: 'y' });
            }
            // 폐가, 무허가 건물, 문화재로 지정된 주택, 미분양된 주택, 사업 목적인지?
            if (logicData.conditionType !== '') {
                setIsNoStruct(true);
                setEdited({ ...edited, exceptionHouseYn: 'y' });
            }
            // 소형 주택인지?
            if (
                (edited.residentialBuilding === '단독주택' ||
                    edited.residentialBuilding === '공동주택') &&
                Number(edited.exclusiveArea) <= 60
            ) {
                setIsNoStruct(true);
                setEdited({ ...edited, exceptionHouseYn: 'y' });
            }

            if (edited.dispositionDate) {
                setIsNoStruct(false);
                // setStartDate(asset.dispositionDate);
                setStartDates([
                    ...startDates,
                    { startDate: edited.dispositionDate },
                ]);
            } else {
                setIsNoStruct(false);
                setStartDate(null);
                setStartDates([...startDates, { startDate: null }]);
            }

            return;
        } else {
            setIsNoStruct(true);
            setStartDate(birthDate);
            setStartDates([...startDates, { startDate: startDate }]);
        }
    };

    useEffect(() => {
        setStartDate(edited.dispositionDate);
    }, [edited.dispositionDate]);

    // 체크해서 아닐 때는 값 없도록
    useEffect(() => {
        if (edited.residentialBuildingYn === 'y') {
            setEdited({ ...edited, nonResidentialBuilding: '' });
        } else {
            setEdited({ ...edited, residentialBuilding: '' });
        }
    }, [edited.residentialBuildingYn]);

    useEffect(() => {
        if (edited.property === '자동차') {
            setEdited({
                ...edited,
                saleRightYn: '',
                residentialBuildingYn: '',
                residentialBuilding: '',
                nonResidentialBuilding: '',
                metropolitanBuildingYn: '',
                exceptionHouseYn: '',
            });
        }
    }, [edited.property]);

    useEffect(() => {
        // fail msg 수정
        if (
            new Date(Date.parse(edited.acquistionDate)) >
            new Date(Date.parse(edited.dispositionDate))
        ) {
            setFailMsg('!!');
        } else {
            setFailMsg(null);
        }
    }, [edited]);

    const onCancel = () => {
        handleCancel();
    };

    const onEditChange = (e) => {
        const { name, value } = e.target;
        setEdited({
            ...edited,
            [name]: value,
        });
    };

    const onLogicDataChange = (e) => {
        const { name, value } = e.target;
        setLogicData({
            ...logicData,
            [name]: value,
        });
    };

    const onSubmitEdit = (e) => {
        e.preventDefault();
        if (failMsg === null) {
            logic();
            handleEditSubmit(edited);
            setEdited({
                property: '',
                saleRightYn: '',
                residentialBuildingYn: '',
                residentialBuilding: '',
                nonResidentialBuilding: '',
                metropolitanBuildingYn: '',
                exceptionHouseYn: '',
                acquistionDate: '',
                dispositionDate: '',
                exclusiveArea: '',
                amount: '',
                taxBaseDate: '',
                startDate: birthDate,
            });
        } else {
            alert(
                '이대로 진행 시 자격을 판단할 수 없습니다.\n입력 내용을 다시 확인해주십시오.'
            );
        }
    };

    return (
        <div className="addAssetFormContainer">
            <form onSubmit={onSubmitEdit} className="addAssetForm">
                <table className="addAssetFormTable">
                    <tbody className="addAssetFormTableTbody">
                        <tr className="addAssetFormTableTbodyTr">
                            <td className="addAssetFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">자산유형</span>
                            </td>
                            <td className="addAssetFormTableTbodyTrTd">
                                <select
                                    className="assetPropertyInput"
                                    type="number"
                                    name="property"
                                    onChange={onEditChange}
                                    value={edited.property}
                                    required
                                >
                                    <option value=""> ---선택--- </option>
                                    <option value="건물">건물</option>
                                    <option value="토지">토지</option>
                                    <option value="자동차">자동차</option>
                                </select>
                            </td>
                        </tr>

                        <tr className="addAssetFormTableTbodyTr">
                            <td className="addAssetFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">상속 여부</span>
                            </td>
                            <td className="addAssetFormTableTbodyTrTd">
                                {/* <hr className="Line" /> */}
                                <input
                                    className="assetSaleRightYnInput"
                                    type="radio"
                                    name="isInheritance"
                                    onChange={onLogicDataChange}
                                    value="n"
                                    checked={
                                        logicData.isInheritance === 'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetSaleRightYnText">
                                    받지 않았습니다
                                </span>
                                <input
                                    className="assetSaleRightYnInput"
                                    type="radio"
                                    name="isInheritance"
                                    onChange={onLogicDataChange}
                                    value="y"
                                    checked={
                                        logicData.isInheritance === 'y'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetSaleRightYnText">
                                    받았습니다
                                </span>
                            </td>
                        </tr>
                        {edited.property === '건물' ||
                        edited.property === '토지' ? (
                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        분양권 여부
                                    </span>
                                </td>
                                <td className="addAssetFormTableTbodyTrTd">
                                    {/* <hr className="Line" /> */}
                                    <input
                                        className="assetSaleRightYnInput"
                                        type="radio"
                                        name="saleRightYn"
                                        onChange={onEditChange}
                                        value="n"
                                        checked={
                                            edited.saleRightYn === 'n'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="assetSaleRightYnText">
                                        없습니다
                                    </span>
                                    <input
                                        className="assetSaleRightYnInput"
                                        type="radio"
                                        name="saleRightYn"
                                        onChange={onEditChange}
                                        value="y"
                                        checked={
                                            edited.saleRightYn === 'y'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="assetSaleRightYnText">
                                        있습니다
                                    </span>
                                </td>
                            </tr>
                        ) : null}
                        {edited.property === '건물' ||
                        edited.property === '토지' ? (
                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        주거용 여부
                                    </span>
                                </td>
                                <td className="addAssetFormTableTbodyTrTd">
                                    <input
                                        className="assetResidentialBuildingYnInput"
                                        type="radio"
                                        name="residentialBuildingYn"
                                        onChange={onEditChange}
                                        value="y"
                                        checked={
                                            edited.residentialBuildingYn === 'y'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="assetResidentialBuildingYnText">
                                        주거용
                                    </span>
                                    <input
                                        className="assetResidentialBuildingYnInput"
                                        type="radio"
                                        name="residentialBuildingYn"
                                        onChange={onEditChange}
                                        value="n"
                                        checked={
                                            edited.residentialBuildingYn === 'n'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="assetResidentialBuildingYnText">
                                        비 주거용
                                    </span>
                                </td>
                            </tr>
                        ) : null}

                        {edited.property === '건물' &&
                        edited.residentialBuildingYn === 'y' ? (
                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        주거용건물유형
                                    </span>
                                </td>
                                <td className="addAssetFormTableTbodyTrTd">
                                    <select
                                        className="assetResidentialBuildingSelect"
                                        type="number"
                                        name="residentialBuilding"
                                        onChange={onEditChange}
                                        value={edited.residentialBuilding}
                                        required
                                    >
                                        <option value=""> ---선택--- </option>
                                        <option value="단독주택">
                                            단독주택
                                        </option>
                                        <option value="공동주택">
                                            공동주택
                                        </option>
                                        <option value="오피스텔">
                                            오피스텔
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ) : edited.property === '건물' &&
                          edited.residentialBuildingYn === 'n' ? (
                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        비주거용건물유형
                                    </span>
                                </td>
                                <td className="addAssetFormTableTbodyTrTd">
                                    <select
                                        className="assetNoResidentialBuildingSelect"
                                        type="number"
                                        name="nonResidentialBuilding"
                                        onChange={onEditChange}
                                        value={edited.nonResidentialBuilding}
                                        required
                                    >
                                        <option value=""> ---선택--- </option>
                                        <option value="건물">건물</option>
                                        <option value="부속토지">
                                            부속토지
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ) : null}
                        {edited.property === '건물' ||
                        (edited.property === '토지' &&
                            edited.residentialBuildingYn === 'y') ? (
                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">예외 유형</span>
                                </td>
                                <td className="addAssetFormTableTbodyTrTd">
                                    <select
                                        className="assetPropertyInput"
                                        type="number"
                                        name="conditionType"
                                        onChange={onLogicDataChange}
                                        value={logicData.conditionType}
                                        required
                                    >
                                        <option value=""> 해당 없음 </option>
                                        <option value="폐가">폐가</option>
                                        <option value="무허가건물">
                                            무허가건물
                                        </option>
                                        <option value="문화재지정주택">
                                            문화재지정주택
                                        </option>
                                        <option value="미분양된주택공급">
                                            미분양된주택공급
                                        </option>
                                        <option value="사업목적">
                                            사업목적
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ) : null}
                        {edited.property === '건물' ||
                        edited.property === '토지' ? (
                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">위치</span>
                                </td>
                                <td className="addAssetFormTableTbodyTrTd">
                                    {/* <hr className="Line" /> */}
                                    <input
                                        className="assetSaleRightYnInput"
                                        type="radio"
                                        name="metropolitanBuildingYn"
                                        onChange={onEditChange}
                                        value="y"
                                        checked={
                                            edited.metropolitanBuildingYn ===
                                            'y'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="assetSaleRightYnText">
                                        수도권이다
                                    </span>
                                    <input
                                        className="assetSaleRightYnInput"
                                        type="radio"
                                        name="metropolitanBuildingYn"
                                        onChange={onEditChange}
                                        value="n"
                                        checked={
                                            edited.metropolitanBuildingYn ===
                                            'n'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="assetSaleRightYnText">
                                        수도권이 아니다
                                    </span>
                                </td>
                            </tr>
                        ) : null}
                        <tr className="addAssetFormTableTbodyTr">
                            <td className="addAssetFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">취득일</span>
                            </td>
                            <td className="addAssetFormTableTbodyTrTd">
                                <input
                                    className="assetAcquistionDateInput"
                                    type="date"
                                    name="acquistionDate"
                                    value={edited.acquistionDate}
                                    onChange={onEditChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr className="addAssetFormTableTbodyTr">
                            <td className="addAssetFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">처분일</span>
                            </td>
                            <td className="addAssetFormTableTbodyTrTd">
                                <input
                                    className="assetDispositionDateInput"
                                    type="date"
                                    name="dispositionDate"
                                    value={edited.dispositionDate}
                                    onChange={onEditChange}
                                    required
                                />
                            </td>
                        </tr>
                        {edited.property === '건물' ||
                        edited.property === '토지' ? (
                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">전용면적</span>
                                </td>
                                <td className="addAssetFormTableTbodyTrTd">
                                    <input
                                        className="assetExclusiveAreaInput"
                                        type="number"
                                        name="exclusiveArea"
                                        value={edited.exclusiveArea}
                                        onChange={onEditChange}
                                        required
                                    />
                                    <span> ㎡ </span>
                                </td>
                            </tr>
                        ) : null}
                        <tr className="addAssetFormTableTbodyTr">
                            <td className="addAssetFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">금액</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="assetAmountInput"
                                    type="number"
                                    name="amount"
                                    value={edited.amount}
                                    onChange={onEditChange}
                                    required
                                />
                                <span> 원 </span>
                            </td>
                        </tr>
                        <tr className="addAssetFormTableTbodyTr">
                            <td className="addAssetFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">과세기준일</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="assetTaxBaseDateInput"
                                    type="date"
                                    name="taxBaseDate"
                                    value={edited.taxBaseDate}
                                    onChange={onEditChange}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="modifyButtonWrapper">
                    <CloseCircleOutlined
                        onClick={onCancel}
                        className="cancelIcon"
                    />
                    <CheckCircleOutlined
                        onClick={onSubmitEdit}
                        className="submitIcon"
                    />
                </div>
            </form>
        </div>
    );
};

export default Modify;
