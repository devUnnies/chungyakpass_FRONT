import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    CrownOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import './GeneralSupply.css';

const GeneralSupply = ({ onSaveData }) => {
    const firstRankResult = () => {
        if (
            window.confirm(
                '축하드립니다. 1순위입니다 ! \n순위 확인 페이지로 이동시려면 "확인" 버튼을, \n아니면 "취소" 버튼을 눌러주시기 바랍니다.'
            )
        ) {
            // 순위 확인 페이지 만들어서 추가.
        } else {
            return;
        }
    };

    const secondRankResult = () => {
        if (
            window.confirm(
                '2순위입니다 ! \n\n자격 조건을 수정하시려면 "취소" 버튼을, \n순위 확인 페이지로 이동하시려면 "확인" 버튼을 눌러주시기 바랍니다.'
            )
        ) {
            // 순위 확인 페이지 만들어서 추가.
        } else {
            return;
        }
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        name: '',
        aptInfo: '',
        passbookYn: '',
        age: '',
        supportYn: '',
        householderYn: '',
        lifeYn: '',
        adultHouseholderYn: '',
        historyYn: '',
        houseOwnedYn: '',
        joinTerm: '',
        payment: '',
        supplyTypeYn: '',
    });
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveData(form);
        console.log(form);
        setForm({
            name: '',
            aptInfo: '',
            passbookYn: '',
            age: '',
            supportYn: '',
            householderYn: '',
            lifeYn: '',
            adultHouseholderYn: '',
            historyYn: '',
            houseOwnedYn: '',
            joinTerm: '',
            payment: '',
            supplyTypeYn: '',
        });
    };

    const fetchUsers = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setLoading(true); // 로딩 시작
            const res = await axios.get(
                '' // api 주소
            );
        } catch (e) {
            setError(e);
        }
        setLoading(false); // 로딩 끝
    };

    if (loading) return <div>LOADING ...</div>; // 로딩상태 활성화
    if (error) return <div>ERROR</div>;
    return (
        <>
            <div className="general_title">
                <h3 className="general_mainTitle">
                    {' '}
                    일반공급{' '}
                    <span className="general_subTitle"> | 자격 확인 </span>{' '}
                </h3>
            </div>
            <form onSubmit={handleSubmit} className="generalSupply_form">
                <table className="general_table">
                    {/* 규제지역 판단. (규제지역 로직 결과값 넣기.)*/}
                    <tr className="general_phase">
                        <td className="qulificaiton">
                            청약 신청한 아파트의 해당 지역(지구)
                            <span className="info_tooltip">
                                <InfoCircleOutlined />
                                <span class="tooltip-text">
                                    <p>
                                        규제 지역('투기과열지구' 혹은
                                        '청약과열지역') ?
                                    </p>
                                    정부에서 주로 부동산의 투기 방지, 주택 시장
                                    안정화 등을 위해 지정하여 관리하는 지역을
                                    의미함.
                                </span>
                            </span>
                        </td>

                        <select
                            className="aptInfoSelect"
                            name="aptInfo"
                            value={form.aptInfo}
                            onChange={onChange}
                            required
                        >
                            <option value=""> ---선택--- </option>
                            <option value="규제지역">규제지역</option>
                            <option value="위축지역">위축지역</option>
                            <option value="수도권">수도권</option>
                            <option value="수도권">수도권 외</option>
                        </select>
                    </tr>

                    {form.aptInfo !== '' ? (
                        <tr className="general_phase">
                            <td className="qulificaiton">
                                청약통장 조건 충족 여부
                            </td>
                            <span className="general_result">
                                <input
                                    className="isPassbookInput"
                                    type="radio"
                                    name="passbookYn"
                                    onChange={onChange}
                                    value="y"
                                    checked={
                                        form.passbookYn === 'y' ? true : false
                                    }
                                />
                                <span className="InputText">예</span>
                                <input
                                    className="isPassbookInput"
                                    type="radio"
                                    name="passbookYn"
                                    onChange={onChange}
                                    value="n"
                                    checked={
                                        form.passbookYn === 'n' ? true : false
                                    }
                                />
                                <span className="InputText">아니오</span>
                            </span>
                            {form.passbookYn === 'y' ? (
                                <span className="progress">
                                    <CheckCircleOutlined />
                                </span>
                            ) : null}
                            {form.passbookYn === 'n' ? (
                                <span className="pause_tooltip">
                                    <CloseCircleOutlined />
                                    <span class="tooltip-text">
                                        청약 통장 조건 미충족 시 부적격 발생.
                                    </span>
                                </span>
                            ) : null}
                        </tr>
                    ) : (
                        <></>
                    )}

                    {
                        /* 추후 나이 계산 로직 연결해 나이 받아오기.*/
                        form.passbookYn === 'y' ? (
                            <tr className="general_phase">
                                <td className="qulificaiton">나이</td>
                                <span className="general_result">
                                    {
                                        /* 나이 입력값 있을 경우만 '만' 뜨도록.*/
                                        form.age !== '' ? (
                                            <span>만</span>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    <input
                                        className="ageInput"
                                        type="number"
                                        name="age"
                                        onChange={onChange}
                                        value={form.age}
                                        required
                                    />
                                    세
                                </span>
                            </tr>
                        ) : (
                            <></>
                        )
                    }

                    {form.passbookYn === 'y' &&
                    form.age !== '' &&
                    form.age < 19 ? (
                        <tr className="general_phase">
                            <td className="qulificaiton">
                                <span className="qulificaitonBox">
                                    세대주 여부
                                </span>
                            </td>
                            <span className="general_result">
                                <input
                                    className="ishouseholderInput"
                                    type="radio"
                                    name="householderYn"
                                    onChange={onChange}
                                    value="y"
                                    checked={
                                        form.householderYn === 'y'
                                            ? true
                                            : false
                                    }
                                />
                                <span className="InputText">예</span>
                                <input
                                    className="ishouseholderInput"
                                    type="radio"
                                    name="householderYn"
                                    onChange={onChange}
                                    value="n"
                                    checked={
                                        form.householderYn === 'n'
                                            ? true
                                            : false
                                    }
                                />
                                <span className="InputText">아니오</span>
                            </span>
                            {form.householderYn === 'y' ? (
                                <span className="progress">
                                    <CheckCircleOutlined />
                                </span>
                            ) : null}
                            {form.householderYn === 'n' ? (
                                <span className="pause_tooltip">
                                    <CloseCircleOutlined />
                                    <span class="tooltip-text">
                                        만 19세 미만 미성년자는 세대주일
                                        경우에만 해당 청약이 신청 진행 가능.
                                    </span>
                                </span>
                            ) : null}
                        </tr>
                    ) : (
                        <></>
                    )}

                    {form.passbookYn === 'y' &&
                    form.age !== '' &&
                    form.age < 19 &&
                    form.householderYn === 'y' ? (
                        <tr className="general_phase">
                            <td className="qulificaiton">
                                형제, 자매 부양하는가?
                            </td>
                            <span className="general_result">
                                <input
                                    className="isSupprtInput"
                                    type="radio"
                                    name="supportYn"
                                    onChange={onChange}
                                    value="y"
                                    checked={
                                        form.supportYn === 'y' ? true : false
                                    }
                                />
                                <span className="InputText">예</span>
                                <input
                                    className="isSupprtInput"
                                    type="radio"
                                    name="supportYn"
                                    onChange={onChange}
                                    value="n"
                                    checked={
                                        form.supportYn === 'n' ? true : false
                                    }
                                />
                                <span className="InputText">아니오</span>
                            </span>
                            {form.supportYn === 'y' ? (
                                <span className="progress">
                                    <CheckCircleOutlined />
                                </span>
                            ) : null}
                            {form.supportYn === 'n' ? (
                                <span className="pause_tooltip">
                                    <CloseCircleOutlined />
                                    <span class="tooltip-text">
                                        만 19세 미만 미성년자는 세대주이면서
                                        부양할 가족이 있는 경우에만 해당 청약이
                                        신청 진행 가능.
                                    </span>
                                </span>
                            ) : null}
                        </tr>
                    ) : (
                        <></>
                    )}

                    {
                        // 20대 단독세대주 조건 판별
                        form.passbookYn === 'y' &&
                        form.age !== '' &&
                        form.age >= 19 &&
                        form.age < 30 ? (
                            <tr className="general_phase">
                                <td className="qulificaiton">
                                    <span className="qulificaitonBox">
                                        소득이 있으면서 독립적으로 생계 유지가
                                        가능한가?
                                    </span>
                                    <span className="info_tooltip">
                                        <InfoCircleOutlined />
                                        <span class="tooltip-text">
                                            <p>미혼 20대 단독세대주 ?</p>
                                            20대이며, 최저 생계비 (기준중위소득
                                            40%, 약 월 70만원) 이상의 소득이
                                            존재해야 함.
                                        </span>
                                    </span>
                                </td>
                                <span className="general_result">
                                    <input
                                        className="isLifeInput"
                                        type="radio"
                                        name="lifeYn"
                                        onChange={onChange}
                                        value="y"
                                        checked={
                                            form.lifeYn === 'y' ? true : false
                                        }
                                    />
                                    <span className="InputText">예</span>
                                    <input
                                        className="isLifelihoodInput"
                                        type="radio"
                                        name="lifeYn"
                                        onChange={onChange}
                                        value="n"
                                        checked={
                                            form.lifeYn === 'n' ? true : false
                                        }
                                    />
                                    <span className="InputText">아니오</span>
                                </span>
                                {form.lifeYn === 'y' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : null}
                                {form.lifeYn === 'n' ? (
                                    <span className="pause_tooltip">
                                        <CloseCircleOutlined />
                                        <span class="tooltip-text">
                                            20대 단독세대주가 아닐 경우 해당
                                            청약 진행 불가
                                        </span>
                                    </span>
                                ) : null}
                            </tr>
                        ) : (
                            <></>
                        )
                    }

                    {
                        // 규제지역 true일 경우 조건 1.
                        form.passbookYn === 'y' &&
                        form.age !== '' &&
                        form.aptInfo === '규제지역' &&
                        ((form.age >= 19 &&
                            form.age < 30 &&
                            form.lifeYn === 'y') ||
                            form.age >= 30) ? ( // 미성년자의 경우 보이지 않도록.
                            <tr className="general_phase">
                                <td className="qulificaiton">
                                    <span className="qulificaitonBox">
                                        세대주 여부
                                    </span>
                                </td>
                                <span className="general_result">
                                    <input
                                        className="isadultHouseholderInput"
                                        type="radio"
                                        name="adultHouseholderYn"
                                        onChange={onChange}
                                        value="y"
                                        checked={
                                            form.adultHouseholderYn === 'y'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="InputText">예</span>
                                    <input
                                        className="isadultHouseholderInput"
                                        type="radio"
                                        name="adultHouseholderYn"
                                        onChange={onChange}
                                        value="n"
                                        checked={
                                            form.adultHouseholderYn === 'n'
                                                ? true
                                                : false
                                        }
                                        onClick={secondRankResult}
                                    />
                                    <span className="InputText">아니오</span>
                                </span>
                                {form.adultHouseholderYn === 'y' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : null}
                                {form.adultHouseholderYn === 'n' ? (
                                    <span className="secondRank">
                                        2순위입니다
                                        <span className="secondRankTootip">
                                            <SmileOutlined />
                                            <span class="tooltip-text"></span>
                                        </span>
                                    </span>
                                ) : null}
                            </tr>
                        ) : (
                            <></>
                        )
                    }

                    {
                        /* 순위 판별 조건. */
                        form.passbookYn === 'y' &&
                        form.age !== '' && // 규제지역이 아닌 경우
                        ((form.aptInfo !== '규제지역' &&
                            form.aptInfo !== '' &&
                            ((form.age < 19 &&
                                form.householderYn === 'y' &&
                                form.supportYn === 'y') ||
                                (form.age >= 19 &&
                                    form.age < 30 &&
                                    form.lifeYn === 'y') ||
                                form.age >= 30)) ||
                            // 규제지역인 경우
                            (form.aptInfo === '규제지역' &&
                                ((form.age < 19 &&
                                    form.householderYn === 'y' &&
                                    form.supportYn === 'y') ||
                                    (form.age >= 19 &&
                                        form.age < 30 &&
                                        form.lifeYn === 'y' &&
                                        form.adultHouseholderYn === 'y') ||
                                    (form.age >= 30 &&
                                        form.adultHouseholderYn === 'y')))) ? (
                            <tr className="general_phase">
                                <td className="qulificaiton">
                                    2주택 이상 소유 여부
                                </td>
                                <span className="general_result">
                                    <input
                                        className="isHouseOwnedInput"
                                        type="radio"
                                        name="houseOwnedYn"
                                        onChange={onChange}
                                        value="y"
                                        checked={
                                            form.houseOwnedYn === 'y'
                                                ? true
                                                : false
                                        }
                                        onClick={secondRankResult}
                                    />
                                    <span className="InputText">예</span>
                                    <input
                                        className="isHouseOwnedInput"
                                        type="radio"
                                        name="houseOwnedYn"
                                        onChange={onChange}
                                        value="n"
                                        checked={
                                            form.houseOwnedYn === 'n'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="InputText">아니오</span>
                                </span>
                                {form.houseOwnedYn === 'n' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : null}
                                {form.houseOwnedYn === 'y' ? (
                                    <span className="secondRank">
                                        2순위
                                        <span className="secondRankTootip">
                                            <SmileOutlined />
                                            <span class="tooltip-text">
                                                1순위? 2주택 미만 소유
                                            </span>
                                        </span>
                                    </span>
                                ) : null}
                            </tr>
                        ) : (
                            <></>
                        )
                    }

                    {
                        // 규제지역 true일 경우 조건 2.
                        // 이미 나이를 입력하고 각 나이 조건별 클릭값 입력했을 경우 데이터 미리 처리됨.
                        form.passbookYn === 'y' &&
                        form.age !== '' &&
                        form.aptInfo === '규제지역' &&
                        form.houseOwnedYn === 'n' &&
                        ((form.age < 19 &&
                            form.householderYn === 'y' &&
                            form.supportYn === 'y') ||
                            (form.age >= 19 &&
                                form.age < 30 &&
                                form.lifeYn === 'y' &&
                                form.adultHouseholderYn === 'y') ||
                            (form.age >= 30 &&
                                form.adultHouseholderYn === 'y')) ? (
                            <tr className="general_phase">
                                <td className="qulificaiton">
                                    전 세대원이 5년 이내 청약 당첨 이력이
                                    존재하는가?
                                </td>
                                <span className="general_result">
                                    <input
                                        className="isHistoryInput"
                                        type="radio"
                                        name="historyYn"
                                        onChange={onChange}
                                        value="y"
                                        checked={
                                            form.historyYn === 'y'
                                                ? true
                                                : false
                                        }
                                        onClick={secondRankResult}
                                    />
                                    <span className="InputText">예</span>
                                    <input
                                        className="isHistoryInput"
                                        type="radio"
                                        name="historyYn"
                                        onChange={onChange}
                                        value="n"
                                        checked={
                                            form.historyYn === 'n'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="InputText">아니오</span>
                                </span>
                                {form.historyYn === 'n' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : null}
                                {form.historyYn === 'y' ? (
                                    <span className="secondRank">
                                        2순위
                                        <span className="secondRankTootip">
                                            <SmileOutlined />
                                            <span class="tooltip-text">
                                                {' '}
                                                1순위? 5년 이내 세대구성원의
                                                청약당첨이력 전무
                                            </span>
                                        </span>
                                    </span>
                                ) : null}
                            </tr>
                        ) : (
                            <></>
                        )
                    }

                    {
                        /* 청약통장 가입 기간을 충족하는가? */
                        form.passbookYn === 'y' &&
                        form.age !== '' &&
                        form.houseOwnedYn === 'n' &&
                        // 규제지역이 아닌경우
                        ((form.aptInfo !== '규제지역' &&
                            form.aptInfo !== '' &&
                            ((form.age < 19 &&
                                form.householderYn === 'y' &&
                                form.supportYn === 'y') ||
                                (form.age >= 19 &&
                                    form.age < 30 &&
                                    form.lifeYn === 'y') ||
                                form.age >= 30)) ||
                            // 규제지역인 경우
                            (form.aptInfo === '규제지역' &&
                                form.historyYn === 'n' &&
                                ((form.age < 19 &&
                                    form.householderYn === 'y' &&
                                    form.supportYn === 'y') ||
                                    (form.age >= 19 &&
                                        form.age < 30 &&
                                        form.lifeYn === 'y' &&
                                        form.adultHouseholderYn === 'y') ||
                                    (form.age >= 30 &&
                                        form.adultHouseholderYn === 'y')))) ? (
                            <tr className="general_phase">
                                <td className="qulificaiton">
                                    청약통장 가입기간
                                    <span className="info_tooltip">
                                        <InfoCircleOutlined />
                                        <span class="tooltip-text">
                                            <table border="1">
                                                <tr>
                                                    <td>지역</td>
                                                    <td>규제지역</td>
                                                    <td>위축 지역</td>
                                                    <td>수도권</td>
                                                    <td>수도권 외</td>
                                                </tr>
                                                <tr>
                                                    <td>가입 기간</td>
                                                    <td>24개월</td>
                                                    <td>1개월</td>
                                                    <td>12개월</td>
                                                    <td>6개월</td>
                                                </tr>
                                            </table>
                                        </span>
                                    </span>
                                </td>
                                <span className="general_result">
                                    <input
                                        className="joinTermInput"
                                        type="number"
                                        name="joinTerm"
                                        onChange={onChange}
                                        value={form.joinTerm}
                                        required
                                    />{' '}
                                    개월 &nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                                {(form.aptInfo === '규제지역' &&
                                    form.joinTerm >= 24) ||
                                (form.aptInfo === '위축지역' &&
                                    form.joinTerm >= 1) ||
                                (form.aptInfo === '수도권' &&
                                    form.joinTerm >= 12) ||
                                (form.aptInfo === '수도권 외' &&
                                    form.joinTerm >= 6 &&
                                    form.joinTerm !== '') ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : null}
                                {form.joinTerm > 0 &&
                                ((form.aptInfo === '규제지역' &&
                                    form.joinTerm < 24) ||
                                    (form.aptInfo === '위축지역' &&
                                        form.joinTerm < 1) ||
                                    (form.aptInfo === '수도권' &&
                                        form.joinTerm < 12) ||
                                    (form.aptInfo === '수도권 외' &&
                                        form.joinTerm < 6)) &&
                                form.joinTerm !== '' ? (
                                    <span className="secondRank">
                                        2순위
                                        <span className="secondRankTootip">
                                            <SmileOutlined />
                                            <span class="tooltip-text">
                                                1순위? 청약통장 가입기간 조건
                                                재확인 필요
                                                <p>
                                                    (* 청약통장 가입기간 테이블
                                                    참고)
                                                </p>
                                            </span>
                                        </span>
                                    </span>
                                ) : null}
                            </tr>
                        ) : (
                            <></>
                        )
                    }

                    {
                        /*예치 금액 조건을 충족하는가? (납부 금액과 지역별 예치 금액 비교 로직 끌어오기)*/
                        form.passbookYn === 'y' &&
                        form.age !== '' &&
                        form.houseOwnedYn === 'n' &&
                        form.joinTerm >= 12 &&
                        // 규제지역이 아닌경우
                        ((form.aptInfo !== '규제지역' &&
                            form.aptInfo !== '' &&
                            ((form.age < 19 &&
                                form.householderYn === 'y' &&
                                form.supportYn === 'y') ||
                                (form.age >= 19 &&
                                    form.age < 30 &&
                                    form.lifeYn === 'y') ||
                                form.age >= 30)) ||
                            // 규제지역인 경우
                            (form.aptInfo === '규제지역' &&
                                form.historyYn === 'n' &&
                                ((form.age < 19 &&
                                    form.householderYn === 'y' &&
                                    form.supportYn === 'y') ||
                                    (form.age >= 19 &&
                                        form.age < 30 &&
                                        form.lifeYn === 'y' &&
                                        form.adultHouseholderYn === 'y') ||
                                    (form.age >= 30 &&
                                        form.adultHouseholderYn === 'y')))) ? (
                            <tr className="general_phase">
                                <td className="qulificaiton">
                                    예치 금액
                                    <span className="info_tooltip">
                                        <InfoCircleOutlined />
                                        <span class="tooltip-text">
                                            <table border="1">
                                                <tr>
                                                    <td>구분</td>
                                                    <td>서울/부산</td>
                                                    <td>기타 광역시</td>
                                                    <td>기타 시/군</td>
                                                </tr>
                                                <tr>
                                                    <td>85㎡ 이하</td>
                                                    <td>300만원</td>
                                                    <td>250만원</td>
                                                    <td>200만원</td>
                                                </tr>
                                                <tr>
                                                    <td>102㎡ 이하</td>
                                                    <td>600만원</td>
                                                    <td>400만원</td>
                                                    <td>300만원</td>
                                                </tr>
                                                <tr>
                                                    <td>135㎡ 이하</td>
                                                    <td>1000만원</td>
                                                    <td>700만원</td>
                                                    <td>400만원</td>
                                                </tr>
                                                <tr>
                                                    <td>모든 면적</td>
                                                    <td>1500만원</td>
                                                    <td>1000만원</td>
                                                    <td>500만원</td>
                                                </tr>
                                            </table>
                                        </span>
                                    </span>
                                </td>
                                <span className="general_result">
                                    <input
                                        className="paymentInput"
                                        type="number"
                                        name="payment"
                                        onChange={onChange}
                                        value={form.payment}
                                        required
                                    />{' '}
                                    만원 &nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                                {form.payment >= 300 ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : null}
                                {form.payment < 300 && form.payment !== '' ? (
                                    <span className="secondRank">
                                        2순위
                                        <span className="secondRankTootip">
                                            <SmileOutlined />
                                            <span class="tooltip-text">
                                                1순위? 예치 금액 조건 재확인
                                                필요.
                                                <p>(* 예치 금액 테이블 참고)</p>
                                            </span>
                                        </span>
                                    </span>
                                ) : null}
                            </tr>
                        ) : (
                            <></>
                        )
                    }

                    {form.passbookYn === 'y' &&
                    form.age !== '' &&
                    form.houseOwnedYn === 'n' &&
                    form.joinTerm >= 12 &&
                    form.payment >= 300 &&
                    // 규제지역이 아닌경우
                    ((form.aptInfo !== '규제지역' &&
                        form.aptInfo !== '' &&
                        ((form.age < 19 &&
                            form.householderYn === 'y' &&
                            form.supportYn === 'y') ||
                            (form.age >= 19 &&
                                form.age < 30 &&
                                form.lifeYn === 'y') ||
                            form.age >= 30)) ||
                        // 규제지역인 경우
                        (form.aptInfo === '규제지역' &&
                            form.historyYn === 'n' &&
                            ((form.age < 19 &&
                                form.householderYn === 'y' &&
                                form.supportYn === 'y') ||
                                (form.age >= 19 &&
                                    form.age < 30 &&
                                    form.lifeYn === 'y' &&
                                    form.adultHouseholderYn === 'y') ||
                                (form.age >= 30 &&
                                    form.adultHouseholderYn === 'y')))) ? (
                        <tr className="general_phase">
                            <td className="qulificaiton">
                                주거전용 85㎡ 초과공공건설임대주택, 수도권에
                                지정된 공공주택지구에서 공급하는 민영주택에
                                청약하는가?
                            </td>
                            <span className="general_result">
                                <input
                                    className="isSupplyTypeInput"
                                    type="radio"
                                    name="supplyTypeYn"
                                    onChange={onChange}
                                    value="y"
                                    checked={
                                        form.supplyTypeYn === 'y' ? true : false
                                    }
                                    onClick={firstRankResult}
                                />
                                <span className="InputText">예</span>4
                                <input
                                    className="isSupplyTypeInput"
                                    type="radio"
                                    name="supplyTypeYn"
                                    onChange={onChange}
                                    value="n"
                                    checked={
                                        form.supplyTypeYn === 'n' ? true : false
                                    }
                                    onClick={secondRankResult}
                                />
                                <span className="InputText">아니오</span>
                            </span>
                            {
                                // 순위를 변수로 만들어서 예, 아니오 클릭 시 db 로 보낼 수 있도록
                                /* 1순위 tooltip*/
                                form.supplyTypeYn === 'y' ? (
                                    <span className="firstRank">
                                        1순위 !&nbsp;
                                        <CrownOutlined />
                                    </span>
                                ) : null
                            }
                            {
                                /* 2순위 tooltip*/
                                form.supplyTypeYn === 'n' ? (
                                    <span className="secondRank">
                                        2순위
                                        <span className="secondRankTootip">
                                            <SmileOutlined />
                                            <span class="tooltip-text"></span>
                                        </span>
                                    </span>
                                ) : null
                            }
                        </tr>
                    ) : (
                        <></>
                    )}
                </table>
            </form>
        </>
    );
};

export default GeneralSupply;
