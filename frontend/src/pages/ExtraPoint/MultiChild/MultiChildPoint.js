import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postMultiChildPointAptNum } from '../../../store/actions/pointSpecialMultiChildAction';
import { Link } from 'react-router-dom';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    PauseCircleOutlined,
} from '@ant-design/icons';
import MainButton from '../../../components/Button/MainButton';
import { useLocation } from 'react-router';
import './MultiChildPoint.css';

const MultiChildPoint = ({ onSaveData }) => {
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    const multiChildAptNumStore = useSelector((state) => state.multiChildPoint); // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const [loading, setLoading] = useState(false);
    const [notificationNumber, setNotificationNumber] = useState();
    const [multiChildHouseholdType, setMultiChildHouseholdType] = useState();
    const location = useLocation(); // aptNum 페이지의 props 불러오기
    const getParams = location.state.multiChildHouseholdType; // notificationNumber props 가져오기
    console.log(getParams); // aptNum 페이지에서 받은 multiChildHouseholdType console로 찍기.

    const data = multiChildAptNumStore?.postMultiChildPointAptNum?.data; // 다자녀 가점 로직 접근 변수
    const multiChildPointSum =
        data?.numberOfChild +
        data?.numberOfChildUnder6Year +
        data?.bankbookJoinPeriod +
        data?.periodOfApplicableAreaResidence +
        data?.periodOfHomelessness +
        data?.generationComposition; // 다자녀 가점 총점 합산.
    console.log(multiChildPointSum);

    const [form, setForm] = useState({
        name: '',
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
        setForm({});
    };

    useEffect(() => {
        if (multiChildAptNumStore?.postMultiChildPointAptNum?.data) {
            const data = multiChildAptNumStore.postMultiChildPointAptNum.data;
            console.log(JSON.stringify(data));
        }
    }, [multiChildAptNumStore?.postMultiChildPointAptNum]);

    return (
        <>
            <div className="point_title">
                <h3 className="point_mainTitle">
                    가점 계산
                    <span className="point_subTitle">| 다자녀 특별공급 </span>
                </h3>
            </div>

            {/* 다자녀 가점 테이블 */}
            <form className="multiChildPoint_form" onSubmit={handleSubmit}>
                <table className="multiChildPoint_table">
                    {/* 다자녀 유형 */}
                    <tr className="point_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">다자녀 유형</span>
                            <span className="info_tooltip">
                                <InfoCircleOutlined />
                                <span class="tooltip-text"></span>
                            </span>
                        </td>
                        <td className="point_result">
                            <input
                                className="aptInfoSelect"
                                value={getParams}
                                readOnly={true}
                            />
                            <span>
                                {getParams !== '' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : null}
                                {getParams === '' ? (
                                    <span className="pause_tooltip">
                                        <CloseCircleOutlined />
                                    </span>
                                ) : null}
                            </span>
                        </td>
                    </tr>

                    {/* 만 19세 미만 자녀수 */}
                    <tr className="point_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                만 19세 미만 자녀수 가점 결과
                            </span>
                            <span className="info_tooltip">
                                <InfoCircleOutlined />
                                <span class="tooltip-text"></span>
                            </span>
                        </td>
                        <td className="point_result">
                            <input
                                className="aptInfoSelect"
                                value={
                                    JSON.stringify(data?.numberOfChild) +
                                    ' ' +
                                    '점'
                                }
                                readOnly={true}
                            />
                            <span>
                                {data?.numberOfChild !== '' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : null}
                                {data?.numberOfChild === '' ? (
                                    <span className="pause_tooltip">
                                        <CloseCircleOutlined />
                                    </span>
                                ) : null}
                            </span>
                        </td>
                    </tr>

                    {/* 만 6세 미만 자녀수 */}
                    <tr className="point_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                만 6세 미만 자녀 수 가점 결과
                            </span>
                        </td>
                        <td className="point_result">
                            <input
                                className="aptInfoSelect"
                                value={
                                    JSON.stringify(
                                        data?.numberOfChildUnder6Year
                                    ) +
                                    ' ' +
                                    '점'
                                }
                                readOnly={true}
                            />
                            <span>
                                {data?.numberOfChildUnder6Year !== '' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : (
                                    <></>
                                )}
                                {data?.numberOfChildUnder6Year === '' ? (
                                    <span className="pause_tooltip">
                                        <CloseCircleOutlined />
                                        <span class="pause-tooltip-text"></span>
                                    </span>
                                ) : (
                                    <></>
                                )}
                            </span>
                        </td>
                    </tr>

                    {/* 청약통장 가입기간 */}
                    <tr className="point_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                청약통장 가입기간 가점 결과
                            </span>
                        </td>
                        <td className="point_result">
                            <input
                                className="aptInfoSelect"
                                value={
                                    JSON.stringify(data?.bankbookJoinPeriod) +
                                    ' ' +
                                    '점'
                                }
                                readOnly={true}
                            />
                            <span>
                                {data?.bankbookJoinPeriod !== '' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : (
                                    <></>
                                )}
                                {data?.bankbookJoinPeriod === '' ? (
                                    <span className="pause_tooltip">
                                        <CloseCircleOutlined />
                                        <span class="pause-tooltip-text"></span>
                                    </span>
                                ) : (
                                    <></>
                                )}
                            </span>
                        </td>
                    </tr>

                    {/* 해당지역 거주기간 */}
                    <tr className="point_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                해당지역 거주기간 가점 결과
                            </span>
                            <span className="info_tooltip">
                                <InfoCircleOutlined />
                                <span class="tooltip-text">
                                    <p>만 19세부터 계산.</p>
                                    수도권은 서울 인천 경기 합산하여 계산.
                                </span>
                            </span>
                        </td>
                        <td className="point_result">
                            <input
                                className="aptInfoSelect"
                                value={
                                    JSON.stringify(
                                        data?.periodOfApplicableAreaResidence
                                    ) +
                                    ' ' +
                                    '점'
                                }
                                readOnly={true}
                            />
                            <span>
                                {data?.periodOfApplicableAreaResidence !==
                                '' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : (
                                    <></>
                                )}
                                {data?.periodOfApplicableAreaResidence ===
                                '' ? (
                                    <span className="pause_tooltip">
                                        <CloseCircleOutlined />
                                        <span class="pause-tooltip-text"></span>
                                    </span>
                                ) : (
                                    <></>
                                )}
                            </span>
                        </td>
                    </tr>

                    {/* 무주택 기간 */}
                    <tr className="point_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                무주택 기간 가점 결과
                            </span>
                            <span className="info_tooltip">
                                <InfoCircleOutlined />
                                <span class="tooltip-text">
                                    <p>만19세부터 계산.</p>
                                    신청자 본인과 배우자중 짧은 기간으로
                                    산정하여 계산.
                                </span>
                            </span>
                        </td>
                        <td className="point_result">
                            <input
                                className="aptInfoSelect"
                                value={
                                    JSON.stringify(data?.periodOfHomelessness) +
                                    ' ' +
                                    '점'
                                }
                                readOnly={true}
                            />
                            <span>
                                {data?.periodOfHomelessness !== '' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : (
                                    <></>
                                )}
                                {data?.periodOfHomelessness === '' ? (
                                    <span className="pause_tooltip">
                                        <CloseCircleOutlined />
                                        <span class="pause-tooltip-text"></span>
                                    </span>
                                ) : (
                                    <></>
                                )}
                            </span>
                        </td>
                    </tr>

                    {/* 세대 구성 */}
                    <tr className="point_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                세대 구성 가점 결과
                            </span>
                        </td>
                        <td className="point_result">
                            <input
                                className="aptInfoSelect"
                                value={
                                    JSON.stringify(
                                        data?.generationComposition
                                    ) +
                                    ' ' +
                                    '점'
                                }
                                readOnly={true}
                            />
                            <span>
                                {data?.generationComposition !== '' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : (
                                    <></>
                                )}
                                {data?.generationComposition === '' ? (
                                    <span className="pause_tooltip">
                                        <CloseCircleOutlined />
                                        <span class="pause-tooltip-text"></span>
                                    </span>
                                ) : (
                                    <></>
                                )}
                            </span>
                        </td>
                    </tr>
                </table>

                <hr className="sum_hr" />

                {/* 총 다자녀 가점 */}
                <div className="multiChildPointRes">
                    <span className="sum_text">총</span>
                    <span className="multiChildPointSum">
                        {multiChildPointSum}
                    </span>
                    <span className="sum_text">점</span>
                </div>
            </form>
        </>
    );
};

export default MultiChildPoint;
