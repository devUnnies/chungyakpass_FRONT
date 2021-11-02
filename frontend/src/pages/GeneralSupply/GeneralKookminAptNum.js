import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input/Input';
import useInputState from '../../components/Input/useInputState';
import {
    postGeneralKookminAptNum,
    RES_GENERAL_KOOKMIN_APTNUM_POST_ERROR,
} from '../../store/actions/generalKookminAction';
import MainButton from '../../components/Button/MainButton';
import { useHistory } from 'react-router-dom';
import './GeneralSupply.css';

function GeneralKookminAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const generalKookminAptNumStore = useSelector(
        (state) => state.generalKookmin
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
            postGeneralKookminAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
            })
        );
    };

    const onClick = async () => {
        dispatch(
            postGeneralKookminAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
            })
        ); // api 연결 요청.

        const data = generalKookminAptNumStore.postGeneralKookminAptNum.data;
        // console.log(JSON.stringify(data));
        history.push({
            pathname: '/generalKookmin',
            props: {
                notificationNumber,
                housingType,
            },
        });

        // 공통 정보 입력 오류 값에 의한 error 발생 시(data.error 값이 null이 아닌 경우) alert 창으로 접근 막음.
        // 공통 정보 입력 수정 페이지 생성 시 수정 페이지로 연결하기.
        if (
            generalKookminAptNumStore.postGeneralKookminAptNum?.data?.error ===
            'BAD_REQUEST'
        ) {
            alert(data?.code + '\n' + data?.message);
            history.push('/');
        }
    };

    // if (data == null) {
    //     // 공통정보 입력 값 미존재에 의한 오류일 경우 처리
    //     alert(
    //         '공통정보 입력 후 자격 확인 가능합니다.' +
    //             '\n' +
    //             '공통정보입력 페이지로 이동합니다.'
    //     );
    //     history.push('/addHouseHolder');

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 일반 민영 자격확인 페이지로 이동.
        if (generalKookminAptNumStore.postGeneralKookminAptNum) {
            const data =
                generalKookminAptNumStore.postGeneralKookminAptNum.data;
        }
    }, [generalKookminAptNumStore.postGeneralKookminAptNum]);

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

export default GeneralKookminAptNum;
