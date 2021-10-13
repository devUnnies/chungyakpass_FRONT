import React, { useEffect, useState } from 'react';
import { ReactDOM } from 'react';
import NewWindow from 'react-new-window';
import List from './AssetsWindow/List';
import PopupDom from '../AddHouseHolder/PopupDom';
import PopupPostCode from '../AddHouseHolder/PopupPostCode';
import MainButton from '../../components/Button/MainButton';
import './Addmember.css';
import { QuestionCircleOutlined } from '@ant-design/icons';
import MonthAverageIncomeTable from './MonthAverageIncomeTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    addHouse,
    addBank,
    addMem,
} from '../../store/actions/commonInfoAction';

const Post = ({ onSaveData, houseId, setHouseId, members }) => {
    const history = useHistory();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isTableOpen, setIsTableOpen] = useState(false);
    const [failMsg, setFailMsg] = useState(null);
    const [fullAddress, setFullAddress] = useState();
    const [postcode, setPostcode] = useState('');
    const [haveAssets, setHaveAssets] = useState();
    const [haveHistory, setHaveHistory] = useState();
    const [haveLimit, setHaveLimit] = useState();

    const [close, setClose] = useState(false);
    const [assets, setAssets] = useState([]);

    const commonInfoStore = useSelector((state) => state.commonInfo);

    const [memberId, setMemberId] = useState();

    const [address, setAddress] = useState({
        sido: '',
        sigungu: '',
        detail: '',
        postcode: '',
    });

    const [form, setForm] = useState({
        name: '',
        birthDate: '',
        account: [],
        foreignerYn: '',
        homelessStartDate: '',
        relationship: '',
        householderYn: '',
        spouseYn: 'n',
        spouseAddress: '',
        spousePostcode: '',
        spouseLive: 'base',
        soldierYn: '',
        isMarried: false,
        marriedDate: '',
        transferDate: '',
        income: '0',
        assets: [],
        histories: [],
        limits: [],
    });

    const [account, setAccount] = useState({
        bank: '',
        bankbook: '',
        joinDate: '',
        deposit: 0,
        paymentsCount: 0,
        validYn: '',
    });

    const [historyArr, setHistoryArr] = useState({
        houseName: '',
        supply: '',
        specialSupply: '',
        housingType: '',
        ranking: '',
        result: '',
        preliminaryNumber: '',
        winningDate: '',
        raffle: '',
        cancelYn: '',
        ineligibleYn: '',
        ineligibleDate: '',
    });

    const [limitArr, setLimitArr] = useState({
        reWinningRestrictedDate: '',
        specialSupplyRestrictedYn: '',
        unqualifiedSubscriberRestrictedDate: '',
        requlatedAreaFirstPriorityRestrictedDate: '',
        additionalPointSystemRestrictedDate: '',
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setAddress({
            ...address,
            sido: form.spouseAddress?.split(' ')[0],
            sigungu:
                form.spouseAddress?.split(' ')[0] === '세종특별자치시'
                    ? form.spouseAddress?.split(' ')[0]
                    : form.spouseAddress?.split(' ')[1],
            detail:
                // 제주도 일 경우
                form.spouseAddress?.split(' ')[0] === '제주특별자치도'
                    ? // 제주도인데 서귀포시 일 경우
                      form.spouseAddress?.split(' ')[1]?.length === 4
                        ? form.spouseAddress?.substring(13)
                        : // 제주도인데 제주시 일 경우
                        form.spouseAddress?.split(' ')[1]?.length === 3
                        ? form.spouseAddress?.substring(12)
                        : null
                    : // 세종특별자치시 일 경우
                    form.spouseAddress?.split(' ')[0] === '세종특별자치시'
                    ? form.spouseAddress?.substring(8)
                    : form.spouseAddress?.split(' ')[1]?.length === 2
                    ? form.spouseAddress?.substring(6)
                    : form.spouseAddress?.split(' ')[1]?.length === 3
                    ? form.spouseAddress?.substring(7)
                    : form.spouseAddress?.split(' ')[1]?.length === 4
                    ? form.spouseAddress?.substring(8)
                    : null,
        });
    }, [form.spouseAddress]);

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

    const getStartDate = (date) => {
        setForm({ ...form, homelessStartDate: date });
    };

    const getCloseValue = (close) => {
        setClose(close);
    };

    const getAssetsValue = (assets) => {
        setAssets(assets);
    };

    const isAssetsWindow = () => {
        if (haveAssets === 'y') setClose(false);
    };

    useEffect(() => isAssetsWindow, [haveAssets]);

    // 자산 창 열기 !!
    const AssetsWindow = () => {
        if (close) return;
        return (
            <NewWindow
                name="assetsList"
                title="자산 정보 목록 - 청약패스(chungyakpass.co.kr)"
                center="screen"
                onBlock={() => {}}
            >
                <List
                    getCloseValue={getCloseValue}
                    getAssetsValue={getAssetsValue}
                    getStartDate={getStartDate}
                    assets={form.assets}
                    birthDate={form.birthDate}
                    ineligibleDate={historyArr.ineligibleDate}
                />
            </NewWindow>
        );
    };

    useEffect(() => {
        setHouseId({
            ...houseId,
            my: commonInfoStore?.addHouse.data?.houseId,
        });
    }, []);

    useEffect(() => {
        setHouseId({
            ...houseId,
            spouse: commonInfoStore?.addHouse.data?.houseId,
        });
    }, [commonInfoStore.addHouse?.data]);

    useEffect(() => {
        setMemberId(commonInfoStore?.addMem.data?.memberId);

        // 세대주 등록
        if (form.householderYn === 'y') {
            let userForm = {
                memberId: memberId,
                houseId: null,
            };
            if (form.spouseYn === 'n' && form.spouseLive === 'base') {
                userForm = {
                    ...userForm,
                    houseId: houseId.my,
                };

                console.log(
                    '본인 세대 세대주 등록 !!! ' + JSON.stringify(userForm)
                );
            } else if (form.spouseYn === 'y' && form.spouseLive === 'spouse') {
                userForm = {
                    ...userForm,
                    houseId: houseId.spouse,
                };

                console.log(
                    '배우자 분리 세대 세대주 등록 !!! ' +
                        JSON.stringify(userForm)
                );
            }
        }

        // 2명 이상 등록 할 수 없는 경우 !
    }, [commonInfoStore?.addMem.data]);

    // 세대 구성원 등록하는 api 연결 예정
    const onSubmit = (e) => {
        e.preventDefault();

        if (failMsg === null) {
            if (form.relationship === '본인') form.account.push(account);
            if (haveHistory === 'y') form.histories.push(historyArr);
            if (haveLimit === 'y') form.limits.push(limitArr);

            if (form.spouseYn === 'y') {
                // 세대 등록 !!!
                const userAddress = {
                    spouseHouseYn: 'y',
                    addressLevel1: address?.sido.slice(0, 2),
                    addressLevel2: address?.sigungu,
                    addressDetail: address?.detail,
                    zipcode: address?.postcode,
                };
                console.log('분리세대 등록 !!!' + userAddress);
                // dispatch(addHouse(userAddress));
            }

            // 세대구성원 등록
            if (form.relationship === '본인') {
                // 본인일 경우 청약통장 등록
                // dispatch(addBank(form.account[0]));
                const userForm = {
                    houseId: houseId.my,
                    relation: form.relationship,
                    name: form.name,
                    birthDay: form.birthDate,
                    foreignerYn: form.foreignerYn,
                    soldierYn: form.soldierYn,
                    marriageDate:
                        form.isMarried === 'y' ? form.marriedDate : null,
                    homelessStartDate: form.homelessStartDate,
                    transferDate: form.transferDate,
                    income: form.income,
                };

                console.log('본인 !!!!!! ' + JSON.stringify(userForm));
                // dispatch(addMem(userForm));
            } else {
                const userForm = {
                    houseId: houseId.spouse,
                    relation: form.relationship,
                    name: form.name,
                    birthDay: form.birthDate,
                    foreignerYn: form.foreignerYn,
                    soldierYn: form.soldierYn,
                    marriageDate:
                        form.isMarried === 'y' ? form.marriedDate : null,
                    homelessStartDate: form.homelessStartDate,
                    transferDate: form.transferDate,
                    income: form.income,
                };

                console.log(
                    '본인 이외의 구성원 !!!! ' + JSON.stringify(userForm)
                );
                // dispatch(addMem(userForm));
            }

            // 세대구성원 자산 등록
            const assetsForm = assets.map((content, i) => {
                return { ...content, houseMemberId: memberId };
            });

            console.log('자산 !!! ' + JSON.stringify(assetsForm));

            onSaveData(form);
            setForm({
                name: '',
                birthDate: '',
                account: [],
                foreignerYn: '',
                homelessStartDate: '',
                relationship: '',
                householderYn: '',
                spouseYn: '',
                spousePostcode: '',
                spouseAddress: '',
                soldierYn: '',
                isMarried: false,
                marriedDate: '',
                transferDate: '',
                income: '',
                assets: [],
                histories: [],
                limits: [],
            });
        } else {
            alert('부적격 받은 사례가 있는 항목을 선택하셨습니다.');
        }
    };

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
        console.log(form.homelessStartDate);
        if (
            account.validYn === 'n' ||
            haveHistory === 'exist' ||
            limitArr.specialSupplyRestrictedYn === '청약불가' ||
            (form.homelessStartDate &&
                Number(new Date(form.birthDate)) >
                    Number(new Date(form.homelessStartDate)))
        ) {
            setFailMsg('!!');
        } else {
            setFailMsg(null);
        }
    }, [form]);

    useEffect(() => {
        if (form.relationship !== '본인') {
            setAccount({
                ...account,
                bank: '',
                bankbook: '',
                joinDate: '',
                deposit: 0,
                paymentsCount: 0,
                validYn: '',
            });

            setForm({
                ...form,
                soldierYn: 'n',
            });
        } else {
            return form.spouseYn === 'y'
                ? alert('회원은 배우자 분리세대에 속할 수 없습니다 !')
                : null;
        }
    }, [form.relationship]);

    useEffect(() => {
        if (haveLimit === 'n') {
            setLimitArr({
                ...limitArr,
                reWinningRestrictedDate: '',
                specialSupplyRestrictedYn: '',
                unqualifiedSubscriberRestrictedDate: '',
                requlatedAreaFirstPriorityRestrictedDate: '',
                additionalPointSystemRestrictedDate: '',
            });
        }
    }, [haveLimit]);

    useEffect(() => {
        if (haveHistory === 'n') {
            setHistoryArr({
                ...historyArr,
                houseName: '',
                supply: '',
                specialSupply: '',
                housingType: '',
                ranking: '',
                result: '',
                preliminaryNumber: '',
                winningDate: '',
                raffle: '',
                cancelYn: '',
            });
        }
    }, [haveHistory]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const onAccountChange = (e) => {
        const { name, value } = e.target;
        setAccount({
            ...account,
            [name]: value,
        });
    };

    const onHistoryArrChange = (e) => {
        const { name, value } = e.target;
        setHistoryArr({
            ...historyArr,
            [name]: value,
        });
    };

    const onLimitArrChange = (e) => {
        const { name, value } = e.target;
        setLimitArr({
            ...limitArr,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (failMsg === null) {
            if (form.relationship === '본인') form.account.push(account);

            if (haveHistory === 'y') form.histories.push(historyArr);
            if (haveLimit === 'y') form.limits.push(limitArr);
            onSaveData(form);
            setForm({
                name: '',
                birthDate: '',
                account: [],
                foreignerYn: '',
                homelessStartDate: '',
                relationship: '',
                householderYn: '',
                spouseYn: '',
                spousePostcode: '',
                spouseAddress: '',
                soldierYn: '',
                isMarried: false,
                marriedDate: '',
                transferDate: '',
                income: '',
                assets: [],
                histories: [],
                limits: [],
            });
        } else {
            alert('부적격 받은 사례가 있는 항목을 선택하셨습니다.');
        }
    };

    return (
        <>
            <div id="addMember" className="addMemberFormContainer">
                <form
                    onSubmit={handleSubmit}
                    className="addMemberForm"
                    name="allInfo"
                >
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
                                        <option value="모">모</option>
                                        <option value="부">부</option>
                                        <option value="자녀_일반">
                                            자녀_일반
                                        </option>
                                        <option value="자녀_태아">
                                            자녀_태아
                                        </option>
                                        <option value="배우자의 모">
                                            배우자의 모
                                        </option>
                                        <option value="배우자의 부">
                                            배우자의 부
                                        </option>
                                        <option value="자녀의 배우자">
                                            자녀의 배우자
                                        </option>
                                        <option value="조모">조모</option>
                                        <option value="조부">조부</option>
                                        <option value="손자녀">손자녀</option>
                                        <option value="손자녀의 배우자">
                                            손자녀의 배우자
                                        </option>
                                        <option value="배우자의 조모">
                                            배우자의 조모
                                        </option>
                                        <option value="배우자의 조부">
                                            배우자의 조부
                                        </option>
                                    </select>
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError"></td>
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
                            {form.relationship === '배우자' &&
                            form.spouseYn === 'y' ? (
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
                                    <span className="subTitle">세대 거주</span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="isSoldierInput"
                                        type="radio"
                                        name="spouseLive"
                                        onChange={onChange}
                                        value="base"
                                        checked={
                                            form.spouseLive === 'base'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="isSoldierInputText">
                                        신청자 본인 세대에 거주
                                    </span>
                                    <input
                                        className="isSoldierInput"
                                        type="radio"
                                        name="spouseLive"
                                        onChange={onChange}
                                        value="spouse"
                                        checked={
                                            form.spouseLive === 'spouse'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="isSoldierInputText">
                                        신청자의 배우자 분리세대에 거주
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

                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        무주택시작일
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="homelessStartDateInput"
                                        type="input"
                                        name="homelessStartDate"
                                        value={
                                            form.homelessStartDate
                                                ? form.homelessStartDate
                                                : '0000-00-00'
                                        }
                                        onChange={onChange}
                                        disabled
                                    />
                                </td>
                                <td>
                                    {Number(new Date(form.birthDate)) >
                                    Number(new Date(form.homelessStartDate)) ? (
                                        <span className="failMsg">
                                            {failMsg}
                                        </span>
                                    ) : null}
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
                                            value={account.bank}
                                            onChange={onAccountChange}
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
                                            value={account.bankbook}
                                            onChange={onAccountChange}
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
                                            value={account.joinDate}
                                            onChange={onAccountChange}
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
                                            value={account.deposit}
                                            onChange={onAccountChange}
                                        />
                                        <span> 원</span>
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
                                            value={account.paymentsCount}
                                            onChange={onAccountChange}
                                        />
                                        <span> 회</span>
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
                                            onChange={onAccountChange}
                                            value="y"
                                            checked={
                                                account.validYn === 'y'
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
                                            onChange={onAccountChange}
                                            value="n"
                                            checked={
                                                account.validYn === 'n'
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
                                        {account.validYn === 'n' ? (
                                            <div>
                                                <span className="failMsg">
                                                    {failMsg}
                                                </span>
                                            </div>
                                        ) : null}
                                    </td>
                                </tr>
                            ) : null}

                            {/* {Number(assetsCount) >= 2
                                ? addAssets(assetsCount)
                                : null} */}
                            {form.relationship === '본인' ? (
                                <tr className="addMemberFormTableTbodyTrSpace"></tr>
                            ) : null}

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
                                        name="haveHistory"
                                        onChange={(e) => {
                                            setHaveHistory(e.target.value);
                                        }}
                                        value="y"
                                        checked={
                                            haveHistory === 'y' ? true : false
                                        }
                                        required
                                    />{' '}
                                    <span className="historyInputText">
                                        있음
                                    </span>
                                    <input
                                        className="historyInput"
                                        type="radio"
                                        name="haveHistory"
                                        onChange={(e) => {
                                            setHaveHistory(e.target.value);
                                        }}
                                        value="n"
                                        checked={
                                            haveHistory === 'n' ? true : false
                                        }
                                        required
                                    />
                                    <span className="historyInputText">
                                        없음
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError">
                                    {haveHistory === 'y' ? (
                                        <span className="failMsg">
                                            {failMsg}
                                        </span>
                                    ) : null}
                                </td>
                            </tr>
                            {haveHistory === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">주택명</span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="houseNameInput"
                                            type="text"
                                            name="houseName"
                                            value={historyArr.houseName}
                                            onChange={onHistoryArrChange}
                                        />
                                    </td>
                                </tr>
                            ) : null}
                            {haveHistory === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            공급유형
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <select
                                            className="supplySelect"
                                            name="supply"
                                            value={historyArr.supply}
                                            onChange={onHistoryArrChange}
                                        >
                                            <option value="">
                                                {' '}
                                                ---선택---{' '}
                                            </option>
                                            <option value="일반공급">
                                                일반공급
                                            </option>
                                            <option value="특별공급">
                                                특별공급
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ) : null}
                            {haveHistory === 'y' &&
                            historyArr.supply === '특별공급' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            세부유형
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <select
                                            className="specialSupplySelect"
                                            name="spercialSupply"
                                            value={historyArr.specialSupply}
                                            onChange={onHistoryArrChange}
                                        >
                                            <option value="">
                                                {' '}
                                                ---선택---{' '}
                                            </option>
                                            <option value="다자녀가구">
                                                다자녀가구
                                            </option>
                                            <option value="신혼부부">
                                                신혼부부
                                            </option>
                                            <option value="생애최초">
                                                생애최초
                                            </option>
                                            <option value="노부모부양">
                                                노부모부양
                                            </option>
                                            <option value="기관추천">
                                                기관추천
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ) : null}
                            {haveHistory === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">주택형</span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="houseTypeInput"
                                            type="text"
                                            name="housingType"
                                            value={historyArr.housingType}
                                            onChange={onHistoryArrChange}
                                        />
                                    </td>
                                </tr>
                            ) : null}
                            {haveHistory === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">순위</span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <select
                                            className="rankingSelect"
                                            name="ranking"
                                            value={historyArr.ranking}
                                            onChange={onHistoryArrChange}
                                        >
                                            <option value="">
                                                {' '}
                                                ---선택---{' '}
                                            </option>
                                            <option value="일순위">
                                                일순위
                                            </option>
                                            <option value="이순위">
                                                이순위
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ) : null}
                            {haveHistory === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            당첨결과
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <select
                                            className="resultSelect"
                                            name="result"
                                            value={historyArr.result}
                                            onChange={onHistoryArrChange}
                                        >
                                            <option value="">
                                                {' '}
                                                ---선택---{' '}
                                            </option>
                                            <option value="당첨">당첨</option>
                                            <option value="미당첨">
                                                미당첨
                                            </option>
                                            <option value="예비당첨">
                                                예비당첨
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ) : null}
                            {haveHistory === 'y' &&
                            historyArr.result === '예비당첨' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            예비번호
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="houseTypeInput"
                                            type="text"
                                            name="preliminaryNumber"
                                            value={historyArr.preliminaryNumber}
                                            onChange={onHistoryArrChange}
                                        />
                                    </td>
                                </tr>
                            ) : null}
                            {haveHistory === 'y' &&
                            historyArr.result === '당첨' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">당첨일</span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="houseTypeInput"
                                            type="date"
                                            name="winningDate"
                                            value={historyArr.winningDate}
                                            onChange={onHistoryArrChange}
                                        />
                                    </td>
                                </tr>
                            ) : null}
                            {haveHistory === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            추첨방식
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <select
                                            className="resultSelect"
                                            name="raffle"
                                            value={historyArr.raffle}
                                            onChange={onHistoryArrChange}
                                        >
                                            <option value="">
                                                {' '}
                                                ---선택---{' '}
                                            </option>
                                            <option value="가점제">
                                                가점제
                                            </option>
                                            <option value="추첨제">
                                                추첨제
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ) : null}
                            {historyArr.result === '당첨' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            부적격여부
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="cancelYnInput"
                                            type="radio"
                                            name="ineligibleYn"
                                            onChange={onHistoryArrChange}
                                            value="y"
                                            checked={
                                                historyArr.ineligibleYn === 'y'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />{' '}
                                        <span className="historyInputText">
                                            부적격
                                        </span>
                                        <input
                                            className="cancelYnInput"
                                            type="radio"
                                            name="ineligibleYn"
                                            onChange={onHistoryArrChange}
                                            value="n"
                                            checked={
                                                historyArr.ineligibleYn === 'n'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />
                                        <span className="historyInputText">
                                            부적격 아님
                                        </span>
                                    </td>
                                </tr>
                            ) : null}
                            {historyArr.ineligibleYn === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            부적격통보날짜
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="cancelYnInput"
                                            type="date"
                                            name="ineligibleDate"
                                            onChange={onHistoryArrChange}
                                            value={historyArr.ineligibleDate}
                                            required
                                        />
                                    </td>
                                </tr>
                            ) : null}
                            {haveHistory === 'y' &&
                            (historyArr.result === '당첨' ||
                                historyArr.result === '예비당첨') ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            당첨취소
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="cancelYnInput"
                                            type="radio"
                                            name="cancelYn"
                                            onChange={onHistoryArrChange}
                                            value="y"
                                            checked={
                                                historyArr.cancelYn === 'y'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />{' '}
                                        <span className="historyInputText">
                                            취소
                                        </span>
                                        <input
                                            className="cancelYnInput"
                                            type="radio"
                                            name="cancelYn"
                                            onChange={onHistoryArrChange}
                                            value="n"
                                            checked={
                                                historyArr.cancelYn === 'n'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />
                                        <span className="historyInputText">
                                            유지
                                        </span>
                                    </td>
                                </tr>
                            ) : null}

                            <tr className="addMemberFormTableTbodyTrSpace"></tr>

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
                                        onChange={(e) => {
                                            setHaveAssets(e.target.value);
                                        }}
                                        value="y"
                                        checked={
                                            haveAssets === 'y' ? true : false
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
                                        onChange={(e) => {
                                            setHaveAssets(e.target.value);
                                        }}
                                        value="n"
                                        checked={
                                            haveAssets === 'n' ? true : false
                                        }
                                        required
                                    />
                                    <span className="assetHaveAssetsInputText">
                                        없습니다
                                    </span>
                                </td>
                            </tr>
                            {haveAssets === 'y' ? AssetsWindow() : null}
                            <tr className="addMemberFormTableTbodyTrSpace"></tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td colSpan="3">
                                    <div className="normalTitleContainer">
                                        <span className="normalTitle">
                                            청약 제한 사항
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        청약 제한 사항
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="limitInput"
                                        type="radio"
                                        name="haveLimit"
                                        onChange={(e) => {
                                            setHaveLimit(e.target.value);
                                        }}
                                        value="y"
                                        checked={
                                            haveLimit === 'y' ? true : false
                                        }
                                        required
                                    />{' '}
                                    <span className="limitInputText">있음</span>
                                    <input
                                        className="limitInput"
                                        type="radio"
                                        name="haveLimit"
                                        onChange={(e) => {
                                            setHaveLimit(e.target.value);
                                        }}
                                        value="n"
                                        checked={
                                            haveLimit === 'n' ? true : false
                                        }
                                        required
                                    />{' '}
                                    <span className="limitInputText">없음</span>
                                </td>
                            </tr>
                            {haveLimit === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            재당첨제한
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="reWinDateInput"
                                            type="date"
                                            name="reWinningRestrictedDate"
                                            value={
                                                limitArr.reWinningRestrictedDate
                                            }
                                            onChange={onLimitArrChange}
                                        />
                                    </td>
                                </tr>
                            ) : null}
                            {haveLimit === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            특별공급제한
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="limitInput"
                                            type="radio"
                                            name="specialSupplyRestrictedYn"
                                            onChange={onLimitArrChange}
                                            value="청약불가"
                                            checked={
                                                limitArr.specialSupplyRestrictedYn ===
                                                '청약불가'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />{' '}
                                        <span className="limitInputText">
                                            청약불가
                                        </span>
                                        <input
                                            className="limitInput"
                                            type="radio"
                                            name="specialSupplyRestrictedYn"
                                            onChange={onLimitArrChange}
                                            value="none"
                                            checked={
                                                limitArr.specialSupplyRestrictedYn ===
                                                'none'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />
                                        <span className="limitInputText">
                                            청약가능
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTdError">
                                        {limitArr.specialSupplyRestrictedYn ===
                                        '청약불가' ? (
                                            <span className="failMsg">
                                                {failMsg}
                                            </span>
                                        ) : null}
                                    </td>
                                </tr>
                            ) : null}
                            {haveLimit === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            부적격당첨자제한
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="unSubResDateInput"
                                            type="date"
                                            name="unqualifiedSubscriberRestrictedDate"
                                            value={
                                                limitArr.unqualifiedSubscriberRestrictedDate
                                            }
                                            onChange={onLimitArrChange}
                                        />
                                    </td>
                                </tr>
                            ) : null}
                            {haveLimit === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            투기과열지구
                                            <br />
                                            청약과열지구
                                            <br />
                                            1순위제한
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="reAreaFirPriRestDateInput"
                                            type="date"
                                            name="requlatedAreaFirstPriorityRestrictedDate"
                                            value={
                                                limitArr.requlatedAreaFirstPriorityRestrictedDate
                                            }
                                            onChange={onLimitArrChange}
                                        />
                                    </td>
                                </tr>
                            ) : null}
                            {haveLimit === 'y' ? (
                                <tr className="addMemberFormTableTbodyTr">
                                    <td className="addMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            가점제당첨제한
                                        </span>
                                    </td>
                                    <td className="addMemberFormTableTbodyTrTd">
                                        <input
                                            className="addPointSysRestDateInput"
                                            type="date"
                                            name="additionalPointSystemRestrictedDate"
                                            value={
                                                limitArr.additionalPointSystemRestrictedDate
                                            }
                                            onChange={onLimitArrChange}
                                        />
                                    </td>
                                </tr>
                            ) : null}
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
