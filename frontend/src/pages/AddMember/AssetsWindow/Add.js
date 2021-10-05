import React, { useState } from 'react';
import MainButton from '../../../components/Button/MainButton';

const Add = ({ onSaveData, birthDate, ineligibleDate }) => {
    const [asset, setAsset] = useState({
        property: '',
        saleRightYn: '',
        residentialBuildingYn: '',
        residentialBuilding: '',
        nonResidentialBuilding: '',
        acquistionDate: '',
        dispositionDate: '',
        exclusiveArea: '',
        amount: '',
        taxBaseDate: '',
        startDate: birthDate,
    });
    const [logicData, setLogicData] = useState({
        isInheritance: '',
        conditionType: '',
    });
    const [isNoStruct, setIsNoStruct] = useState(true);

    const [ineliDate, setIneliDate] = useState(
        new Date(ineligibleDate).getMonth() + 3
    );

    const [failMsg, setFailMsg] = useState(null);

    const logic = () => {
        if (asset.property === '건물') {
            // 3개월 이내 처분한 상속주택인지?
            if (
                logicData.isInheritance === 'y' &&
                new Date(asset.dispositionDate) <= ineliDate
            ) {
                setIsNoStruct(true);
            }
            // 폐가, 무허가 건물, 문화재로 지정된 주택, 미분양된 주택, 사업 목적인지?
            else if (logicData.conditionType !== '') {
                setIsNoStruct(true);
            }
            // 소형 주택인지?
            else if (
                (asset.residentialBuilding === '단독주택' ||
                    asset.residentialBuilding === '공동주택') &&
                Number(asset.exclusiveArea) <= 60
            ) {
                setIsNoStruct(true);
            }

            if (asset.dispositionDate === '') {
                setIsNoStruct(false);
                setAsset({ ...asset, startDate: '' });
            } else {
                setIsNoStruct(false);
                setAsset({ ...asset, startDate: asset.dispositionDate });
            }
        }
    };

    const onAssetChange = (e) => {
        const { name, value } = e.target;
        setAsset({
            ...asset,
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (failMsg === null) {
            onSaveData(asset);

            setAsset({
                property: '',
                saleRightYn: '',
                residentialBuildingYn: '',
                residentialBuilding: '',
                nonResidentialBuilding: '',
                acquistionDate: '',
                dispositionDate: '',
                exclusiveArea: '',
                amount: '',
                taxBaseDate: '',
                startDate: birthDate,
            });
        } else {
            alert('부적격 받은 사례가 있는 항목을 선택하셨습니다.');
        }
    };

    return (
        <>
            <div name="assetsInfo" className="addAssetFormContainer">
                <form
                    name="assetsInfo"
                    onSubmit={handleSubmit}
                    className="addAssetForm"
                    target="assetsInfo"
                >
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
                                        onChange={onAssetChange}
                                        value={asset.property}
                                        required
                                    >
                                        <option value=""> ---선택--- </option>
                                        <option value="건물">건물</option>
                                        <option value="토지">토지</option>
                                        <option value="자동차">자동차</option>
                                    </select>
                                </td>
                            </tr>
                            {asset.property === '건물'
                                ? setIsNoStruct(false)
                                : null}
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
                            {asset.property === '건물' ||
                            asset.property === '토지' ? (
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
                                            onChange={onAssetChange}
                                            value="n"
                                            checked={
                                                asset.saleRightYn === 'n'
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
                                            onChange={onAssetChange}
                                            value="y"
                                            checked={
                                                asset.saleRightYn === 'y'
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
                            {asset.property === '건물' ||
                            asset.property === '토지' ? (
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
                                            onChange={onAssetChange}
                                            value="y"
                                            checked={
                                                asset.residentialBuildingYn ===
                                                'y'
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
                                            onChange={onAssetChange}
                                            value="n"
                                            checked={
                                                asset.residentialBuildingYn ===
                                                'n'
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

                            {asset.property === '건물' &&
                            asset.residentialBuildingYn === 'y' ? (
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
                                            onChange={onAssetChange}
                                            value={asset.residentialBuilding}
                                            required
                                        >
                                            <option value="">
                                                {' '}
                                                ---선택---{' '}
                                            </option>
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
                            ) : asset.property === '건물' &&
                              asset.residentialBuildingYn === 'n' ? (
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
                                            onChange={onAssetChange}
                                            value={asset.nonResidentialBuilding}
                                            required
                                        >
                                            <option value="">
                                                {' '}
                                                ---선택---{' '}
                                            </option>
                                            <option value="건물">건물</option>
                                            <option value="부속토지">
                                                부속토지
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ) : null}
                            {asset.property === '건물' ||
                            (asset.property === '토지' &&
                                asset.residentialBuildingYn === 'y') ? (
                                <tr className="addAssetFormTableTbodyTr">
                                    <td className="addAssetFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            예외 유형
                                        </span>
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
                                            <option value="">
                                                {' '}
                                                ---선택---{' '}
                                            </option>
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
                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">취득일</span>
                                </td>
                                <td className="addAssetFormTableTbodyTrTd">
                                    <input
                                        className="assetAcquistionDateInput"
                                        type="date"
                                        name="acquistionDate"
                                        value={asset.acquistionDate}
                                        onChange={onAssetChange}
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
                                        value={asset.dispositionDate}
                                        onChange={onAssetChange}
                                        required
                                    />
                                </td>
                            </tr>
                            {asset.property === '건물' ||
                            asset.property === '토지' ? (
                                <tr className="addAssetFormTableTbodyTr">
                                    <td className="addAssetFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            전용면적
                                        </span>
                                    </td>
                                    <td className="addAssetFormTableTbodyTrTd">
                                        <input
                                            className="assetExclusiveAreaInput"
                                            type="number"
                                            name="exclusiveArea"
                                            value={asset.exclusiveArea}
                                            onChange={onAssetChange}
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
                                        value={asset.amount}
                                        onChange={onAssetChange}
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
                                        value={asset.taxBaseDate}
                                        onChange={onAssetChange}
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="saveButtonContainer">
                        <MainButton
                            className="save"
                            width="80"
                            height="30"
                            onClick={handleSubmit}
                        >
                            저장
                        </MainButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Add;
