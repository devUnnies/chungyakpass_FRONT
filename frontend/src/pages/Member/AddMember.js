import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
    addMem,
    addMemAddInfo,
    patHolder,
} from '../../store/actions/commonInfoAction';
import MainButton from '../../components/Button/MainButton';
import SubButton from '../../components/Button/SubButton';
import MonthAverageIncomeTable from './MonthAverageIncomeTable';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './Member.css';
import Tooltip from '../../components/Tooltip/Tooltip';

const AddMember = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const commonInfoStore = useSelector((state) => state.commonInfo);
    const houseId = location.state.houseId;
    const [addInfo, setAddInfo] = useState({
        houseMemberId: '',
        parentsDeathYn: 'n',
        divorceYn: 'n',
        sameResidentRegistrationYn: 'y',
        stayOverYn: 'n',
        nowStayOverYn: 'n',
    });
    const [info, setInfo] = useState({
        houseId: houseId,
        name: '',
        birthDay: '',
        foreignerYn: '',
        homelessStartDate: '',
        relation: '',
        householderYn: '',
        soldierYn: 'n',
        isMarried: null,
        marriedDate: '',
        transferDate: '',
        income: '0',
    });
    const [haveHistories, setHaveHistories] = useState(null);
    const [haveAssets, setHaveAssets] = useState(null);
    const [failMsg, setFailMsg] = useState(null);

    const houseState = location.state.houseState;

    const onAddInfoChange = (e) => {
        const { name, value } = e.target;
        setAddInfo({
            ...addInfo,
            [name]: value,
        });
    };

    const onInfoChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userForm = {
            houseId: info.houseId,
            relation: info.relation,
            name: info.name,
            birthDay: info.birthDay,
            foreignerYn: info.foreignerYn,
            soldierYn: info.soldierYn,
            marriageDate: info.isMarried === 'y' ? info.marriedDate : null,
            homelessStartDate: info.homelessStartDate,
            transferDate: info.transferDate,
            income: info.income,
        };

        // console.log('?????? ?????? ??????????????? !!!!' + JSON.stringify(userForm));
        if (failMsg)
            alert('?????????????????? ?????? ??? ?????? ????????? ????????????????????? !!');
        else dispatch(addMem(userForm));
    };

    useEffect(() => {
        if (
            Number(new Date(info.birthDay)) >
            Number(new Date(info.homelessStartDate))
        ) {
            setFailMsg('!!!');
        } else {
            setFailMsg(null);
        }
    }, [info]);

    // useEffect(() => {
    //     if (addInfo.sameResidentRegistrationYn === 'n') {
    //         setFailMsg('!!!');
    //     } else {
    //         setFailMsg();
    //     }
    // }, [addInfo.sameResidentRegistrationYn]);

    useEffect(() => {
        if (houseId) setInfo({ ...info, houseId: houseId });
    }, [houseId]);

    useEffect(() => {
        return setInfo({ ...info, homelessStartDate: info.birthDay });
    }, [info.birthDay]);

    useEffect(() => {
        const member = commonInfoStore.addMem.data;
        if (member) {
            if (
                member.status === 400 ||
                member.status === 404 ||
                member.status === 409
            ) {
                alert(member.message);
            } else {
                const add = {
                    ...addInfo,
                    houseMemberId: member.id,
                };
                dispatch(addMemAddInfo(add));

                // ????????? ?????? !
                if (info.householderYn === 'y') {
                    const userForm = {
                        houseId: info.houseId,
                        memberId: member.id,
                    };
                    dispatch(patHolder(userForm));
                }
                // ???????????? ?????? ????????????
                if (haveHistories === 'y') {
                    history.push('/histories', {
                        houseState: houseState,
                        haveAssets: haveAssets,
                        memberId: member.id,
                        pos: -1,
                    });
                } else {
                    if (haveAssets === 'y')
                        history.push('/assets', {
                            ineligibleDate: new Date('0000-00-00'),
                            pos: -1,
                            memberId: member.id,
                        });
                    else
                        history.push('/members', {
                            houseState: houseState,
                        });
                }
            }
        }
    }, [commonInfoStore.addMem]);

    return (
        <div className="addMemberContainer">
            <div className="menuContainer">
                <div className="oneMenuSelect">
                    <h4 className="oneMenuSelect">??????????????? ??????</h4>
                </div>

                <div className="oneMenu">
                    <h4 className="oneMenu">???????????? ??????</h4>
                </div>

                <div className="oneMenu">
                    <h4 className="oneMenu">?????? ??????</h4>
                </div>
            </div>
            <div className="addMemberHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">
                    ??????????????? ?????? -{' '}
                    {houseState === 'my'
                        ? '????????? ?????? ??????'
                        : '????????? ?????? ??????'}
                </span>
            </div>
            <div className="addMemberFormContainer">
                {/* <form
                    onSubmit={() => handleSubmit}
                    className="addMemberForm"
                    name="addMember"
                > */}
                <table className="addMemberFormTable">
                    <tbody className="addMemberFormTableTbody">
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    ????????? ?????? ??????
                                </span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="sameResidentRegistrationYn"
                                    onChange={onAddInfoChange}
                                    value="y"
                                    checked={
                                        addInfo.sameResidentRegistrationYn ===
                                        'y'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    ???{'  '}
                                </span>
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="sameResidentRegistrationYn"
                                    onChange={onAddInfoChange}
                                    value="n"
                                    checked={
                                        addInfo.sameResidentRegistrationYn ===
                                        'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    ?????????
                                </span>
                            </td>
                            <Tooltip
                                message={
                                    <div className="textTooltip">
                                        ?????? 3??? ?????? ????????? ?????????????????????
                                        ???????????????????????? ?????? ???????????????.
                                    </div>
                                }
                                width={150}
                                height={100}
                            >
                                <ExclamationCircleOutlined className="tooltipIcon" />
                            </Tooltip>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">??????</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="nameInput"
                                    name="name"
                                    value={info.name}
                                    onChange={onInfoChange}
                                    required
                                />
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">????????????</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="birthdateInput"
                                    type="date"
                                    name="birthDay"
                                    value={info.birthDay}
                                    onChange={onInfoChange}
                                    required
                                />
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">????????? ??????</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="foreignerInput"
                                    type="radio"
                                    name="foreignerYn"
                                    onChange={onInfoChange}
                                    value="y"
                                    checked={
                                        info.foreignerYn === 'y' ? true : false
                                    }
                                    required
                                />
                                <span className="foreignerInputText">
                                    {' '}
                                    ?????????{'  '}
                                </span>
                                <input
                                    className="foreignerInput"
                                    type="radio"
                                    name="foreignerYn"
                                    onChange={onInfoChange}
                                    value="n"
                                    checked={
                                        info.foreignerYn === 'n' ? true : false
                                    }
                                    required
                                />
                                <span className="foreignerInputText">
                                    ?????????
                                </span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>

                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    ??????????????? ??????
                                </span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <select
                                    className="relationshipSelect"
                                    name="relation"
                                    value={info.relation}
                                    onChange={onInfoChange}
                                    required
                                >
                                    <option value=""> ---??????--- </option>
                                    <option value="??????">??????</option>
                                    <option value="?????????">?????????</option>
                                    <option value="???">???</option>
                                    <option value="???">???</option>
                                    <option value="??????_??????">??????_??????</option>
                                    <option value="??????_??????">??????_??????</option>
                                    <option value="???????????????">
                                        ???????????? ???
                                    </option>
                                    <option value="???????????????">
                                        ???????????? ???
                                    </option>
                                    <option value="??????????????????">
                                        ????????? ?????????
                                    </option>
                                    <option value="??????">??????</option>
                                    <option value="??????">??????</option>
                                    <option value="?????????">?????????</option>
                                    <option value="?????????????????????">
                                        ???????????? ?????????
                                    </option>
                                    <option value="??????????????????">
                                        ???????????? ??????
                                    </option>
                                    <option value="??????????????????">
                                        ???????????? ??????
                                    </option>
                                </select>
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">????????? ??????</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="householderInput"
                                    type="radio"
                                    name="householderYn"
                                    onChange={onInfoChange}
                                    value="y"
                                    checked={
                                        info.householderYn === 'y'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="householderInputText">
                                    {' '}
                                    ???????????????{'  '}
                                </span>
                                <input
                                    className="householderInput"
                                    type="radio"
                                    name="householderYn"
                                    onChange={onInfoChange}
                                    value="n"
                                    checked={
                                        info.householderYn === 'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="householderInputText">
                                    {' '}
                                    ???????????? ?????????
                                </span>
                            </td>
                        </tr>
                        {info.relation === '??????' ? (
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        ???????????? ??????
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="isSoldierInput"
                                        type="radio"
                                        name="soldierYn"
                                        onChange={onInfoChange}
                                        value="y"
                                        checked={
                                            info.soldierYn === 'y'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="isSoldierInputText">
                                        {' '}
                                        ???{'  '}
                                    </span>
                                    <input
                                        className="isSoldierInput"
                                        type="radio"
                                        name="soldierYn"
                                        onChange={onInfoChange}
                                        value="n"
                                        checked={
                                            info.soldierYn === 'n'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="isSoldierInputText">
                                        {' '}
                                        ?????????{'  '}
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError"></td>
                            </tr>
                        ) : null}

                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">??????????????????</span>
                                {` `}
                            </td>
                            <td className="addMemberFormTableTbodyTrTdTooltip">
                                <input
                                    className="homelessStartDateInput"
                                    type="input"
                                    name="homelessStartDate"
                                    value={
                                        info.homelessStartDate
                                            ? info.homelessStartDate
                                            : '0000-00-00'
                                    }
                                    onChange={onInfoChange}
                                    disabled
                                />
                            </td>
                            <td>
                                <Tooltip
                                    message={
                                        <div className="textTooltip">
                                            ?????? ?????? ?????? ?????? ????????????
                                            ???????????? ?????? ???????????????.
                                        </div>
                                    }
                                    width={150}
                                    height={100}
                                >
                                    <ExclamationCircleOutlined className="tooltipIcon" />
                                </Tooltip>
                            </td>
                            <td>
                                {Number(new Date(info.birthDay)) >
                                Number(new Date(info.homelessStartDate)) ? (
                                    <span className="failMsg">{failMsg}</span>
                                ) : null}
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">???????????????</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="transferDateInput"
                                    type="date"
                                    name="transferDate"
                                    value={info.transferDate}
                                    onChange={onInfoChange}
                                    required
                                />
                            </td>
                        </tr>

                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">?????? ??????</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                {' '}
                                <input
                                    className="isMarriedInput"
                                    type="radio"
                                    name="isMarried"
                                    onChange={onInfoChange}
                                    value="n"
                                    checked={
                                        info.isMarried === 'n' ? true : false
                                    }
                                />
                                <span className="isMarriedInputText">
                                    {' '}
                                    ????????? ????????? ????????????{'  '}
                                </span>
                                <input
                                    className="isMarriedInput"
                                    type="radio"
                                    name="isMarried"
                                    onChange={onInfoChange}
                                    value="y"
                                    checked={
                                        info.isMarried === 'y' ? true : false
                                    }
                                />
                                <span className="isMarriedInputText">
                                    {' '}
                                    ????????? ???????????????{'  '}
                                </span>
                            </td>
                        </tr>
                        {(info.relation === '??????' ||
                            info.relation === '?????????') &&
                        info.isMarried === 'y' ? (
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">???????????????</span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="marriedDateInput"
                                        type="date"
                                        name="marriedDate"
                                        value={info.marriedDate}
                                        onChange={onInfoChange}
                                    />
                                </td>
                            </tr>
                        ) : null}
                        {info.relation !== '??????' &&
                        info.relation !== '?????????' &&
                        info.isMarried === 'n' ? (
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">????????????</span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="assetHaveAssetsInput"
                                        type="radio"
                                        name="divorceYn"
                                        onChange={onAddInfoChange}
                                        value="y"
                                        checked={
                                            addInfo.divorceYn === 'y'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="assetHaveAssetsInputText">
                                        {' '}
                                        ????????????{'  '}
                                    </span>
                                    <input
                                        className="assetHaveAssetsInput"
                                        type="radio"
                                        name="divorceYn"
                                        onChange={onAddInfoChange}
                                        value="n"
                                        checked={
                                            addInfo.divorceYn === 'n'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="assetHaveAssetsInputText">
                                        {' '}
                                        ????????????
                                    </span>
                                </td>
                            </tr>
                        ) : null}
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">??????????????????</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="parentsDeathYn"
                                    onChange={onAddInfoChange}
                                    value="y"
                                    checked={
                                        addInfo.parentsDeathYn === 'y'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    ????????????{'  '}
                                </span>
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="parentsDeathYn"
                                    onChange={onAddInfoChange}
                                    value="n"
                                    checked={
                                        addInfo.parentsDeathYn === 'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    ????????????
                                </span>
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">??? ?????? ??????</span>
                                {` `}
                            </td>
                            <td className="addMemberFormTableTbodyTrTdTooltip">
                                <input
                                    className="incomeInput"
                                    type="number"
                                    name="income"
                                    onChange={onInfoChange}
                                    value={info.income}
                                    required
                                />
                                <span className="incomeUnit">???</span>
                            </td>
                            <td>
                                <Tooltip
                                    message={<MonthAverageIncomeTable />}
                                    width={200}
                                    height={200}
                                >
                                    <ExclamationCircleOutlined className="tooltipIcon" />
                                </Tooltip>
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    ????????? ???????????? ????????? ??????
                                </span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="nowStayOverYn"
                                    onChange={onAddInfoChange}
                                    value="y"
                                    checked={
                                        addInfo.nowStayOverYn === 'y'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    ???{'  '}
                                </span>
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="nowStayOverYn"
                                    onChange={onAddInfoChange}
                                    value="n"
                                    checked={
                                        addInfo.nowStayOverYn === 'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    ?????????
                                </span>
                            </td>
                            <td>
                                <Tooltip
                                    message={
                                        <div className="textTooltip">
                                            ?????? 3??? ????????? ????????????????????????
                                            ?????? ???????????? 90?????? ???????????? ?????????
                                            ??????????????? ???????????? ???????????? ??????
                                            ???????????????.
                                        </div>
                                    }
                                    width={150}
                                    height={100}
                                >
                                    <ExclamationCircleOutlined className="tooltipIcon" />
                                </Tooltip>
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    ????????? ???????????? ????????????
                                </span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="stayOverYn"
                                    onChange={onAddInfoChange}
                                    value="y"
                                    checked={
                                        addInfo.stayOverYn === 'y'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    ????????????{'  '}
                                </span>
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="stayOverYn"
                                    onChange={onAddInfoChange}
                                    value="n"
                                    checked={
                                        addInfo.stayOverYn === 'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    ????????????
                                </span>
                            </td>
                            <td>
                                <Tooltip
                                    message={
                                        <div className="textTooltip">
                                            ?????? 3??? ????????? ????????????????????????
                                            ?????? ???????????? 90?????? ???????????? ?????????
                                            ??????????????? ????????? ?????? ???????????? ??????
                                            ???????????????.
                                        </div>
                                    }
                                    width={150}
                                    height={100}
                                >
                                    <ExclamationCircleOutlined className="tooltipIcon" />
                                </Tooltip>
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">????????????</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="haveHistories"
                                    onChange={(e) => {
                                        setHaveHistories(e.target.value);
                                    }}
                                    value="y"
                                    checked={
                                        haveHistories === 'y' ? true : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    ????????????{'  '}
                                </span>
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="haveHistories"
                                    onChange={(e) => {
                                        setHaveHistories(e.target.value);
                                    }}
                                    value="n"
                                    checked={
                                        haveHistories === 'n' ? true : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    ????????????
                                </span>
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">????????????</span>
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
                                    checked={haveAssets === 'y' ? true : false}
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    ????????????{'  '}
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
                                    {' '}
                                    ????????????
                                </span>
                            </td>
                            <td>
                                <Tooltip
                                    message={
                                        <div className="textTooltip">
                                            ????????? ?????????, ??????, ????????? ??????, ???
                                            ????????? ????????? ???????????????.
                                        </div>
                                    }
                                    width={150}
                                    height={100}
                                >
                                    <ExclamationCircleOutlined className="tooltipIcon" />
                                </Tooltip>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5">
                                <div className="saveButtonContainer">
                                    <MainButton
                                        type="submit"
                                        className="save"
                                        width="80"
                                        height="30"
                                        onClick={handleSubmit}
                                    >
                                        ??????
                                    </MainButton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* </form> */}
            </div>

            <div className="backButton">
                <SubButton
                    type="back"
                    className="save"
                    width="80"
                    height="30"
                    onClick={() => {
                        history.goBack(-1);
                    }}
                >
                    ????????????
                </SubButton>
            </div>
        </div>
    );
};

export default AddMember;
