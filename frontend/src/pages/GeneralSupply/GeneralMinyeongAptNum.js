import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input/Input';
import useInputState from '../../components/Input/useInputState';
import { postGeneralMinyeongAptNum } from '../../store/actions/generalMinyeongAction';
import MainButton from '../../components/Button/MainButton';
import { useHistory } from 'react-router-dom';

function GeneralMinyeongAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const generalMinyeongAptNumStore = useSelector(
        (state) => state.generalMinyeong
    );

    const [
        notificationNumber,
        setNotificationNumber,
        handleChangeNotificationNumber,
    ] = useInputState('');
    const [housingType, setHousingType, handleChangeHousingType] =
        useInputState('');

    // 가입하기 버튼을 누르면 실행하는 함수
    const handleSubmit = useCallback(
        (event) => {
            // 이전의 값을 가지고 와서 기본값으로 세팅
            event.preventDefault();

            const userForm = {
                notificationNumber: notificationNumber,
                housingType: housingType,
            };

            // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
            dispatch(postGeneralMinyeongAptNum(userForm));
        },
        [notificationNumber, housingType]
    );

    const onClick = async () => {
        if (notificationNumber == '' || housingType == '') {
            alert('아파트 분양정보 혹은 주택형 입력칸이 비어있습니다.');
        } else {
            dispatch(postGeneralMinyeongAptNum()); // api 연결 요청.
            const data =
                generalMinyeongAptNumStore.postGeneralMinyeongAptNum.data;
            console.log(JSON.stringify(data));
            history.push({
                pathname: '/generalMinyeong',
                props: {
                    notificationNumber,
                    housingType,
                },
            });
        }
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 일반 민영 자격확인 페이지로 이동.
        if (generalMinyeongAptNumStore.postGeneralMinyeongAptNum) {
            const data =
                generalMinyeongAptNumStore.postGeneralMinyeongAptNum.data;
        }
    }, [generalMinyeongAptNumStore.postGeneralMinyeongAptNum]);

    return (
        <>
            <div className="minyeongAptNumForm">
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
                        <input
                            type="text"
                            placeholder="주택형"
                            value={housingType}
                            onChange={handleChangeHousingType}
                            className="aptNumInput"
                        />
                        <br />

                        <span className="aptNumButton">
                            <MainButton
                                onClick={onClick}
                                // onClick 시에 일반민영 자격확인 페이지로 이동 및 데이터 전달.
                                // onClick={() => {
                                //     if (
                                //         notificationNumber == '' ||
                                //         housingType == ''
                                //     ) {
                                //         alert(
                                //             '아파트 분양정보 혹은 주택형 입력칸이 비어있습니다.'
                                //         );
                                //     } else {
                                //         history.push({
                                //             pathname: '/general/minyeong',
                                //             props: {
                                //                 notificationNumber,
                                //                 housingType,
                                //             },
                                //         });
                                //     }
                                // }}
                                width="100"
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

export default GeneralMinyeongAptNum;
