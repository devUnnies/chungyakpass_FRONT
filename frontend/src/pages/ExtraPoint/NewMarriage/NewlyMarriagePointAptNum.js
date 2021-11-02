import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import useInputState from '../../../components/Input/useInputState';
import { postNewlyMarriagePointAptNum } from '../../../store/actions/pointSpecialNewlyMarriageAction';
import MainButton from '../../../components/Button/MainButton';
import { useHistory } from 'react-router-dom';
import './NewlyMarriagePoint.css';

function NewlyMarriagePointAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const newlyMarriageAptNumStore = useSelector(
        (state) => state.newlyMarriagePoint
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
            postNewlyMarriagePointAptNum({
                notificationNumber: notificationNumber,
            })
        );
    };

    const onClick = async () => {
        dispatch(
            postNewlyMarriagePointAptNum({
                notificationNumber: notificationNumber,
            })
        ); // api 연결 요청.

        const data =
            newlyMarriageAptNumStore?.postNewlyMarriagePointAptNum?.data;
        console.log(JSON.stringify(data));
        history.push({
            pathname: '/point/newlyMarriage',
            state: {
                notificationNumber,
            },
        });
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 신혼부부 가배점 확인 페이지로 이동.
        if (newlyMarriageAptNumStore?.postNewlyMarriagePointAptNum) {
            const data =
                newlyMarriageAptNumStore.postNewlyMarriagePointAptNum.data;
        }
    }, [newlyMarriageAptNumStore?.postNewlyMarriagePointAptNum]);

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

export default NewlyMarriagePointAptNum;
