import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import useInputState from '../../../components/Input/useInputState';
import { CalculatorOutlined, CheckOutlined } from '@ant-design/icons';
import { postSpecialOldParentPoint } from '../../../store/actions/pointSpecialOldParentAction';
import { useHistory } from 'react-router-dom';
import '../../ExtraPoint/ExtraPoint.css';

function OldParentPointPost(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const oldParentPointStore = useSelector((state) => state.oldParentPoint);

    // enter 키 누를 경우 onClick 함수 실행.
    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            onClick();
        }
    };

    const [houseMemberId, setHouseMemberId, handleChangeHouseMemberId] =
        useInputState('');

    const [parentsDeathYn, setParentsDeathYn, handleChangeParentsDeathYn] =
        useInputState('');

    const [divorceYn, setDivorceYn, handleChangeDivorceYn] = useInputState('');

    const [
        sameResidentRegistrationYn,
        setSameResidentRegistrationYn,
        handleChangeSameResidentRegistrationYn,
    ] = useInputState('');

    const [stayOverYn, setStayOverYn, handleChangeStayOverYn] =
        useInputState('');

    const [nowStayOverYn, setNowStayOverYn, handleChangeNowStayOverYn] =
        useInputState('');

    const handleSubmit = (event) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        event.preventDefault();

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            postSpecialOldParentPoint({
                houseMemberId: houseMemberId,
                parentsDeathYn: parentsDeathYn,
                divorceYn: divorceYn,
                sameResidentRegistrationYn: sameResidentRegistrationYn,
                stayOverYn: stayOverYn,
                nowStayOverYn: nowStayOverYn,
            })
        );
    };

    const onClick = async () => {
        if (
            parentsDeathYn == '' &&
            divorceYn == '' &&
            sameResidentRegistrationYn == '' &&
            stayOverYn == '' &&
            nowStayOverYn == ''
        ) {
            alert('필수 입력 값 중 비어있는 값이 존재합니다.');
        } else {
            dispatch(
                postSpecialOldParentPoint({
                    houseMemberId: houseMemberId,
                    parentsDeathYn: parentsDeathYn,
                    divorceYn: divorceYn,
                    sameResidentRegistrationYn: sameResidentRegistrationYn,
                    stayOverYn: stayOverYn,
                    nowStayOverYn: nowStayOverYn,
                })
            ); // api 연결 요청.

            const data = oldParentPointStore?.postSpecialOldParentPoint?.data;
            console.log(JSON.stringify(data));
            history.push({
                pathname: '/point/oldParent',
                state: {
                    houseMemberId,
                    parentsDeathYn,
                    divorceYn,
                    sameResidentRegistrationYn,
                    stayOverYn,
                    nowStayOverYn,
                },
            });
        }
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 노부모 가배점 페이지로 이동.
        if (oldParentPointStore?.postSpecialOldParentPoint) {
            const data = oldParentPointStore.postSpecialOldParentPoint.data;
        }
    }, [oldParentPointStore?.postSpecialOldParentPoint]);

    return (
        <>
            <div className="historiesInfoHeaderContainer">
                <span className="apt_title">
                    <span className="apt_titleIcon">
                        <CalculatorOutlined />
                    </span>
                    <strong className="apt_mainTitle">특별공급 </strong>
                    <span className="apt_subTitle"> | 노부모부양 </span>
                </span>
            </div>

            <div className="specialAptNumForm">
                <div className="specialAptNumContainer">
                    <form
                        onSubmit={handleSubmit}
                        onKeyPress={onKeyPress}
                        className="specialAptNumForm"
                    >
                        <table border="1" className="pointTable">
                            <tr className="paramSelect">
                                <td className="pointTable_list">
                                    <span className="qualificationBoxTitle">
                                        부모 사망 여부
                                    </span>
                                </td>
                                <td className="pointTable_select">
                                    <input
                                        className="paramSelectInput"
                                        type="radio"
                                        name="parentsDeathYn"
                                        onChange={handleChangeParentsDeathYn}
                                        value="y"
                                        checked={
                                            parentsDeathYn === 'y'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="selectInputText">
                                        해당함
                                    </span>
                                    <input
                                        className="paramSelectInput"
                                        type="radio"
                                        name="parentsDeathYn"
                                        onChange={handleChangeParentsDeathYn}
                                        value="n"
                                        checked={
                                            parentsDeathYn === 'n'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="selectInputText">
                                        해당하지 않음
                                    </span>
                                </td>
                            </tr>

                            <br />
                            <tr className="paramSelect">
                                <td className="pointTable_list">
                                    <span className="qualificationBoxTitle">
                                        이혼 여부
                                    </span>
                                </td>
                                <td className="pointTable_select">
                                    <input
                                        className="paramSelectInput"
                                        type="radio"
                                        name="divorceYn"
                                        onChange={handleChangeDivorceYn}
                                        value="y"
                                        checked={
                                            divorceYn === 'y' ? true : false
                                        }
                                    />
                                    <span className="selectInputText">
                                        해당함
                                    </span>
                                    <input
                                        className="paramSelectInput"
                                        type="radio"
                                        name="divorceYn"
                                        onChange={handleChangeDivorceYn}
                                        value="n"
                                        checked={
                                            divorceYn === 'n' ? true : false
                                        }
                                    />
                                    <span className="selectInputText">
                                        해당하지 않음
                                    </span>
                                </td>
                            </tr>

                            <br />
                            <tr className="paramSelect">
                                <td className="pointTable_list">
                                    <span className="qualificationBoxTitle">
                                        동일 주소지 거주 여부
                                    </span>
                                </td>
                                <td className="pointTable_select">
                                    <input
                                        className="paramSelectInput"
                                        type="radio"
                                        name="sameResidentRegistrationYn"
                                        onChange={
                                            handleChangeSameResidentRegistrationYn
                                        }
                                        value="y"
                                        checked={
                                            sameResidentRegistrationYn === 'y'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="selectInputText">
                                        해당함
                                    </span>
                                    <input
                                        className="paramSelectInput"
                                        type="radio"
                                        name="sameResidentRegistrationYn"
                                        onChange={
                                            handleChangeSameResidentRegistrationYn
                                        }
                                        value="n"
                                        checked={
                                            sameResidentRegistrationYn === 'n'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="selectInputText">
                                        해당하지 않음
                                    </span>
                                </td>
                            </tr>

                            <br />

                            <tr className="paramSelect">
                                <td className="pointTable_list">
                                    <span className="qualificationBoxTitle">
                                        해외 혹은 요양시설 체류 여부
                                    </span>
                                </td>
                                <td className="pointTable_select">
                                    <input
                                        className="paramSelectInput"
                                        type="radio"
                                        name="stayOverYn"
                                        onChange={handleChangeStayOverYn}
                                        value="y"
                                        checked={
                                            stayOverYn === 'y' ? true : false
                                        }
                                    />
                                    <span className="selectInputText">
                                        해당함
                                    </span>
                                    <input
                                        className="paramSelectInput"
                                        type="radio"
                                        name="stayOverYn"
                                        onChange={handleChangeStayOverYn}
                                        value="n"
                                        checked={
                                            stayOverYn === 'n' ? true : false
                                        }
                                    />
                                    <span className="selectInputText">
                                        해당하지 않음
                                    </span>
                                </td>
                            </tr>

                            <br />

                            <tr className="paramSelect">
                                <td className="pointTable_list">
                                    <span className="qualificationBoxTitle">
                                        현재 해외 체류 여부
                                    </span>
                                </td>
                                <td className="pointTable_select">
                                    <input
                                        className="paramSelectInput"
                                        type="radio"
                                        name="nowStayOverYn"
                                        onChange={handleChangeNowStayOverYn}
                                        value="y"
                                        checked={
                                            nowStayOverYn === 'y' ? true : false
                                        }
                                    />
                                    <span className="selectInputText">
                                        해당함
                                    </span>
                                    <input
                                        className="paramSelectInput"
                                        type="radio"
                                        name="nowStayOverYn"
                                        onChange={handleChangeNowStayOverYn}
                                        value="n"
                                        checked={
                                            nowStayOverYn === 'n' ? true : false
                                        }
                                    />
                                    <span className="selectInputText">
                                        해당하지 않음
                                    </span>
                                </td>
                            </tr>
                        </table>

                        <div className="buttonContainer">
                            <span className="buttonPosition">
                                <button
                                    className="aptBackButton"
                                    type="back"
                                    onClick={() => {
                                        history.goBack(-1);
                                    }}
                                >
                                    이전
                                </button>
                            </span>
                            <span className="buttonPosition">
                                <button
                                    className="aptNextButton"
                                    type="button"
                                    onClick={onClick}
                                >
                                    다음
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default OldParentPointPost;
