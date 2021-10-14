import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import useInputState from '../../../components/Input/useInputState';
import { postOldParentKookminAptNum } from '../../../store/actions/oldParentKookminAction';
import MainButton from '../../../components/Button/MainButton';
import { useHistory } from 'react-router-dom';

function OldParentKookminAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const oldParentKookminAptNumStore = useSelector(
        (state) => state.oldParentKookmin
    );

    const [
        notificationNumber,
        setNotificationNumber,
        handleChangeNotificationNumber,
    ] = useInputState('');
    const [housingType, setHousingType, handleChangeHousingType] =
        useInputState('');
    const [
        oldParentKookminType,
        setOldParentKookminType,
        handleChangeOldParentKookminType,
    ] = useInputState('');

    const handleSubmit = (event) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        event.preventDefault();

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            postOldParentKookminAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
                oldParentKookminType: oldParentKookminType,
            })
        );
    };

    const onClick = async () => {
        if (
            notificationNumber == '' ||
            housingType == '' ||
            oldParentKookminType == ''
        ) {
            alert('아파트 분양정보 혹은 주택형 입력칸이 비어있습니다.');
        } else {
            dispatch(
                postOldParentKookminAptNum({
                    notificationNumber: notificationNumber,
                    housingType: housingType,
                    oldParentKookminType: oldParentKookminType,
                })
            ); // api 연결 요청.

            const data =
                oldParentKookminAptNumStore.postOldParentKookminAptNum.data;
            console.log(JSON.stringify(data));
            history.push({
                pathname: '/specialOldParentKookmin',
                state: {
                    notificationNumber,
                    housingType,
                    oldParentKookminType,
                },
            });
        }
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 노부모 국민 자격확인 페이지로 이동.
        if (oldParentKookminAptNumStore.postOldParentKookminAptNum) {
            const data =
                oldParentKookminAptNumStore.postOldParentKookminAptNum.data;
        }
    }, [oldParentKookminAptNumStore.postOldParentKookminAptNum]);

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
                        <select
                            className="aptNumInput"
                            name="oldParentKookminType"
                            value={oldParentKookminType}
                            onChange={handleChangeOldParentKookminType}
                        >
                            <option value="">---선택---</option>
                            <option value="공공주택특별법 적용">
                                공공주택 특별법 적용
                            </option>
                            <option value="공공주택특별법 미적용">
                                공공주택 특별법 미적용
                            </option>
                            <option value="그외 국민주택">
                                그 외 국민주택
                            </option>
                        </select>

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

export default OldParentKookminAptNum;
