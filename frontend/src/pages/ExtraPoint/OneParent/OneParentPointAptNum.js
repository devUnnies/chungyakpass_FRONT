import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import useInputState from '../../../components/Input/useInputState';
import { postOneParentPointAptNum } from '../../../store/actions/pointSpecialOneParentAction';
import MainButton from '../../../components/Button/MainButton';
import { useHistory } from 'react-router-dom';
import './OneParentPoint.css';

function OneParentPointAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const oneParentPointAptNumStore = useSelector(
        (state) => state.oneParentPoint
    );

    const [
        notificationNumber,
        setNotificationNumber,
        handleChangeNotificationNumber,
    ] = useInputState('');

    const handleSubmit = (event) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        event.preventDefault();

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            postOneParentPointAptNum({
                notificationNumber: notificationNumber,
            })
        );
    };

    const onClick = async () => {
        dispatch(
            postOneParentPointAptNum({
                notificationNumber: notificationNumber,
            })
        ); // api 연결 요청.

        const data = oneParentPointAptNumStore?.postOneParentPointAptNum?.data;
        console.log(JSON.stringify(data));
        history.push({
            pathname: '/point/oneParent',
            state: {
                notificationNumber,
            },
        });

        if (
            oneParentPointAptNumStore?.postOneParentPointAptNum?.data?.error ===
            'NOT_FOUND'
        ) {
            alert('가/배점을 확인할 수 없습니다.' + '\n' + data?.message);
            history.push('/');
        }
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 한부모 가배점 확인 페이지로 이동.
        if (oneParentPointAptNumStore?.postOneParentPointAptNum) {
            const data =
                oneParentPointAptNumStore.postOneParentPointAptNum.data;
        }
    }, [oneParentPointAptNumStore?.postOneParentPointAptNum]);

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
                        />

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

export default OneParentPointAptNum;
