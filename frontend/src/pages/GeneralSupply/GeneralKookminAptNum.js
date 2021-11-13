import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input/Input';
import useInputState from '../../components/Input/useInputState';
import { HomeOutlined, CheckOutlined } from '@ant-design/icons';
import {
    postGeneralKookminAptNum,
    RES_GENERAL_KOOKMIN_APTNUM_POST_ERROR,
} from '../../store/actions/generalKookminAction';
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
        if (notificationNumber === '' || housingType === '') {
            alert('아파트 공고번호 혹은 주택형 입력칸이 비어있습니다.');
        } else {
            dispatch(
                postGeneralKookminAptNum({
                    notificationNumber: notificationNumber,
                    housingType: housingType,
                })
            ); // api 연결 요청.

            const data =
                generalKookminAptNumStore.postGeneralKookminAptNum.data;
            // console.log(JSON.stringify(data));
            history.push({
                pathname: '/generalKookmin',
                props: {
                    notificationNumber,
                    housingType,
                },
            });
        }
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 일반 민영 자격확인 페이지로 이동.
        if (generalKookminAptNumStore.postGeneralKookminAptNum) {
            const data =
                generalKookminAptNumStore.postGeneralKookminAptNum.data;
        }
    }, [generalKookminAptNumStore.postGeneralKookminAptNum]);

    return (
        <>
            <div className="historiesInfoHeaderContainer">
                <span className="apt_title">
                    <span className="apt_titleIcon">
                        <HomeOutlined />
                    </span>
                    <strong className="apt_mainTitle">일반공급 </strong>
                    <span className="apt_subTitle">| 국민주택</span>
                </span>
            </div>

            <div className="generalAptNumForm">
                <div className="generalAptNumContainer">
                    <form onSubmit={handleSubmit} className="generalAptNumform">
                        <div className="apt_subPlusTitle">
                            <span className="checkRedIcon">
                                <CheckOutlined />
                            </span>
                            아파트 분양 정보 입력
                        </div>

                        <input
                            type="number"
                            placeholder="아파트 공고번호"
                            value={notificationNumber}
                            onChange={handleChangeNotificationNumber}
                            className="generalAptNumInput"
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="주택형"
                            value={housingType}
                            onChange={handleChangeHousingType}
                            className="generalAptNumInput"
                            required
                        />
                        <br />

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

export default GeneralKookminAptNum;
