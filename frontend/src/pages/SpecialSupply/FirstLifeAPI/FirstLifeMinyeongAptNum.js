import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import useInputState from '../../../components/Input/useInputState';
import { HomeOutlined } from '@ant-design/icons';
import { postFirstInLifeMinyeongAptNum } from '../../../store/actions/firstInLifeMinyeongAction';
import { useHistory } from 'react-router-dom';

function FirstLifeMinyeongAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const firstLifeMinyeongStore = useSelector(
        (state) => state.firstInLifeMinyeong
    );

    const [form, setForm] = useState({
        name: '',
        firstRankHistoryYn: '',
    });
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

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
            postFirstInLifeMinyeongAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
            })
        );
    };

    // alert('일반공급 1순위인 경우에만 생애최초 자격확인이 가능합니다. ');
    const onClick = async () => {
        dispatch(
            postFirstInLifeMinyeongAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
            })
        ); // api 연결 요청.

        const data = firstLifeMinyeongStore.postFirstInLifeMinyeongAptNum.data;
        console.log(JSON.stringify(data));
        history.push({
            pathname: '/specialFirstLifeMinyeong',
            props: {
                notificationNumber,
                housingType,
            },
        });

        // 공통 정보 입력 오류 값에 의한 error 발생 시(data.error 값이 null이 아닌 경우) alert 창으로 접근 막음.
        // 공통 정보 입력 수정 페이지 생성 시 수정 페이지로 연결하기.
        if (data?.error === 'BAD_REQUEST') {
            alert(data?.code + '\n' + data?.message);
            history.push('/specialFirstLifeTypeSelect');
        }
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 생애최초 민영 자격확인 페이지로 이동.
        if (firstLifeMinyeongStore.postFirstInLifeMinyeongAptNum) {
            const data =
                firstLifeMinyeongStore.postFirstInLifeMinyeongAptNum.data;
        }
    }, [firstLifeMinyeongStore.postFirstInLifeMinyeongAptNum]);

    return (
        <>
            <div className="historiesInfoHeaderContainer">
                <span className="apt_title">
                    <span className="apt_titleIcon">
                        <HomeOutlined />
                    </span>
                    <strong className="apt_mainTitle">특별공급 </strong>
                    <span className="apt_subTitle">| 생애최초 민영주택</span>
                </span>
            </div>

            <div className="specialAptNumForm">
                <div className="specialAptNumContainer">
                    <form onSubmit={handleSubmit} className="specialAptNumform">
                        <input
                            type="number"
                            placeholder="아파트 공고번호"
                            value={notificationNumber}
                            onChange={handleChangeNotificationNumber}
                            className="specialAptNumInput"
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="주택형"
                            value={housingType}
                            onChange={handleChangeHousingType}
                            className="specialAptNumInput"
                            required
                        />
                        <br />

                        <div className="paramSelect">
                            <span className="qulificaitonBoxTitle">
                                <strong>일반공급 1순위 당첨 이력</strong>
                            </span>
                            <input
                                className="paramSelectInput"
                                type="radio"
                                name="firstRankHistoryYn"
                                onChange={onChange}
                                value="y"
                                checked={
                                    form.firstRankHistoryYn === 'y'
                                        ? true
                                        : false
                                }
                            />
                            <span className="selectInputText">존재</span>
                            <input
                                className="paramSelectInput"
                                type="radio"
                                name="firstRankHistoryYn"
                                onChange={onChange}
                                value="n"
                                checked={
                                    form.firstRankHistoryYn === 'n'
                                        ? true
                                        : false
                                }
                            />
                            <span className="selectInputText">미존재</span>
                        </div>

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

export default FirstLifeMinyeongAptNum;
