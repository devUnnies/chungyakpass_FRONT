import React, { useEffect, useState } from 'react';
import NewWindow from 'react-new-window';
import PopupDom from '../AddHouseHolder/PopupDom';
import PopupPostCode from '../AddHouseHolder/PopupPostCode';
import MainButton from '../../components/Button/MainButton';
import './Addmember.css';
import List from './AssetsWindow/List';
import {
    QuestionCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import MonthAverageIncomeTable from './MonthAverageIncomeTable';
import {
    modHouse,
    modBank,
    modMem,
    delBank,
    addBank,
} from '../../store/actions/commonInfoAction';
import { useDispatch, useSelector } from 'react-redux';
import { addHouse } from '../../services/api/commonInfoApi';

const Modal = ({
    selectedData,
    handleCancel,
    handleEditSubmit,
    memberId,
    setMemberId,
    houseId,
    setHouseId,
    bankBookId,
    setBankBookId,
    members,
}) => {
    members.map((content, i) => {
        if (content?.name === selectedData.name) {
            return setMemberId(content.id);
        }
    });
    // console.log('member !!!! ' + JSON.stringify(members));
    const [edited, setEdited] = useState(selectedData);
    const [account, setAccount] = useState(selectedData.account[0]);
    const [address, setAddress] = useState(selectedData.spouseAddress);
    const [assets, setAssets] = useState(selectedData.assets);
    const [haveAssets, setHaveAssets] = useState('');
    const [haveHistory, setHaveHistory] = useState('');
    const [haveLimit, setHaveLimit] = useState('');
    const [historyArr, setHistoryArr] = useState(selectedData.histories);
    const [limitArr, setLimitArr] = useState(selectedData.limits);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isTableOpen, setIsTableOpen] = useState(false);
    const [fullAddress, setFullAddress] = useState();
    const [postcode, setPostcode] = useState('');
    const [close, setClose] = useState(false);

    const [failMsg, setFailMsg] = useState('');

    // const dispatch = useDispatch();

    // const commonInfoStore = useSelector((state) => state.commonInfo);

    // useEffect(() => {
    //     if (commonInfoStore.addBank.data) {
    //         setBankBookId(commonInfoStore.addBank.data[0]?.id);
    //     }
    // }, [commonInfoStore.addBank.data]);

    const getStartDate = (date) => {
        setEdited({ ...edited, homelessStartDate: date });
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

    // 자산 창 열기 !!
    const AssetsWindow = () => {
        if (close) return;
        return (
            <NewWindow
                name="assetsList"
                title="자산 정보 목록 - 청약패스(chungyakpass.com)"
                center="screen"
                onBlock={() => {}}
            >
                <List
                    getCloseValue={getCloseValue}
                    getAssetsValue={getAssetsValue}
                    getStartDate={getStartDate}
                    assets={edited.assets}
                    birthDate={edited.birthDate}
                    ineligibleDate={historyArr.ineligibleDate}
                />
            </NewWindow>
        );
    };

    const onCancel = () => {
        handleCancel();
    };

    const openPostCode = () => {
        setIsPopupOpen(true);
    };

    const closePostCode = () => {
        setIsPopupOpen(false);
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

    const onEditChange = (e) => {
        const { name, value } = e.target;
        setEdited({
            ...edited,
            [name]: value,
        });
    };

    // // 만약에 세대등록 리듀서의 데이터가 변하면
    // useEffect(() => {
    //     // 에러 코드가 'DUPLICATE_HOUSE'인지 확인하고
    //     if (commonInfoStore.addHouse.data.code === 'DUPLICATE_HOUSE') {
    //         // 다시 분리세대인지 확인하고
    //         if (edited.spouseYn === 'y') {
    //             // 세대 수정 !!!
    //             const userAddress = {
    //                 houseId: houseId.spouse,
    //                 addressArr: {
    //                     addressLevel1: address?.sido.slice(0, 2),
    //                     addressLevel2: address?.sigungu,
    //                     addressDetail: address?.detail,
    //                     zipcode: address?.postcode,
    //                 },
    //             };
    //             // console.log('분리세대 수정 !!!' + userAddress);
    //             dispatch(modHouse(userAddress));
    //         }
    //     }
    // }, [commonInfoStore.addHouse.data]);

    const onSubmitEdit = (e) => {
        e.preventDefault();
        // if (failMsg === null) {
        //     if (edited.relationship === '본인') edited.account.unshift(account);
        //     if (haveAssets === 'y') edited.assets.unshift(assets);
        //     if (haveHistory === 'y') edited.histories.unshift(historyArr);
        //     if (haveLimit === 'y') edited.limits.unshift(limitArr);

        //     if (edited.spouseYn === 'y') {
        //         // 우선 하우스가 있는지 없는지 판단하지 못하니까 이런 식으로 add 먼저 날려서
        //         const userAddress = {
        //             spouseHouseYn: edited.spouseYn,
        //             addressLevel1: address?.sido.slice(0, 2),
        //             addressLevel2: address?.sigungu,
        //             addressDetail: address?.detail,
        //             zipcode: address?.postcode,
        //         };

        //         dispatch(addHouse(userAddress));
        //     }

        //     // console.log(JSON.stringify(edited));

        //     const userForm = {
        //         memberId: members[edited.id - 1]?.id,
        //         relation: edited.relationship,
        //         name: edited.name,
        //         birthDay: edited.birthDate,
        //         foreignerYn: edited.foreignerYn,
        //         soldierYn: edited.soldierYn,
        //         marriageDate:
        //             edited.isMarried === 'y' ? edited.marriedDate : null,
        //         homelessStartDate: edited.homelessStartDate,
        //         transferDate: edited.transferDate,
        //         income: edited.income,
        //     };

        //     // 세대구성원 등록
        //     // 본인일 경우
        //     if (edited.relationship === '본인') {
        //         // 만약 전달받은 bankBookId가 있으면 이미 통장을 한번 저장했다는 뜻
        //         if (bankBookId) {
        //             const accountForm = {
        //                 ...edited.account[0],
        //                 bankBookId: bankBookId,
        //             };
        //             // 그래서 수정하게
        //             dispatch(modBank(accountForm));
        //         } else {
        //             // 만약에 없으면 통장을 저장하지 않았으므로 addBank 액션으로 저장해주기
        //             dispatch(addBank(edited.account[0]));
        //         }
        //         dispatch(modMem(userForm));
        //     } else {
        //         // 본인 이외의 세대구성원일 경우
        //         // 본인에서 본인 이외의 세대구성원으로 변경되었다면 bankBookId가 남아있을 것
        //         if (bankBookId) dispatch(delBank(bankBookId));
        //         dispatch(modMem(userForm));
        //     }
        // }
        handleEditSubmit(edited);
    };

    useEffect(() => {
        if (Object.keys(edited.assets).length == 0) setHaveAssets('n');
        else setHaveAssets('y');
        if (Object.keys(edited.histories).length == 0) setHaveHistory('n');
        else setHaveHistory('y');
        if (Object.keys(edited.limits).length == 0) setHaveLimit('n');
        else setHaveLimit('y');
    }, []);

    useEffect(() => {
        if (
            account?.validYn === 'n' ||
            haveHistory === 'exist' ||
            limitArr?.specialSupplyRestrictedYn === '청약불가' ||
            (edited.homelessStartDate &&
                Number(new Date(edited.birthDate)) >
                    Number(new Date(edited.homelessStartDate)))
        ) {
            setFailMsg('!!');
        } else {
            setFailMsg(null);
        }
    }, [edited]);

    useEffect(() => isAssetsWindow, [haveAssets]);

    useEffect(() => {
        if (haveAssets === 'n') {
            setEdited({ ...edited, assets: [] });
        }
    }, [haveAssets]);

    useEffect(() => {
        if (edited.relationship !== '본인') {
            setAccount({
                ...account,
                bank: '',
                bankbook: '',
                joinDate: '',
                deposit: 0,
                paymentsCount: 0,
                validYn: '',
            });

            setEdited({
                ...edited,
                soldierYn: 'n',
            });
        } else {
            return edited.spouseYn === 'y'
                ? alert('회원은 배우자 분리세대에 속할 수 없습니다 !')
                : null;
        }
    }, [edited.relationship]);

    useEffect(() => {
        if (haveLimit === 'n') {
            setLimitArr({
                ...limitArr,
                reWinningRestrictedDate: '',
                specialSupplyRestrictedYn: 'n',
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
                ineligibleYn: '',
                ineligibleDate: '',
            });
        }
    }, [haveHistory]);

    return (
        <div className="modifyMemberFormContainer">
            <form onSubmit={onSubmitEdit} className="modifyMemberForm">
                <table className="modifyMemberFormTable">
                    <tbody className="modifyMemberFormTableTbody">
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td colSpan="2">
                                <div className="normalTitleContainer">
                                    <span className="normalTitle">
                                        기본정보입력
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">이름</span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTd">
                                <input
                                    className="nameInput"
                                    name="name"
                                    value={edited.name}
                                    onChange={onEditChange}
                                    required
                                />
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td className="modifyMemberFormTableTbodyTrTd"></td>
                            <td className="modifyMemberFormTableTbodyTrTd"></td>
                        </tr>
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">생년월일</span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTd">
                                <input
                                    className="birthdateInput"
                                    type="date"
                                    name="birthDate"
                                    value={edited.birthDate}
                                    onChange={onEditChange}
                                    required
                                />
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">외국인 여부</span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTd">
                                <input
                                    className="foreignerInput"
                                    type="radio"
                                    name="foreignerYn"
                                    onChange={onEditChange}
                                    value="y"
                                    checked={
                                        edited.foreignerYn === 'y'
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
                                    onChange={onEditChange}
                                    value="n"
                                    checked={
                                        edited.foreignerYn === 'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="foreignerInputText">
                                    내국인
                                </span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="modifyMemberFormTableTbodyTrSpace"></tr>
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td colSpan="3">
                                <div className="normalTitleContainer">
                                    <span className="normalTitle">
                                        구성원 관계 정보 입력
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    신청자와의 관계
                                </span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTd">
                                <select
                                    className="relationshipSelect"
                                    name="relationship"
                                    value={edited.relationship}
                                    onChange={onEditChange}
                                    required
                                >
                                    <option value=""> ---선택--- </option>
                                    <option value="본인">본인</option>
                                    <option value="배우자">배우자</option>
                                    <option value="모">모</option>
                                    <option value="부">부</option>
                                    <option value="자녀_일반">자녀_일반</option>
                                    <option value="자녀_태아">자녀_태아</option>
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
                            <td className="modifyMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">세대주 여부</span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTd">
                                <input
                                    className="householderInput"
                                    type="radio"
                                    name="householderYn"
                                    onChange={onEditChange}
                                    value="y"
                                    checked={
                                        edited.householderYn === 'y'
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
                                    onChange={onEditChange}
                                    value="n"
                                    checked={
                                        edited.householderYn === 'n'
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
                        {edited.relationship === '본인' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        장기복무 여부
                                    </span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <input
                                        className="isSoldierInput"
                                        type="radio"
                                        name="soldierYn"
                                        onChange={onEditChange}
                                        value="y"
                                        checked={
                                            edited.soldierYn === 'y'
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
                                        onChange={onEditChange}
                                        value="n"
                                        checked={
                                            edited.soldierYn === 'n'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="isSoldierInputText">
                                        아니오
                                    </span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTdError">
                                    {/* {form.soldierYn === 'n' ? (
                                            <span className="failMsg">
                                                {failMsg}
                                            </span>
                                        ) : null} */}
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTdError"></td>
                            </tr>
                        ) : null}
                        {edited.relationship === '배우자' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        배우자 분리세대 여부
                                    </span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <input
                                        className="isSpouseInput"
                                        type="radio"
                                        name="spouseYn"
                                        onChange={onEditChange}
                                        value="y"
                                        checked={
                                            edited.spouseYn === 'y'
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
                                        onChange={onEditChange}
                                        value="n"
                                        checked={
                                            edited.spouseYn === 'n'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="isSpouseInputText">
                                        아니오
                                    </span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTdError"></td>
                            </tr>
                        ) : null}
                        {edited.relationship === '배우자' &&
                        edited.spouseYn === 'y' ? (
                            <tr
                                className="modifyMemberFormTableTbodyTr"
                                rowSpan="1"
                            >
                                <td
                                    className="modifyMemberFormTableTbodyTrTd"
                                    colSpan="3"
                                >
                                    <tr className="modifyMemberFormTableTbodyTrSpouse">
                                        <td colSpan="3">
                                            <div className="normalTitleContainer">
                                                <span className="normalTitle">
                                                    배우자 분리세대 등록
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="modifyMemberFormTableTbodyTrSpouseButton">
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
                                    <tr className="modifyMemberFormTableTbodyTrSpouse">
                                        <td
                                            className="modifyMemberFormTableTbodyTrTdSpouse"
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
                                                            postcode={postcode}
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
                                    <tr className="modifyMemberFormTableTbodyTr">
                                        <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                            <span className="subTitle">
                                                우편번호
                                            </span>
                                        </td>
                                        <td className="modifyMemberFormTableTbodyTrTd">
                                            <input
                                                className="postcodeInput"
                                                type="number"
                                                name="postcode"
                                                value={edited.spousePostcode}
                                                onChange={onEditChange}
                                                readOnly
                                            />
                                        </td>
                                        <td className="modifyMemberFormTableTbodyTrTdError"></td>
                                    </tr>
                                    <tr className="modifyMemberFormTableTbodyTr">
                                        <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                            <span className="subTitle">
                                                주소
                                            </span>
                                        </td>
                                        <td className="modifyMemberFormTableTbodyTrTd">
                                            <input
                                                className="addressInput"
                                                type="text"
                                                name="address"
                                                value={edited.spouseAddress}
                                                onChange={onEditChange}
                                            />
                                        </td>
                                        <td className="modifyMemberFormTableTbodyTrTdError"></td>
                                    </tr>
                                </td>
                            </tr>
                        ) : null}
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">세대 거주</span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTd">
                                <input
                                    className="isSoldierInput"
                                    type="radio"
                                    name="spouseLive"
                                    onChange={onEditChange}
                                    value="base"
                                    checked={
                                        edited.spouseLive === 'base'
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
                                    onChange={onEditChange}
                                    value="spouse"
                                    checked={
                                        edited.spouseLive === 'spouse'
                                            ? true
                                            : false
                                    }
                                />
                                <span className="isSoldierInputText">
                                    신청자의 배우자 분리세대에 거주
                                </span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTdError">
                                {/* {form.soldierYn === 'n' ? (
                                            <span className="failMsg">
                                                {failMsg}
                                            </span>
                                        ) : null} */}
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">무주택시작일</span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTd">
                                <input
                                    className="homelessStartDateInput"
                                    type="date"
                                    name="homelessStartDate"
                                    value={edited.homelessStartDate}
                                    onChange={onEditChange}
                                    required
                                />
                            </td>
                            <td>
                                {Number(new Date(edited.birthDate)) >
                                Number(new Date(edited.homelessStartDate)) ? (
                                    <span className="failMsg">{failMsg}</span>
                                ) : null}
                            </td>
                        </tr>
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">전입신고일</span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTd">
                                <input
                                    className="transferDateInput"
                                    type="date"
                                    name="transferDate"
                                    value={edited.transferDate}
                                    onChange={onEditChange}
                                    required
                                />
                            </td>
                        </tr>

                        <tr className="modifyMemberFormTableTbodyTr">
                            <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">혼인 여부</span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTd">
                                {' '}
                                <input
                                    className="isMarriedInput"
                                    type="radio"
                                    name="isMarried"
                                    onChange={onEditChange}
                                    value="n"
                                    checked={
                                        edited.isMarried === 'n' ? true : false
                                    }
                                />
                                <span className="isMarriedInputText">
                                    결혼한 상태가 아닙니다
                                </span>
                                <input
                                    className="isMarriedInput"
                                    type="radio"
                                    name="isMarried"
                                    onChange={onEditChange}
                                    value="y"
                                    checked={
                                        edited.isMarried === 'y' ? true : false
                                    }
                                />
                                <span className="isMarriedInputText">
                                    결혼한 상태입니다
                                </span>
                            </td>
                        </tr>
                        {edited.isMarried === 'y' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">혼인신고일</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <input
                                        className="marriedDateInput"
                                        type="date"
                                        name="marriedDate"
                                        value={edited.marriedDate}
                                        onChange={onEditChange}
                                    />
                                </td>
                            </tr>
                        ) : null}
                        <tr className="modifyMemberFormTableTbodyTrSpace"></tr>
                        {edited.relationship === '본인' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td colSpan="2">
                                    <div className="normalTitleContainer">
                                        <span className="normalTitle">
                                            청약통장
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ) : null}
                        {edited.relationship === '본인' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">개설은행</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <select
                                        className="bankSelect"
                                        name="bank"
                                        value={account.bank}
                                        onChange={onAccountChange}
                                    >
                                        <option value=""> ---선택--- </option>
                                        <option value="국민">국민</option>
                                        <option value="기업">기업</option>
                                        <option value="농협">농협</option>
                                        <option value="신한">신한</option>
                                        <option value="우리">우리</option>
                                        <option value="하나">하나</option>
                                    </select>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTdError"></td>
                            </tr>
                        ) : null}
                        {edited.relationship === '본인' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        청약통장종류
                                    </span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <select
                                        className="bankbookSelect"
                                        name="bankbook"
                                        value={account.bankbook}
                                        onChange={onAccountChange}
                                        required
                                    >
                                        <option value=""> ---선택--- </option>
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
                                <td className="modifyMemberFormTableTbodyTrTdError"></td>
                            </tr>
                        ) : null}
                        {edited.relationship === '본인' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">가입일</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <input
                                        className="joinDateInput"
                                        type="date"
                                        name="joinDate"
                                        value={account.joinDate}
                                        onChange={onAccountChange}
                                    />
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTdError"></td>
                            </tr>
                        ) : null}
                        {edited.relationship === '본인' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">예치금액</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <input
                                        className="depositInput"
                                        type="number"
                                        name="deposit"
                                        value={account.deposit}
                                        onChange={onAccountChange}
                                    />
                                    <span> 원</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTdError"></td>
                            </tr>
                        ) : null}
                        {edited.relationship === '본인' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">납입횟수</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <input
                                        className="paymentsCountInput"
                                        type="number"
                                        name="paymentsCount"
                                        value={account.paymentsCount}
                                        onChange={onAccountChange}
                                    />
                                    <span> 회</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTdError"></td>
                            </tr>
                        ) : null}
                        {edited.relationship === '본인' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">유효여부</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
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
                                    <span className="validYnInputText">예</span>
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
                                <td className="modifyMemberFormTableTbodyTrTdError">
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

                        {edited.relationship === '본인' ? (
                            <tr className="modifyMemberFormTableTbodyTrSpace"></tr>
                        ) : null}

                        <tr className="modifyMemberFormTableTbodyTr">
                            <td colSpan="3">
                                <div className="normalTitleContainer">
                                    <span className="normalTitle">
                                        청약 당첨 이력
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">청약 당첨 이력</span>
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
                                    checked={haveHistory === 'y' ? true : false}
                                    required
                                />{' '}
                                <span className="historyInputText">있음</span>
                                <input
                                    className="historyInput"
                                    type="radio"
                                    name="haveHistory"
                                    onChange={(e) => {
                                        setHaveHistory(e.target.value);
                                    }}
                                    value="n"
                                    checked={haveHistory === 'n' ? true : false}
                                    required
                                />
                                <span className="historyInputText">없음</span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTdError">
                                {haveHistory === 'y' ? (
                                    <span className="failMsg">{failMsg}</span>
                                ) : null}
                            </td>
                        </tr>
                        {haveHistory === 'y' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">주택명</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
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
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">공급유형</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <select
                                        className="supplySelect"
                                        name="supply"
                                        value={historyArr.supply}
                                        onChange={onHistoryArrChange}
                                    >
                                        <option value=""> ---선택--- </option>
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
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">세부유형</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <select
                                        className="specialSupplySelect"
                                        name="spercialSupply"
                                        value={historyArr.specialSupply}
                                        onChange={onHistoryArrChange}
                                    >
                                        <option value=""> ---선택--- </option>
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
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">주택형</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
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
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">순위</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <select
                                        className="rankingSelect"
                                        name="ranking"
                                        value={historyArr.ranking}
                                        onChange={onHistoryArrChange}
                                    >
                                        <option value=""> ---선택--- </option>
                                        <option value="일순위">일순위</option>
                                        <option value="이순위">이순위</option>
                                    </select>
                                </td>
                            </tr>
                        ) : null}
                        {haveHistory === 'y' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">당첨결과</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <select
                                        className="resultSelect"
                                        name="result"
                                        value={historyArr.result}
                                        onChange={onHistoryArrChange}
                                    >
                                        <option value=""> ---선택--- </option>
                                        <option value="당첨">당첨</option>
                                        <option value="미당첨">미당첨</option>
                                        <option value="예비당첨">
                                            예비당첨
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ) : null}
                        {haveHistory === 'y' &&
                        historyArr.result === '예비당첨' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">예비번호</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
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
                        {haveHistory === 'y' && historyArr.result === '당첨' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">당첨일</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
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
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">추첨방식</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <select
                                        className="resultSelect"
                                        name="raffle"
                                        value={historyArr.raffle}
                                        onChange={onHistoryArrChange}
                                    >
                                        <option value=""> ---선택--- </option>
                                        <option value="가점제">가점제</option>
                                        <option value="추첨제">추첨제</option>
                                    </select>
                                </td>
                            </tr>
                        ) : null}
                        {historyArr.result === '당첨' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">부적격여부</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
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
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        부적격통보날짜
                                    </span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <input
                                        className="ineligibleDate"
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
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">당첨취소</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
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

                        <tr className="modifyMemberFormTableTbodyTrSpace"></tr>

                        <tr className="modifyMemberFormTableTbodyTr">
                            <td colSpan="3">
                                <div className="normalTitleContainer">
                                    <span className="normalTitle">
                                        자산 등록
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">월 평균 소득</span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTd">
                                <input
                                    className="incomeInput"
                                    type="number"
                                    name="income"
                                    onChange={onEditChange}
                                    value={edited.income}
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
                        <tr className="modifyMemberFormTableTbodyTr">
                            <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">자산여부</span>
                            </td>
                            <td className="modifyMemberFormTableTbodyTrTd">
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="haveAssets"
                                    onChange={(e) => {
                                        setHaveAssets(e.target.value);
                                    }}
                                    value="y"
                                    checked={haveAssets === 'y' ? true : false}
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
                                    checked={haveAssets === 'n' ? true : false}
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    없습니다
                                </span>
                            </td>
                        </tr>
                        {haveAssets === 'y' ? AssetsWindow() : null}
                        {haveHistory === 'y' ? (
                            <>
                                <tr className="modifyMemberFormTableTbodyTrSpace"></tr>
                                <tr className="modifyMemberFormTableTbodyTr">
                                    <td colSpan="3">
                                        <div className="normalTitleContainer">
                                            <span className="normalTitle">
                                                청약 제한 사항
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="modifyMemberFormTableTbodyTr">
                                    <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            청약 제한 사항
                                        </span>
                                    </td>
                                    <td className="modifyMemberFormTableTbodyTrTd">
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
                                        <span className="limitInputText">
                                            있음
                                        </span>
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
                                        <span className="limitInputText">
                                            없음
                                        </span>
                                    </td>
                                </tr>
                            </>
                        ) : null}
                        {haveLimit === 'y' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">재당첨제한</span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
                                    <input
                                        className="reWinDateInput"
                                        type="date"
                                        name="reWinningRestrictedDate"
                                        value={limitArr.reWinningRestrictedDate}
                                        onChange={onLimitArrChange}
                                    />
                                </td>
                            </tr>
                        ) : null}
                        {haveLimit === 'y' ? (
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        특별공급제한
                                    </span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
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
                                <td className="modifyMemberFormTableTbodyTrTdError">
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
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        부적격당첨자제한
                                    </span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
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
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        투기과열지구
                                        <br />
                                        청약과열지구
                                        <br />
                                        1순위제한
                                    </span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
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
                            <tr className="modifyMemberFormTableTbodyTr">
                                <td className="modifyMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        가점제당첨제한
                                    </span>
                                </td>
                                <td className="modifyMemberFormTableTbodyTrTd">
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

export default Modal;
