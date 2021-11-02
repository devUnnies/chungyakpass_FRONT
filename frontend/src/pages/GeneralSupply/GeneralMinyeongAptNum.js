import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input/Input';
import useInputState from '../../components/Input/useInputState';
import { postGeneralMinyeongAptNum } from '../../store/actions/generalMinyeongAction';
import MainButton from '../../components/Button/MainButton';
import { useHistory } from 'react-router-dom';
import './GeneralSupply.css';

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

    const handleSubmit = (event) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        event.preventDefault();

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            postGeneralMinyeongAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
            })
        );
    };

    const onClick = async () => {
        dispatch(
            postGeneralMinyeongAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
            })
        ); // api 연결 요청.

        const data = generalMinyeongAptNumStore.postGeneralMinyeongAptNum.data;
        console.log(JSON.stringify(data));
        history.push({
            pathname: '/generalMinyeong',
            props: {
                notificationNumber,
                housingType,
            },
        });

        // 공통 정보 입력 오류 값에 의한 error 발생 시(data.error 값이 null이 아닌 경우) alert 창으로 접근 막음.
        // 공통 정보 입력 수정 페이지 생성 시 수정 페이지로 연결하기.
        if (data?.error === 'BAD_REQUEST') {
            alert(data?.code + '\n' + data?.message);
            history.push('/');
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
            <div className="AptNumForm">
                <div className="aptNumContainer">
                    <form onSubmit={handleSubmit} className="aptNumform">
                        <input
                            type="number"
                            placeholder="아파트 공고번호"
                            value={notificationNumber}
                            onChange={handleChangeNotificationNumber}
                            className="aptNumInput"
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="주택형"
                            value={housingType}
                            onChange={handleChangeHousingType}
                            className="aptNumInput"
                            required
                        />
                        <br />

                        <span className="aptNumButton">
                            <MainButton
                                type="button"
                                onClick={onClick}
                                width="100"
                                height="35"
                                fontSize="15"
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
