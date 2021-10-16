import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import useInputState from '../../../components/Input/useInputState';
import { postOldParentMinyeongAptNum } from '../../../store/actions/oldParentMinyeongAction';
import MainButton from '../../../components/Button/MainButton';
import { useHistory } from 'react-router-dom';
import '../SpecialSupply.css';

function OldParentMinyeongAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const oldParentMinyeongAptNumStore = useSelector(
        (state) => state.oldParentMinyeong
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
            postOldParentMinyeongAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
            })
        );
    };

    const onClick = async () => {
        if (notificationNumber == '' || housingType == '') {
            alert('아파트 분양정보 혹은 주택형 입력칸이 비어있습니다.');
        } else {
            dispatch(
                postOldParentMinyeongAptNum({
                    notificationNumber: notificationNumber,
                    housingType: housingType,
                })
            ); // api 연결 요청.

            const data =
                oldParentMinyeongAptNumStore.postOldParentMinyeongAptNum.data;
            console.log(JSON.stringify(data));
            history.push({
                pathname: '/specialOldParentMinyeong',
                props: {
                    notificationNumber,
                    housingType,
                },
            });
        }
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 노부모 민영 자격확인 페이지로 이동.
        if (oldParentMinyeongAptNumStore.postOldParentMinyeongAptNum) {
            const data =
                oldParentMinyeongAptNumStore.postOldParentMinyeongAptNum.data;
        }
    }, [oldParentMinyeongAptNumStore.postOldParentMinyeongAptNum]);

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
                                type="button"
                                onClick={onClick}
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

export default OldParentMinyeongAptNum;
