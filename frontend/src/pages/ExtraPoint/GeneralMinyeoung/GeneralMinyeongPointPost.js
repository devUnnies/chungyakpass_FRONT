import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import { CalculatorOutlined, CheckOutlined } from '@ant-design/icons';
import useInputState from '../../../components/Input/useInputState';
import { postGeneralMinyeongPoint } from '../../../store/actions/pointGeneralMinyeongAction';
import { useHistory } from 'react-router-dom';
import './GeneralMinyeoungPoint.css';

function GeneralMinyeongPointPost(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const generalMinyeongPointStore = useSelector(
        (state) => state.generalMinyeongPoint
    );

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
            postGeneralMinyeongPoint({
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
            alert('아파트 분양정보 입력칸이 비어있습니다.');
        } else {
            dispatch(
                postGeneralMinyeongPoint({
                    houseMemberId: houseMemberId,
                    parentsDeathYn: parentsDeathYn,
                    divorceYn: divorceYn,
                    sameResidentRegistrationYn: sameResidentRegistrationYn,
                    stayOverYn: stayOverYn,
                    nowStayOverYn: nowStayOverYn,
                })
            ); // api 연결 요청.

            const data =
                generalMinyeongPointStore?.postGeneralMinyeongPoint?.data;
            console.log(JSON.stringify(data));
            history.push({
                pathname: '/point/generalMinyeoung',
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
        // 아파트 공고번호, 주택형 post 성공시 일반공급 민영 가배점 페이지로 이동.
        if (generalMinyeongPointStore?.postGeneralMinyeongPoint) {
            const data =
                generalMinyeongPointStore.postGeneralMinyeongPoint.data;
        }
    }, [generalMinyeongPointStore?.postGeneralMinyeongPoint]);

    return (
        <>
            <div className="historiesInfoHeaderContainer">
                <span className="apt_title">
                    <span className="apt_titleIcon">
                        <CalculatorOutlined />
                    </span>
                    <strong className="apt_mainTitle">일반공급 </strong>
                    <span className="apt_subTitle"> | 민영주택</span>
                </span>
            </div>

            <div className="generalAptNumForm">
                <div className="generalAptNumContainer">
                    <form onSubmit={handleSubmit} className="generalAptNumForm">
                        <div className="paramSelect">
                            <span className="qualificationBoxTitle">
                                부모 사망 여부
                            </span>
                            <input
                                className="paramSelectInput"
                                type="radio"
                                name="parentsDeathYn"
                                onChange={handleChangeParentsDeathYn}
                                value="y"
                                checked={parentsDeathYn === 'y' ? true : false}
                            />
                            <span className="selectInputText">해당함</span>
                            <input
                                className="paramSelectInput"
                                type="radio"
                                name="parentsDeathYn"
                                onChange={handleChangeParentsDeathYn}
                                value="n"
                                checked={parentsDeathYn === 'n' ? true : false}
                            />
                            <span className="selectInputText">
                                해당하지 않음
                            </span>
                        </div>

                        <br />
                        <div className="paramSelect">
                            <span className="qualificationBoxTitle">
                                이혼 여부
                            </span>
                            <input
                                className="paramSelectInput"
                                type="radio"
                                name="divorceYn"
                                onChange={handleChangeDivorceYn}
                                value="y"
                                checked={divorceYn === 'y' ? true : false}
                            />
                            <span className="selectInputText">해당함</span>
                            <input
                                className="paramSelectInput"
                                type="radio"
                                name="divorceYn"
                                onChange={handleChangeDivorceYn}
                                value="n"
                                checked={divorceYn === 'n' ? true : false}
                            />
                            <span className="selectInputText">
                                해당하지 않음
                            </span>
                        </div>

                        <br />
                        <div className="paramSelect">
                            <span className="qualificationBoxTitle">
                                동일 주소지 거주 여부
                            </span>
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
                            <span className="selectInputText">해당함</span>
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
                        </div>

                        <br />

                        <div className="paramSelect">
                            <span className="qualificationBoxTitle">
                                해외 혹은 요양시설 체류 여부
                            </span>
                            <input
                                className="paramSelectInput"
                                type="radio"
                                name="stayOverYn"
                                onChange={handleChangeStayOverYn}
                                value="y"
                                checked={stayOverYn === 'y' ? true : false}
                            />
                            <span className="selectInputText">해당함</span>
                            <input
                                className="paramSelectInput"
                                type="radio"
                                name="stayOverYn"
                                onChange={handleChangeStayOverYn}
                                value="n"
                                checked={stayOverYn === 'n' ? true : false}
                            />
                            <span className="selectInputText">
                                해당하지 않음
                            </span>
                        </div>

                        <br />

                        <div className="paramSelect">
                            <span className="qualificationBoxTitle">
                                현재 해외 체류 여부
                            </span>
                            <input
                                className="paramSelectInput"
                                type="radio"
                                name="nowStayOverYn"
                                onChange={handleChangeNowStayOverYn}
                                value="y"
                                checked={nowStayOverYn === 'y' ? true : false}
                            />
                            <span className="selectInputText">해당함</span>
                            <input
                                className="paramSelectInput"
                                type="radio"
                                name="nowStayOverYn"
                                onChange={handleChangeNowStayOverYn}
                                value="n"
                                checked={nowStayOverYn === 'n' ? true : false}
                            />
                            <span className="selectInputText">
                                해당하지 않음
                            </span>
                        </div>

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

export default GeneralMinyeongPointPost;
