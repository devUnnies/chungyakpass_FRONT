import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import useInputState from '../../../components/Input/useInputState';
import { postGeneralMinyeongPoint } from '../../../store/actions/pointGeneralMinyeongAction';
import MainButton from '../../../components/Button/MainButton';
import { useHistory } from 'react-router-dom';
import './GeneralMinyeongPoint.css';

function GeneralMinyeongPoint(props) {
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
                sameResidentRegistrationYn: isameResidentRegistrationYn,
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
                    sameResidentRegistrationYn: isameResidentRegistrationYn,
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
            <div className="AptNumForm">
                <div className="container">
                    <form onSubmit={handleSubmit} className="aptNumform">
                        <span className="qulificaitonBox">부모 사망 여부</span>
                        <input
                            className="isSupportInput"
                            type="radio"
                            name="supportYn"
                            onChange={handleChangeParentsDeathYn}
                            value="y"
                            checked={parentsDeathYn === 'y' ? true : false}
                        />
                        <span className="InputText">해당함</span>
                        <input
                            className="isSupportInput"
                            type="radio"
                            name="supportYn"
                            onChange={handleChangeParentsDeathYn}
                            value="n"
                            checked={parentsDeathYn === 'n' ? true : false}
                        />
                        <span className="InputText">해당하지 않음</span>

                        <br />

                        <span className="qulificaitonBox">이혼 여부</span>
                        <input
                            className="isSupportInput"
                            type="radio"
                            name="supportYn"
                            onChange={handleChangeDivorceYn}
                            value="y"
                            checked={divorceYn === 'y' ? true : false}
                        />
                        <span className="InputText">해당함</span>
                        <input
                            className="isSupportInput"
                            type="radio"
                            name="supportYn"
                            onChange={handleChangeDivorceYn}
                            value="n"
                            checked={divorceYn === 'n' ? true : false}
                        />
                        <span className="InputText">해당하지 않음</span>

                        <br />

                        <span className="qulificaitonBox">
                            동일 주소지 거주 여부
                        </span>
                        <input
                            className="isSupportInput"
                            type="radio"
                            name="supportYn"
                            onChange={handleChangeSameResidentRegistrationYn}
                            value="y"
                            checked={
                                sameResidentRegistrationYn === 'y'
                                    ? true
                                    : false
                            }
                        />
                        <span className="InputText">해당함</span>
                        <input
                            className="isSupportInput"
                            type="radio"
                            name="supportYn"
                            onChange={handleChangeSameResidentRegistrationYn}
                            value="n"
                            checked={
                                sameResidentRegistrationYn === 'n'
                                    ? true
                                    : false
                            }
                        />
                        <span className="InputText">해당하지 않음</span>

                        <br />

                        <span className="qulificaitonBox">
                            해외 혹은 요양시설 체류 여부
                        </span>
                        <input
                            className="isSupportInput"
                            type="radio"
                            name="supportYn"
                            onChange={handleChangeStayOverYn}
                            value="y"
                            checked={stayOverYn === 'y' ? true : false}
                        />
                        <span className="InputText">해당함</span>
                        <input
                            className="isSupportInput"
                            type="radio"
                            name="supportYn"
                            onChange={handleChangeStayOverYn}
                            value="n"
                            checked={stayOverYn === 'n' ? true : false}
                        />
                        <span className="InputText">해당하지 않음</span>

                        <br />

                        <span className="qulificaitonBox">
                            현재 해외 체류 여부
                        </span>
                        <input
                            className="isSupportInput"
                            type="radio"
                            name="supportYn"
                            onChange={handleChangeNowStayOverYn}
                            value="y"
                            checked={nowStayOverYn === 'y' ? true : false}
                        />
                        <span className="InputText">해당함</span>
                        <input
                            className="isSupportInput"
                            type="radio"
                            name="supportYn"
                            onChange={handleChangeNowStayOverYn}
                            value="n"
                            checked={nowStayOverYn === 'n' ? true : false}
                        />
                        <span className="InputText">해당하지 않음</span>

                        <span className="aptNumButton">
                            <MainButton
                                type="button"
                                onClick={onClick}
                                width="80"
                                height="35"
                                fontSize="13"
                                margin="5"
                            >
                                다음
                            </MainButton>
                        </span>
                    </form>
                </div>
            </div>
        </>
    );
}

export default GeneralMinyeongPoint;
