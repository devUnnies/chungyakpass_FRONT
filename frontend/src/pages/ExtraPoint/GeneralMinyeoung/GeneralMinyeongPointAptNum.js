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

    const [houseMemberId, setHouseMemberId, handleChangeNotificationNumber] =
        useInputState('');

    const [
        multiChildHouseholdType,
        setMultiChildHouseholdType,
        handleChangeMultiChildHouseholdType,
    ] = useInputState('');

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
        if (notificationNumber == '') {
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
        // 아파트 공고번호, 주택형 post 성공시 다자녀 민영 자격확인 페이지로 이동.
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
                        <input
                            type="number"
                            placeholder="아파트 공고번호"
                            value={notificationNumber}
                            onChange={handleChangeNotificationNumber}
                            className="aptNumInput"
                        />
                        <br />
                        <select
                            className="aptNumInput"
                            name="GeneralMinyeongPointPointType"
                            value={multiChildHouseholdType}
                            onChange={handleChangeMultiChildHouseholdType}
                        >
                            <option value="3세대이상">3세대 이상</option>
                            <option value="한부모가족">한부모가족</option>
                        </select>

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
