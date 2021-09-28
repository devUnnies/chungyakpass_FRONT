import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    PauseCircleOutlined,
} from '@ant-design/icons';
import MainButton from '../../components/Button/MainButton';
import './GeneralSupply.css';

const GeneralKookminApi = ({ onSaveData }) => {
    const [data, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: '',
        supportYn: '',
        lifeYn: '',
        mujutaeg: '',
        generalNationRes: '',
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
            generalKookminRes: '',
        });
    };

    const onClick = async () => {
        try {
            const res = await axios.get(
                'https://jsonplaceholder.typicode.com/todos/1'
            );
            setData1(res.data.userId); // userId 하나만 가져오기.
            setData2(res.data.completed); // completed 하나만 가져오기
        } catch (e) {
            console.log(e);
        }
    };
    console.log(data);

    return (
        <>
            <div className="general_title">
                <h3 className="general_mainTitle">
                    {' '}
                    일반공급{' '}
                    <span className="general_subTitle"> | 국민주택 </span>
                </h3>
            </div>

            <div className="loadButton">
                <MainButton
                    className="loadButton"
                    onClick={onClick}
                    width="80"
                    height="30"
                    fontWeight="bold"
                >
                    불러오기
                </MainButton>
            </div>

            <form className="generalSupply_form" onSubmit={handleSubmit}>
                {/* 버튼 클릭시 데이터 불러오기 */}
                <table className="generalPublic_table">
                    <p className="foreignWarning" style={{ color: 'red' }}>
                        * 외국인을 세대주 혹은 세대원으로 포함시킬 경우 부적격
                        판정이 날 수 있습니다.{' '}
                    </p>
                    {/* 규제지역 판단. (규제지역 로직 결과값 넣기.)*/}
                    <tr className="general_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                선택한 아파트가 투기과열지구 또는
                                청약과열지역인가?
                            </span>
                            <span className="info_tooltip">
                                <InfoCircleOutlined />
                                <span class="tooltip-text">
                                    <p>
                                        규제 지역('투기과열지구' 혹은
                                        '청약과열지역') ?
                                    </p>
                                    정부에서 주로 부동산의 투기 방지, 주택 시장
                                    안정화 등을 위해 지정하여 관리하는 지역.
                                </span>
                            </span>
                        </td>
                        <td className="general_result">
                            {data && (
                                <input
                                    className="aptInfoSelect"
                                    value={JSON.stringify(data)}
                                    readOnly={true}
                                />
                            )}
                        </td>
                    </tr>

                    {/* 청약통장 조건 충족 여부 */}
                    <tr className="general_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                청약통장 조건 충족 여부
                            </span>
                            <span className="info_tooltip">
                                <InfoCircleOutlined />
                                <span class="tooltip-text">
                                    <p>※ 국민주택의 경우</p>
                                    주택청약종합저축 혹은 청약 저축인 경우에만
                                    청약통장 조건 만족.
                                </span>
                            </span>
                        </td>

                        <td className="general_result">
                            {data && (
                                <input
                                    className="aptInfoSelect"
                                    value={JSON.stringify(data)}
                                    readOnly={true}
                                />
                            )}
                            <span>
                                {data && data !== '' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : null}
                                {data && data === '' ? (
                                    <span className="pause_tooltip">
                                        <CloseCircleOutlined />
                                        <span class="pause-tooltip-text">
                                            청약 통장 조건 미충족 시 부적격
                                            발생.
                                        </span>
                                    </span>
                                ) : null}
                            </span>
                        </td>
                    </tr>

                    {/* 세대구성원 무주택 판별 */}
                    <tr className="general_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                전세대구성원의 무주택 여부
                            </span>
                            <span className="info_tooltip">
                                <InfoCircleOutlined />
                                <span class="tooltip-text">
                                    <p>
                                        <div>※ 무주택 조건</div>
                                        <div className="tooltip-text-info">
                                            : 무주택 기간 산정은 본인 기준 만
                                            30세부터 하되, 그 전에 혼인한 경우
                                            혼인신고일을 기준으로 산정함.
                                        </div>
                                    </p>
                                </span>
                            </span>
                        </td>
                        <td className="general_result">
                            {data && (
                                <input
                                    className="aptInfoSelect"
                                    value={JSON.stringify(data)}
                                    readOnly={true}
                                />
                            )}
                            <span>
                                {data && data !== '' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : null}
                                {data && data === '' ? (
                                    <span className="pause_tooltip">
                                        <CloseCircleOutlined />
                                        <span class="pause-tooltip-text">
                                            전 세대 구성원이 무주택이 아닐 시
                                            청약 자격 미달.
                                        </span>
                                    </span>
                                ) : null}
                            </span>
                        </td>
                    </tr>

                    {/* 만 나이 로직 결과 출력*/}
                    <tr className="general_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">나이</span>
                        </td>
                        <td className="general_result">
                            {data && (
                                <input
                                    className="aptInfoSelect"
                                    value={JSON.stringify(data)}
                                    readOnly={true}
                                />
                            )}
                            <span>
                                {data && data !== '' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : null}
                                {data && data === '' ? (
                                    <span className="pause_tooltip">
                                        <CloseCircleOutlined />
                                        <span class="pause-tooltip-text">
                                            나이 입력 필요.
                                        </span>
                                    </span>
                                ) : null}
                            </span>
                        </td>
                    </tr>

                    {/* 미성년자인 경우 세대주 판별 */}
                    <tr className="general_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">세대주 여부</span>
                        </td>
                        <td className="general_result">
                            {data && (
                                <input
                                    className="aptInfoSelect"
                                    value={JSON.stringify(data)}
                                    readOnly={true}
                                />
                            )}
                            <span>
                                {data && data === 2 ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : null}
                                {data && data !== 2 ? (
                                    <span className="pause_tooltip">
                                        <CloseCircleOutlined />
                                        <span class="pause-tooltip-text">
                                            만 19세 미만 미성년자는 세대주일
                                            경우에만 해당 청약이 신청 진행 가능.
                                        </span>
                                    </span>
                                ) : null}
                            </span>
                        </td>
                    </tr>
                    {/* 미성년자인 경우 형제, 자매 부양 판별 */}
                    <tr className="general_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                형제, 자매 부양 여부
                            </span>
                        </td>
                        {data && (
                            <td className="general_result">
                                <span className="general_result_input">
                                    <input
                                        className="isSupportInput"
                                        type="radio"
                                        name="supportYn"
                                        onChange={onChange}
                                        value="y"
                                        checked={
                                            form.supportYn === 'y'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="InputText">예</span>
                                    <input
                                        className="isSupportInput"
                                        type="radio"
                                        name="supportYn"
                                        onChange={onChange}
                                        value="n"
                                        checked={
                                            form.supportYn === 'n'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="InputText">아니오</span>
                                </span>
                                <span>
                                    {data && form.supportYn === 'y' ? (
                                        <span className="progress">
                                            <CheckCircleOutlined />
                                        </span>
                                    ) : null}
                                    {data && form.supportYn === 'n' ? (
                                        <span className="pause_tooltip">
                                            <CloseCircleOutlined />
                                            <span class="tooltip-text">
                                                만 19세 미만 미성년자는
                                                세대주이면서 부양할 가족이 있는
                                                경우에만 해당 청약이 신청 진행
                                                가능.
                                            </span>
                                        </span>
                                    ) : null}
                                </span>
                            </td>
                        )}
                    </tr>

                    {/* 20대 단독 세대주 여부 */}
                    <tr className="general_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                소득이 있으면서 독립적으로 생계 유지가 가능한가?
                            </span>
                            <span className="info_tooltip">
                                <InfoCircleOutlined />
                                <span class="tooltip-text">
                                    <p>미혼 20대 단독세대주 ?</p>
                                    20대이며, 최저 생계비 (기준중위소득 40%, 약
                                    월 70만원) 이상의 소득이 존재해야 함.
                                </span>
                            </span>
                        </td>
                        {data && (
                            <td className="general_result">
                                <span className="general_result_input">
                                    <input
                                        className="isLifeYnInput"
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
                                        className="isLifeYnInput"
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
                                <span>
                                    {data && form.lifeYn === 'y' ? (
                                        <span className="progress">
                                            <CheckCircleOutlined />
                                        </span>
                                    ) : null}
                                    {data && form.lifeYn === 'n' ? (
                                        <span className="pause_tooltip">
                                            <CloseCircleOutlined />
                                            <span class="tooltip-text">
                                                생계 유지 기준 소득 확인 필요.
                                            </span>
                                        </span>
                                    ) : null}
                                </span>
                            </td>
                        )}
                    </tr>

                    {/* 이후 조건 충족 시 다음 인풋 보이도록. */}

                    {/* 순위 판별 시작 */}
                    {/* 2주택 이상 소유 시 2순위 */}
                    {form.supportYn === 'y' || form.lifeYn === 'y' ? (
                        <>
                            {/* 규제 지역인 경우에만 보이도록 */}
                            {/* 규제지역 1. 세대주 여부 (미성년자 제외) */}
                            <tr className="general_phase">
                                <td className="qulificaiton">
                                    <span className="qulificaitonBox">
                                        세대주 여부
                                    </span>
                                </td>
                                <td className="general_result">
                                    {data && (
                                        <input
                                            className="aptInfoSelect"
                                            value={JSON.stringify(data)}
                                            readOnly={true}
                                        />
                                    )}
                                    <span>
                                        {data && data !== '' ? (
                                            <span className="progress">
                                                <CheckCircleOutlined />
                                            </span>
                                        ) : null}
                                        {data && data === '' ? (
                                            <span className="secondRankTootip">
                                                <PauseCircleOutlined />
                                                {
                                                    (form.generalKookminRes =
                                                        '2순위')
                                                }
                                            </span>
                                        ) : null}
                                    </span>
                                </td>
                            </tr>

                            {/* 규제지역 2. 세대원 청약 당첨 이력 */}
                            <tr className="general_phase">
                                <td className="qulificaiton">
                                    <span className="qulificaitonBox">
                                        전 세대원이 5년 이내 청약 당첨 이력이
                                        존재하는가?
                                    </span>
                                </td>
                                <td className="general_result">
                                    {data && (
                                        <input
                                            className="aptInfoSelect"
                                            value={JSON.stringify(data)}
                                            readOnly={true}
                                        />
                                    )}
                                    <span>
                                        {data && data !== '' ? (
                                            <span className="progress">
                                                <CheckCircleOutlined />
                                            </span>
                                        ) : null}
                                        {data && data === '' ? (
                                            <span className="secondRankTootip">
                                                <PauseCircleOutlined />
                                                {
                                                    (form.generalKookminRes =
                                                        '2순위')
                                                }
                                            </span>
                                        ) : null}
                                    </span>
                                </td>
                            </tr>

                            {/* 청약통장 가입기간 충족 여부 */}
                            <tr className="general_phase">
                                <td className="qulificaiton">
                                    <span className="qulificaitonBox">
                                        청약통장 가입기간 충족 여부
                                    </span>
                                    <span className="info_tooltip">
                                        <InfoCircleOutlined />
                                        <span class="tooltip-text">
                                            <table
                                                border="1"
                                                className="tootipeTable"
                                            >
                                                <tr>
                                                    <td>지역</td>
                                                    <td>규제지역</td>
                                                    <td>수도권</td>
                                                    <td>수도권 외</td>
                                                </tr>
                                                <tr>
                                                    <td>가입 기간</td>
                                                    <td>24개월</td>
                                                    <td>12개월</td>
                                                    <td>6개월</td>
                                                </tr>
                                            </table>
                                        </span>
                                    </span>
                                </td>
                                <td className="general_result">
                                    {data && (
                                        <input
                                            className="aptInfoSelect"
                                            value={JSON.stringify(data)}
                                            readOnly={true}
                                        />
                                    )}
                                    <span>
                                        {data && data !== '' ? (
                                            <span className="progress">
                                                <CheckCircleOutlined />
                                            </span>
                                        ) : null}
                                        {data && data === '' ? (
                                            <span className="secondRankTootip">
                                                <PauseCircleOutlined />
                                                {
                                                    (form.generalKookminRes =
                                                        '2순위')
                                                }
                                            </span>
                                        ) : null}
                                    </span>
                                </td>
                            </tr>

                            {/* 건설지역 별 납입횟수 충족 여부 */}
                            <tr className="general_phase">
                                <td className="qulificaiton">
                                    <span className="qulificaitonBox">
                                        건설지역 별 납입횟수 충족 여부
                                    </span>
                                    <span className="info_tooltip">
                                        <InfoCircleOutlined />
                                        <span class="tooltip-text">
                                            <table
                                                border="1"
                                                className="tootipeTable"
                                            >
                                                <tr>
                                                    <td>지역</td>
                                                    <td>규제지역</td>
                                                    <td>수도권</td>
                                                    <td>수도권 외</td>
                                                </tr>
                                                <tr>
                                                    <td>납입횟수</td>
                                                    <td>24회 이상</td>
                                                    <td>12회 이상</td>
                                                    <td>6회 이상</td>
                                                </tr>
                                            </table>
                                        </span>
                                    </span>
                                </td>
                                <td className="general_result">
                                    {data && (
                                        <input
                                            className="aptInfoSelect"
                                            value={JSON.stringify(data)}
                                            readOnly={true}
                                        />
                                    )}
                                    <span>
                                        {data && data !== '1' ? (
                                            <span className="progress">
                                                <CheckCircleOutlined />
                                                {
                                                    (form.generalKookminRes =
                                                        '1순위')
                                                }
                                            </span>
                                        ) : null}
                                        {data && data === '' ? (
                                            <span className="secondRankTootip">
                                                <PauseCircleOutlined />
                                                {
                                                    (form.generalKookminRes =
                                                        '2순위')
                                                }
                                            </span>
                                        ) : null}
                                    </span>
                                </td>
                            </tr>
                        </>
                    ) : (
                        <></>
                    )}
                </table>

                <div className="rankButton">
                    {/* 순위에 따른 페이지 이동 */}
                    {data && (form.supportYn !== '' || form.lifeYn !== '') ? (
                        <>
                            {form.generalKookminRes === '1순위' ? (
                                <div className="rankButton">
                                    <Link to="/rank/first">
                                        <MainButton
                                            type="submit"
                                            width="100"
                                            height="30"
                                            fontWeight="bold"
                                            marginLeft="20%"
                                        >
                                            순위 확인하기
                                        </MainButton>
                                    </Link>
                                </div>
                            ) : (
                                <div className="rankButton">
                                    <Link to="/rank/second">
                                        <MainButton
                                            type="submit"
                                            width="100"
                                            height="30"
                                            fontWeight="bold"
                                            marginLeft="20%"
                                        >
                                            순위 확인하기
                                        </MainButton>
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </form>
        </>
    );
};

export default GeneralKookminApi;
