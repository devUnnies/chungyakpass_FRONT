import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import useInputState from '../../../components/Input/useInputState';
import { postNewlyMarriedKookminSpecialAptNum } from '../../../store/actions/newlyMarriedKookminSpecialAction';
import MainButton from '../../../components/Button/MainButton';
import { useHistory } from 'react-router-dom';
import '../SpecialSupply.css';

function NewlyMarriedKookminSpecialAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const newlyMarriedKookminSpecialAptNumStore = useSelector(
        (state) => state.newlyMarriedKookminSpecial
    );

    const [
        notificationNumber,
        setNotificationNumber,
        handleChangeNotificationNumber,
    ] = useInputState('');
    const [housingType, setHousingType, handleChangeHousingType] =
        useInputState('');
    const [
        exceptionHouseTf,
        setExceptionHouseTf,
        handleChangeExceptionHouseTf,
    ] = useInputState('');

    const handleSubmit = (event) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        event.preventDefault();

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            postNewlyMarriedKookminSpecialAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
                exceptionHouseTf: exceptionHouseTf,
            })
        );
    };

    const onClick = async () => {
        dispatch(
            postNewlyMarriedKookminSpecialAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
                exceptionHouseTf: exceptionHouseTf,
            })
        ); // api 연결 요청.

        const data =
            newlyMarriedKookminSpecialAptNumStore
                ?.postNewlyMarriedKookminSpecialAptNum?.data;
        console.log(JSON.stringify(data));
        history.push({
            pathname: '/specialNewlyMarriedKookminSpecial',
            state: {
                notificationNumber,
                housingType,
                exceptionHouseTf,
            },
        });
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 신혼부부 국민 공특법 적용 자격확인 페이지로 이동.
        if (
            newlyMarriedKookminSpecialAptNumStore?.postNewlyMarriedKookminSpecialAptNum
        ) {
            const data =
                newlyMarriedKookminSpecialAptNumStore
                    .postNewlyMarriedKookminSpecialAptNum.data;
        }
    }, [
        newlyMarriedKookminSpecialAptNumStore?.postNewlyMarriedKookminSpecialAptNum,
    ]);

    return (
        <>
            <div className="historiesInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">
                    신혼부부 국민주택(공특법 적용)
                </span>
            </div>
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
                        <div className="qulificationBox">
                            <span className="qulificaitonBoxTitle">
                                주택 예외사항 해당 여부
                            </span>
                            <input
                                className="isSupportInput"
                                type="radio"
                                name="supportYn"
                                onChange={handleChangeExceptionHouseTf}
                                value="y"
                                checked={
                                    exceptionHouseTf === 'y' ? true : false
                                }
                            />
                            <span className="InputText">해당함</span>
                            <input
                                className="isSupportInput"
                                type="radio"
                                name="supportYn"
                                onChange={handleChangeExceptionHouseTf}
                                value="n"
                                checked={
                                    exceptionHouseTf === 'n' ? true : false
                                }
                            />
                            <span className="InputText">해당하지 않음</span>
                        </div>

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

export default NewlyMarriedKookminSpecialAptNum;
