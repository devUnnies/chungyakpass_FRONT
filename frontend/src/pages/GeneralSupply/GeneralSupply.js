import React, { useState, useEffect } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './GeneralSupply.css';

const GeneralSupply = ({ onSaveData }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        name: '',
        aptInfoYn: '',
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
            aptInfoYn: '',
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
            <form onSubmit={handleSubmit} className="addMemberForm">
                <table className="general_table">
                    {/* 규제지역 판단. (규제지역 로직 결과값 넣기.)*/}
                    <tr className="general_phase">
                        <td className="qulificaiton">
                            선택한 아파트가 '투기과열지구' 혹은
                            '청약과열지역'인가?
                        </td>
                        <span className="general_result">
                            <input
                                className="isaptInfoInput"
                                type="radio"
                                name="aptInfoYn"
                                onChange={onChange}
                                value="y"
                                checked={form.aptInfoYn === 'y' ? true : false}
                            />
                            <span className="isaptInfoInputText">예</span>
                            <input
                                className="isaptInfoInput"
                                type="radio"
                                name="aptInfoYn"
                                onChange={onChange}
                                value="n"
                                checked={form.aptInfoYn === 'n' ? true : false}
                            />
                            <span className="isaptInfoInputText">아니오</span>
                        </span>
                    </tr>

                    {form.aptInfoYn !== '' ? (
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
                                <span className="isPassbookInputText">예</span>
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
                                <span className="isPassbookInputText">
                                    아니오
                                </span>
                            </span>
                            {form.passbookYn === 'n' ? (
                                <span className="failMsg">부적격</span>
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
                                    <input
                                        className="ageInput"
                                        type="number"
                                        name="age"
                                        onChange={onChange}
                                        value={form.age}
                                        required
                                    />
                                </span>
                            </tr>
                        ) : (
                            <></>
                        )
                    }

                    {form.passbookYn === 'y' &&
                    form.age !== '' &&
                    form.age < 20 ? (
                        <tr className="general_phase">
                            <td className="qulificaiton">세대주 여부</td>
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
                                <span className="ishouseholderInputText">
                                    예
                                </span>
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
                                <span className="ishouseholderInputText">
                                    아니오
                                </span>
                            </span>
                            {form.householderYn === 'n' ? (
                                <span className="failMsg">
                                    미성년자 청약 적합 조건에 의해 부적격
                                    처리됩니다.
                                </span>
                            ) : null}
                        </tr>
                    ) : (
                        <></>
                    )}

                    {form.passbookYn === 'y' &&
                    form.age !== '' &&
                    form.age < 20 &&
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
                                <span className="isSupportInputText">예</span>
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
                                <span className="isSupportInputText">
                                    아니오
                                </span>
                            </span>
                            {form.supportYn === 'n' ? (
                                <span className="failMsg">
                                    미성년자 청약 적합 조건에 의해 부적격
                                    처리됩니다.
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
                        form.age >= 20 &&
                        form.age < 30 ? (
                            <tr className="general_phase">
                                <td className="qulificaiton">
                                    소득이 있으면서 독립적으로 생계 유지가
                                    가능한가?
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
                                    <span className="isLifeInputText">예</span>
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
                                    <span className="isLifeInputText">
                                        아니오
                                    </span>
                                </span>
                                {form.lifeYn === 'n' ? (
                                    <span className="failMsg">
                                        20대 단독세대주의 조건에 의해 부적격
                                        처리됩니다.
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
                        form.aptInfoYn === 'y' &&
                        form.age >= 20 &&
                        (form.lifeYn === 'y' || form.age >= 30) ? ( // 미성년자의 경우 보이지 않도록.
                            <tr className="general_phase">
                                <td className="qulificaiton">세대주 여부</td>
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
                                    <span className="isadultHouseholderInputText">
                                        예
                                    </span>
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
                                    />
                                    <span className="isadultHouseholderInputText">
                                        아니오
                                    </span>
                                </span>
                                {form.adultHouseholderYn === 'n' ? (
                                    <span className="failMsg">
                                        2순위입니다.
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
                        form.aptInfoYn === 'y' &&
                        ((form.age < 20 &&
                            form.householderYn === 'y' &&
                            form.supportYn === 'y') ||
                            (form.age >= 20 &&
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
                                    />
                                    <span className="isHistoryInputText">
                                        예
                                    </span>
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
                                    <span className="isHistoryInputText">
                                        아니오
                                    </span>
                                </span>
                                {form.historyYn === 'y' ? (
                                    <span className="failMsg">
                                        2순위입니다.
                                    </span>
                                ) : null}
                            </tr>
                        ) : (
                            <></>
                        )
                    }

                    {form.passbookYn === 'y' &&
                    form.age !== '' &&
                    ((form.aptInfoYn === 'y' && form.historyYn === 'n') ||
                        form.aptInfoYn === 'n') &&
                    ((form.age < 20 &&
                        form.householderYn === 'y' &&
                        form.supportYn === 'y') ||
                        (form.age >= 20 && form.lifeYn === 'y') ||
                        (form.age >= 30 && form.adultHouseholderYn === 'y')) ? (
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
                                        form.houseOwnedYn === 'y' ? true : false
                                    }
                                />
                                <span className="isHouseOwnedInputText">
                                    예
                                </span>
                                <input
                                    className="isHouseOwnedInput"
                                    type="radio"
                                    name="houseOwnedYn"
                                    onChange={onChange}
                                    value="n"
                                    checked={
                                        form.houseOwnedYn === 'n' ? true : false
                                    }
                                />
                                <span className="isHouseOwnedInputText">
                                    아니오
                                </span>
                            </span>
                            {form.houseOwnedYn === 'y' ? (
                                <span className="failMsg">2순위입니다.</span>
                            ) : null}
                        </tr>
                    ) : (
                        <></>
                    )}

                    {
                        /* 청약통장 가입 기간을 충족하는가? */
                        form.passbookYn === 'y' &&
                        form.age !== '' &&
                        form.houseOwnedYn === 'n' &&
                        form.historyYn === 'n' &&
                        ((form.age < 20 &&
                            form.householderYn === 'y' &&
                            form.supportYn === 'y') ||
                            (form.age >= 20 &&
                                form.lifeYn === 'y' &&
                                form.adultHouseholderYn === 'y') ||
                            (form.age >= 30 &&
                                form.adultHouseholderYn === 'y')) ? (
                            <tr className="general_phase">
                                <td className="qulificaiton">
                                    청약통장 가입기간
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
                                    개월
                                </span>
                                {form.joinTerm < 12 && form.joinTerm !== '' ? (
                                    <span className="failMsg">
                                        2순위입니다.
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
                        form.historyYn === 'n' &&
                        form.joinTerm >= 12 &&
                        ((form.age < 20 &&
                            form.householderYn === 'y' &&
                            form.supportYn === 'y') ||
                            (form.age >= 20 &&
                                form.lifeYn === 'y' &&
                                form.adultHouseholderYn === 'y') ||
                            (form.age >= 30 &&
                                form.adultHouseholderYn === 'y')) ? (
                            <tr className="general_phase">
                                <td className="qulificaiton">예치 금액</td>
                                <span className="general_result">
                                    <input
                                        className="paymentInput"
                                        type="number"
                                        name="payment"
                                        onChange={onChange}
                                        value={form.payment}
                                        required
                                    />{' '}
                                    만원
                                </span>
                                {form.payment < 300 && form.payment !== '' ? (
                                    <span className="failMsg">
                                        2순위입니다.
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
                    form.historyYn === 'n' &&
                    form.joinTerm >= 12 &&
                    form.payment >= 300 &&
                    ((form.age < 20 &&
                        form.householderYn === 'y' &&
                        form.supportYn === 'y') ||
                        (form.age >= 20 &&
                            form.lifeYn === 'y' &&
                            form.adultHouseholderYn === 'y') ||
                        (form.age >= 30 && form.adultHouseholderYn === 'y')) ? (
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
                                />
                                <span className="isSupplyTypeInputText">
                                    예
                                </span>
                                <input
                                    className="isSupplyTypeInput"
                                    type="radio"
                                    name="supplyTypeYn"
                                    onChange={onChange}
                                    value="n"
                                    checked={
                                        form.supplyTypeYn === 'n' ? true : false
                                    }
                                />
                                <span className="isSupplyTypeInputText">
                                    아니오
                                </span>
                            </span>
                            {form.supplyTypeYn === 'y' &&
                            form.houseOwnedYn === 'n' ? (
                                <span className="failMsg">
                                    1순위입니다 !!!!
                                </span>
                            ) : null}
                            {form.supplyTypeYn === 'n' ? (
                                <span className="failMsg">2순위입니다.</span>
                            ) : null}
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
