import React, { useEffect, useState } from 'react';
import PopupDom from '../AddHouseHolder/PopupDom';
import PopupPostCode from '../AddHouseHolder/PopupPostCode';
import MainButton from '../../components/Button/MainButton';
import './Addmember.css';
import { QuestionCircleOutlined } from '@ant-design/icons';
import MonthAverageIncomeTable from './MonthAverageIncomeTable';
import { useHistory } from 'react-router-dom';

const Post = ({ onSaveData }) => {
    const history = useHistory();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isTableOpen, setIsTableOpen] = useState(false);
    const [failMsg, setFailMsg] = useState(null);
    const [fullAddress, setFullAddress] = useState();
    const [postcode, setPostcode] = useState('');

    const [address, setAddress] = useState({
        sido: '',
        sigungu: '',
        detail: '',
        postcode: '',
    });

    const [form, setForm] = useState({
        name: '',
        birthDate: '',
        bank: '',
        bankbook: '',
        joinDate: '',
        deposit: 0,
        paymentsCount: 0,
        validYn: '',
        foreignerYn: '',
        homelessStartDate: '',
        relationship: '',
        householderYn: '',
        spouseYn: '',
        spouseAddress: '',
        spousePostcode: '',
        soldierYn: '',
        homelessStartDate: '',
        isMarried: false,
        marriedDate: '',
        transferDate: '',
        income: '',
        assets: [],
        history: '',
    });

    const onAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value,
        });
    };

    const openPostCode = () => {
        setIsPopupOpen(true);
    };

    const closePostCode = () => {
        setIsPopupOpen(false);
    };

    // 세대 등록하는 api 연결 예정
    const onSubmit = () => {};

    useEffect(() => {
        setAddress({
            ...address,
            detail: fullAddress,
        });
    }, [fullAddress]);

    useEffect(() => {
        setAddress({
            ...address,
            postcode: postcode,
        });
    }, [postcode]);

    useEffect(() => {
        setForm({
            ...form,
            spousePostcode: postcode,
            spouseAddress: fullAddress,
        });
    }, [fullAddress, postcode]);

    useEffect(() => {
        if (form.validYn === 'n' || form.history === 'exist') {
            setFailMsg('!!');
        } else {
            setFailMsg(null);
        }
        console.log(failMsg);
    }, [form]);

    const [asset, setAsset] = useState({
        haveAssets: '',
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
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const onAssetChange = (e) => {
        const { name, value } = e.target;
        setAsset({
            ...asset,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (failMsg === null) {
            onSaveData(form);
            form.assets.push(asset);
            setForm({
                name: '',
                birthDate: '',
                bank: '',
                bankbook: '',
                joinDate: '',
                deposit: 0,
                paymentsCount: 0,
                validYn: '',
                foreignerYn: '',
                homelessStartDate: '',
                relationship: '',
                householderYn: '',
                spouseYn: '',
                spousePostcode: '',
                spouseAddress: '',
                soldierYn: '',
                homelessStartDate: '',
                isMarried: false,
                marriedDate: '',
                transferDate: '',
                income: '',
                assets: [],
                history: '',
            });
        } else {
            alert('부적격 받은 사례가 있는 항목을 선택하셨습니다.');
        }
    };

    return (
        <>
            <div id="addMember" className="addMemberFormContainer">
                <form onSubmit={handleSubmit} className="addMemberForm">
                    <table className="addMemberFormTable">
                        <tbody className="addMemberFormTableTbody">
                            <tr className="addMemberFormTableTbodyTr">
                                <td colSpan="2">
                                    <div className="normalTitleContainer">
                                        <span className="normalTitle">
                                            기본정보입력
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">이름</span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="nameInput"
                                        name="name"
                                        value={form.name}
                                        onChange={onChange}
                                        required
                                    />
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError"></td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTd"></td>
                                <td className="addMemberFormTableTbodyTrTd"></td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">생년월일</span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="birthdateInput"
                                        type="date"
                                        name="birthDate"
                                        value={form.birthDate}
                                        onChange={onChange}
                                        required
                                    />
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError"></td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        외국인 여부
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="foreignerInput"
                                        type="radio"
                                        name="foreignerYn"
                                        onChange={onChange}
                                        value="y"
                                        checked={
                                            form.foreignerYn === 'y'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="foreignerInputText">
                                        외국인
                                    </span>
                                    <input
                                        className="foreignerInput"
                                        type="radio"
                                        name="foreignerYn"
                                        onChange={onChange}
                                        value="n"
                                        checked={
                                            form.foreignerYn === 'n'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="foreignerInputText">
                                        내국인
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError"></td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTrSpace"></tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td colSpan="3">
                                    <div className="normalTitleContainer">
                                        <span className="normalTitle">
                                            구성원 관계 정보 입력
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        신청자와의 관계
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <select
                                        className="relationshipSelect"
                                        name="relationship"
                                        value={form.relationship}
                                        onChange={onChange}
                                        required
                                    >
                                        <option value=""> ---선택--- </option>
                                        <option value="본인">본인</option>
                                        <option value="배우자">배우자</option>
                                        <option value="부모">부모</option>
                                        <option value="자녀">자녀</option>
                                        <option value="배우자의 부모">
                                            배우자의 부모
                                        </option>
                                        <option value="자녀의 배우자">
                                            자녀의 배우자
                                        </option>
                                        <option value="조부모">조부모</option>
                                        <option value="손자녀">손자녀</option>
                                        <option value="배우자의 조부모">
                                            배우자의 조부모
                                        </option>
                                        <option value="손자녀의 배우자">
                                            손자녀의 배우자
                                        </option>
                                    </select>
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError"></td>
                            </tr>
                            {form.relationship === '본인' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            장기복무 여부
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="isSoldierInput"
                                            type="radio"
                                            name="soldierYn"
                                            onChange={onChange}
                                            value="y"
                                            checked={
                                                form.soldierYn === 'y'
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <span className="isSoldierInputText">
                                            예
                                        </span>
                                        <input
                                            className="isSoldierInput"
                                            type="radio"
                                            name="soldierYn"
                                            onChange={onChange}
                                            value="n"
                                            checked={
                                                form.soldierYn === 'n'
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <span className="isSoldierInputText">
                                            아니오
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTdError">
                                        {/* {form.soldierYn === 'n' ? (
                                            <span className="failMsg">
                                                {failMsg}
                                            </span>
                                        ) : null} */}
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTdError"></td>
                                </tr>
                            ) : null}
                            {form.relationship === '배우자' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            배우자 분리세대 여부
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="isSpouseInput"
                                            type="radio"
                                            name="spouseYn"
                                            onChange={onChange}
                                            value="y"
                                            checked={
                                                form.spouseYn === 'y'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />
                                        <span className="isSpouseInputText">
                                            예
                                        </span>
                                        <input
                                            className="isSpouseInput"
                                            type="radio"
                                            name="spouseYn"
                                            onChange={onChange}
                                            value="n"
                                            checked={
                                                form.spouseYn === 'n'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />
                                        <span className="isSpouseInputText">
                                            아니오
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTdError"></td>
                                </tr>
                            ) : null}
                            {form.spouseYn === 'y' ? (
                                <tr
                                    className="addMemberFormTableTbodyTr"
                                    rowSpan="1"
                                >
                                    <td
                                        className="addMemberFormTableTbodyTrTd"
                                        colSpan="3"
                                    >
                                        <tr className="addMemberFormTableTbodyTrSpouse">
                                            <td colSpan="3">
                                                <div className="normalTitleContainer">
                                                    <span className="normalTitle">
                                                        배우자 분리세대 등록
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="addMemberFormTableTbodyTrSpouseButton">
                                            <td colSpan="3">
                                                <MainButton
                                                    width={80}
                                                    height={30}
                                                    paddingLeft={10}
                                                    onClick={openPostCode}
                                                >
                                                    주소 찾기
                                                </MainButton>
                                            </td>
                                        </tr>
                                        <tr className="addMemberFormTableTbodyTrSpouse">
                                            <td
                                                className="addMemberFormTableTbodyTrTdSpouse"
                                                colSpan="3"
                                            >
                                                <div
                                                    id="popupDom"
                                                    className="spousePopupDomContainer"
                                                >
                                                    {isPopupOpen && (
                                                        <PopupDom>
                                                            <PopupPostCode
                                                                address={
                                                                    fullAddress
                                                                }
                                                                setAddress={
                                                                    setFullAddress
                                                                }
                                                                postcode={
                                                                    postcode
                                                                }
                                                                setPostcode={
                                                                    setPostcode
                                                                }
                                                                onClose={
                                                                    closePostCode
                                                                }
                                                            />
                                                        </PopupDom>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="addMemberFormTableTbodyTr">
                                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                                <span className="subTitle">
                                                    우편번호
                                                </span>
                                            </td>
                                            <td className="addMemberFormTableTbodyTrTd">
                                                <input
                                                    className="postcodeInput"
                                                    type="number"
                                                    name="postcode"
                                                    value={form.spousePostcode}
                                                    onChange={onChange}
                                                    readOnly
                                                />
                                            </td>
                                            <td className="addMemberFormTableTbodyTrTdError"></td>
                                        </tr>
                                        <tr className="addMemberFormTableTbodyTr">
                                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                                <span className="subTitle">
                                                    주소
                                                </span>
                                            </td>
                                            <td className="addMemberFormTableTbodyTrTd">
                                                <input
                                                    className="addressInput"
                                                    type="text"
                                                    name="address"
                                                    value={form.spouseAddress}
                                                    onChange={onChange}
                                                />
                                            </td>
                                            <td className="addMemberFormTableTbodyTrTdError"></td>
                                        </tr>
                                    </td>
                                </tr>
                            ) : null}
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        무주택시작일
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="homelessStartDateInput"
                                        type="date"
                                        name="homelessStartDate"
                                        value={form.homelessStartDate}
                                        onChange={onChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">전입신고일</span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="transferDateInput"
                                        type="date"
                                        name="transferDate"
                                        value={form.transferDate}
                                        onChange={onChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        세대주 여부
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="householderInput"
                                        type="radio"
                                        name="householderYn"
                                        onChange={onChange}
                                        value="y"
                                        checked={
                                            form.householderYn === 'y'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="householderInputText">
                                        세대주이다
                                    </span>
                                    <input
                                        className="householderInput"
                                        type="radio"
                                        name="householderYn"
                                        onChange={onChange}
                                        value="n"
                                        checked={
                                            form.householderYn === 'n'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="householderInputText">
                                        세대주가 아니다
                                    </span>
                                </td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">혼인 여부</span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    {' '}
                                    <input
                                        className="isMarriedInput"
                                        type="radio"
                                        name="isMarried"
                                        onChange={onChange}
                                        value="n"
                                        checked={
                                            form.isMarried === 'n'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="isMarriedInputText">
                                        결혼한 상태가 아닙니다
                                    </span>
                                    <input
                                        className="isMarriedInput"
                                        type="radio"
                                        name="isMarried"
                                        onChange={onChange}
                                        value="y"
                                        checked={
                                            form.isMarried === 'y'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="isMarriedInputText">
                                        결혼한 상태입니다
                                    </span>
                                </td>
                            </tr>
                            {form.isMarried === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            혼인신고일
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="marriedDateInput"
                                            type="date"
                                            name="marriedDate"
                                            value={form.marriedDate}
                                            onChange={onChange}
                                        />
                                    </td>
                                </tr>
                            ) : null}
                            <tr className="addMemberFormTableTbodyTrSpace"></tr>
                            {form.relationship === '본인' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td colSpan="2">
                                        <div className="normalTitleContainer">
                                            <span className="normalTitle">
                                                청약통장
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ) : null}
                            {form.relationship === '본인' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            개설은행
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <select
                                            className="bankSelect"
                                            name="bank"
                                            value={form.bank}
                                            onChange={onChange}
                                        >
                                            <option value="">
                                                {' '}
                                                ---선택---{' '}
                                            </option>
                                            <option value="국민">국민</option>
                                            <option value="기업">기업</option>
                                            <option value="농협">농협</option>
                                            <option value="신한">신한</option>
                                            <option value="우리">우리</option>
                                            <option value="하나">하나</option>
                                        </select>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTdError"></td>
                                </tr>
                            ) : null}
                            {form.relationship === '본인' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            청약통장종류
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <select
                                            className="bankbookSelect"
                                            name="bankbook"
                                            value={form.bankbook}
                                            onChange={onChange}
                                            required
                                        >
                                            <option value="">
                                                {' '}
                                                ---선택---{' '}
                                            </option>
                                            <option value="주택청약종합저축">
                                                주택청약종합저축
                                            </option>
                                            <option value="청약저축">
                                                청약저축
                                            </option>
                                            <option value="청약예금">
                                                청약예금
                                            </option>
                                            <option value="청약부금">
                                                청약부금
                                            </option>
                                        </select>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTdError"></td>
                                </tr>
                            ) : null}
                            {form.relationship === '본인' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">가입일</span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="joinDateInput"
                                            type="date"
                                            name="joinDate"
                                            value={form.joinDate}
                                            onChange={onChange}
                                        />
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTdError"></td>
                                </tr>
                            ) : null}
                            {form.relationship === '본인' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            예치금액
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="depositInput"
                                            type="number"
                                            name="deposit"
                                            value={form.deposit}
                                            onChange={onChange}
                                        />
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTdError"></td>
                                </tr>
                            ) : null}
                            {form.relationship === '본인' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            납입횟수
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="paymentsCountInput"
                                            type="number"
                                            name="paymentsCount"
                                            value={form.paymentsCount}
                                            onChange={onChange}
                                        />
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTdError"></td>
                                </tr>
                            ) : null}
                            {form.relationship === '본인' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            유효여부
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="validYnInput"
                                            type="radio"
                                            name="validYn"
                                            onChange={onChange}
                                            value="y"
                                            checked={
                                                form.validYn === 'y'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />
                                        <span className="validYnInputText">
                                            예
                                        </span>
                                        <input
                                            className="validYnInput"
                                            type="radio"
                                            name="validYn"
                                            onChange={onChange}
                                            value="n"
                                            checked={
                                                form.validYn === 'n'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />
                                        <span className="validYnInputText">
                                            아니오
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTdError">
                                        {form.validYn === 'n' ? (
                                            <div>
                                                <span className="failMsg">
                                                    {failMsg}
                                                </span>
                                            </div>
                                        ) : null}
                                    </td>
                                </tr>
                            ) : null}
                            {form.relationship === '본인' ? (
                                <tr className="addMemberFormTableTbodyTrSpace"></tr>
                            ) : null}
                            <tr className="addMemberFormTableTbodyTr">
                                <td colSpan="3">
                                    <div className="normalTitleContainer">
                                        <span className="normalTitle">
                                            자산 등록
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        월 평균 소득
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="incomeInput"
                                        type="number"
                                        name="income"
                                        onChange={onChange}
                                        value={form.income}
                                        required
                                    />
                                    <span className="incomeUnitText">원</span>
                                    <QuestionCircleOutlined
                                        className="incomeUnitIcon"
                                        onClick={() => {
                                            setIsTableOpen(!isTableOpen);
                                        }}
                                    />
                                    {isTableOpen && (
                                        <div className="incomeTableContainer">
                                            <MonthAverageIncomeTable />
                                        </div>
                                    )}
                                </td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">자산여부</span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="assetHaveAssetsInput"
                                        type="radio"
                                        name="haveAssets"
                                        onChange={onAssetChange}
                                        value="y"
                                        checked={
                                            asset.haveAssets === 'y'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="assetHaveAssetsInputText">
                                        있습니다
                                    </span>
                                    <input
                                        className="assetHaveAssetsInput"
                                        type="radio"
                                        name="haveAssets"
                                        onChange={onAssetChange}
                                        value="n"
                                        checked={
                                            asset.haveAssets === 'n'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="assetHaveAssetsInputText">
                                        없습니다
                                    </span>
                                </td>
                            </tr>
                            {asset.haveAssets === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            자산유형
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <select
                                            className="assetPropertyInput"
                                            type="number"
                                            name="property"
                                            onChange={onAssetChange}
                                            value={asset.property}
                                            required
                                        >
                                            <option value="">
                                                {' '}
                                                ---선택---{' '}
                                            </option>
                                            <option value="건물">건물</option>
                                            <option value="토지">토지</option>
                                            <option value="자동차">
                                                자동차
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ) : null}
                            {asset.property === '건물' ||
                            asset.property === '토지' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            분양권 여부
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
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
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            주거용 여부
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
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
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            주거용건물유형
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
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
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            비주거용건물유형
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
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
                            {asset.haveAssets === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">취득일</span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
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
                            ) : null}
                            {asset.haveAssets === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">처분일</span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
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
                            ) : null}
                            {asset.property === '건물' ||
                            asset.property === '토지' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            전용면적
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="assetExclusiveAreaInput"
                                            type="number"
                                            name="exclusiveArea"
                                            value={asset.exclusiveArea}
                                            onChange={onAssetChange}
                                            required
                                        />
                                    </td>
                                </tr>
                            ) : null}
                            {asset.haveAssets === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
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
                                    </td>
                                </tr>
                            ) : null}
                            {asset.haveAssets === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            과세기준일
                                        </span>
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
                            ) : null}
                            <tr className="addMemberFormTableTbodyTrSpace"></tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td colSpan="3">
                                    <div className="normalTitleContainer">
                                        <span className="normalTitle">
                                            청약 당첨 이력
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        청약 당첨 이력
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="historyInput"
                                        type="radio"
                                        name="history"
                                        onChange={onChange}
                                        value="exist"
                                        checked={
                                            form.history === 'exist'
                                                ? true
                                                : false
                                        }
                                        required
                                    />{' '}
                                    <span className="historyInputText">
                                        있음
                                    </span>
                                    <input
                                        className="historyInput"
                                        type="radio"
                                        name="history"
                                        onChange={onChange}
                                        value="none"
                                        checked={
                                            form.history === 'none'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="historyInputText">
                                        없음
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError">
                                    {form.history === 'exist' ? (
                                        <span className="failMsg">
                                            {failMsg}
                                        </span>
                                    ) : null}
                                </td>
                            </tr>
                            {/* <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTd"></td>
                                <td className="addMemberFormTableTbodyTrTd"></td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTd"></td>
                                <td className="addMemberFormTableTbodyTrTd"></td>
                            </tr> */}
                        </tbody>
                    </table>

                    <div className="saveButtonContainer">
                        <MainButton
                            type="submit"
                            className="save"
                            width="80"
                            height="30"
                            // onClick={() => {
                            //     history.push('/');
                            // }}
                        >
                            저장
                        </MainButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Post;
