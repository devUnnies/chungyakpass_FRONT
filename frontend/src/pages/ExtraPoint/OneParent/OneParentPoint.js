import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postOneParentPointAptNum } from '../../../store/actions/pointSpecialMultiChildAction';
import { Link } from 'react-router-dom';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    PauseCircleOutlined,
} from '@ant-design/icons';
import MainButton from '../../../components/Button/MainButton';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import './OneParentPoint.css';
import Loading from '../../../components/Loading/loading';

const OneParentPoint = ({ onSaveData }) => {
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    const oneParentPointAptNumStore = useSelector(
        (state) => state.oneParentPoint
    ); // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const [loading, setLoading] = useState(true);
    const [notificationNumber, setNotificationNumber] = useState();
    const location = useLocation(); // aptNum 페이지의 props 불러오기
    const history = useHistory();

    const data = oneParentPointAptNumStore?.postOneParentPointAptNum?.data; // 한부모 가점 로직 접근 변수
    const newlyMarriagePointSum =
        data?.numberOfMinors +
        data?.ageOfMostYoungChild +
        data?.bankbookPaymentsCount +
        data?.periodOfApplicableAreaResidence +
        data?.monthOfAverageIncome; // 한부모 가점 총점 합산.
    console.log(newlyMarriagePointSum);

    // 로딩 상태 적용
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, []);

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
        if (oneParentPointAptNumStore?.postOneParentPointAptNum?.data) {
            const data =
                oneParentPointAptNumStore.postOneParentPointAptNum.data;
            console.log(JSON.stringify(data));
        }
    }, [oneParentPointAptNumStore?.postOneParentPointAptNum]);

    return (
        <>
            {loading ? ( // 로딩 상태 2s
                <>
                    <Loading />
                    <p className="loading_msg1">Please wait ...</p>
                    <p className="loading_msg2">
                        회원님의{' '}
                        <strong className="text_highlight">
                            특별공급 한부모 유형
                        </strong>{' '}
                        가배점 결과 확인 중입니다. <br />
                        잠시만 기다려주세요.
                    </p>
                </>
            ) : (
                <>
                    {/* 공통 정보 입력 오류 값에 의한 error 발생 시(data.error 값이 null이 아닌 경우) alert 창으로 접근 막음.
                    공통 정보 입력 수정 페이지 생성 시 수정 페이지로 연결하기. */}
                    {data?.error === 'BAD_REQUEST' ||
                    data?.error === 'NOT_FOUND' ? (
                        <>
                            {/* 아파트 공고번호 입력 오류일 경우 해당 공급 종류의 aptNum페이지로 이동. */}
                            {data?.code === 'NOT_FOUND_APT'
                                ? alert(
                                      '가배점을 확인할 수 없습니다' +
                                          '\n' +
                                          '사유: ' +
                                          data?.message
                                  ) + history.push('/point/oneParentAptNum')
                                : alert(
                                      '가배점을 확인할 수 없습니다' +
                                          '\n' +
                                          '사유: ' +
                                          data?.message
                                  ) + history.goBack(-1)}
                        </>
                    ) : (
                        <>
                            <div className="point_title">
                                <h3 className="point_mainTitle">
                                    가점 계산
                                    <span className="point_subTitle">
                                        | 한부모 특별공급{' '}
                                    </span>
                                </h3>
                            </div>

                            {/* 한부모 가점 테이블 */}
                            <form
                                className="multiChildPoint_form"
                                onSubmit={handleSubmit}
                            >
                                <table className="multiChildPoint_table">
                                    {/* 자녀 나이 가점 결과 */}
                                    <tr className="point_phase">
                                        <td className="qualification">
                                            <span className="qualificationBox">
                                                자녀 나이 가점 결과
                                            </span>
                                            <span className="info_tooltip"></span>
                                        </td>
                                        <td className="point_result">
                                            <input
                                                className="aptInfoSelect"
                                                value={
                                                    JSON.stringify(
                                                        data?.numberOfMinors
                                                    ) +
                                                    ' ' +
                                                    '점'
                                                }
                                                readOnly={true}
                                            />
                                            <span>
                                                {data?.numberOfMinors !== '' ? (
                                                    <span className="progress">
                                                        <CheckCircleOutlined />
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                                {data?.numberOfMinors === '' ? (
                                                    <span className="pause_tooltip">
                                                        <CloseCircleOutlined />
                                                        <span className="pause-tooltip-text"></span>
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </span>
                                        </td>
                                    </tr>

                                    {/* 만 19세 미만 자녀수 */}
                                    <tr className="point_phase">
                                        <td className="qualification">
                                            <span className="qualificationBox">
                                                만 19세 미만 자녀수 가점 결과
                                            </span>
                                            <span className="info_tooltip">
                                                <InfoCircleOutlined />
                                                <span className="tooltip-text">
                                                    만 19세 미만 미성년
                                                    자녀(태아 포함)
                                                </span>
                                            </span>
                                        </td>
                                        <td className="point_result">
                                            <input
                                                className="aptInfoSelect"
                                                value={
                                                    JSON.stringify(
                                                        data?.ageOfMostYoungChild
                                                    ) +
                                                    ' ' +
                                                    '점'
                                                }
                                                readOnly={true}
                                            />
                                            <span>
                                                {data?.ageOfMostYoungChild !==
                                                '' ? (
                                                    <span className="progress">
                                                        <CheckCircleOutlined />
                                                    </span>
                                                ) : null}
                                                {data?.ageOfMostYoungChild ===
                                                '' ? (
                                                    <span className="pause_tooltip">
                                                        <CloseCircleOutlined />
                                                    </span>
                                                ) : null}
                                            </span>
                                        </td>
                                    </tr>

                                    {/* 청약통장 납입 횟수 */}
                                    <tr className="point_phase">
                                        <td className="qualification">
                                            <span className="qualificationBox">
                                                청약통장 납입 횟수 가점 결과
                                            </span>
                                        </td>
                                        <td className="point_result">
                                            <input
                                                className="aptInfoSelect"
                                                value={
                                                    JSON.stringify(
                                                        data?.bankbookPaymentsCount
                                                    ) +
                                                    ' ' +
                                                    '점'
                                                }
                                                readOnly={true}
                                            />
                                            <span>
                                                {data?.bankbookPaymentsCount !==
                                                '' ? (
                                                    <span className="progress">
                                                        <CheckCircleOutlined />
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                                {data?.bankbookPaymentsCount ===
                                                '' ? (
                                                    <span className="pause_tooltip">
                                                        <CloseCircleOutlined />
                                                        <span className="pause-tooltip-text"></span>
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </span>
                                        </td>
                                    </tr>

                                    {/* 해당지역 연속 거주기간 */}
                                    <tr className="point_phase">
                                        <td className="qualification">
                                            <span className="qualificationBox">
                                                해당지역 연속 거주기간 가점 결과
                                            </span>
                                            <span className="info_tooltip">
                                                <InfoCircleOutlined />
                                                <span className="tooltip-text">
                                                    <p>
                                                        청약 신청하는 아파트
                                                        공고번호와 거주지 비교
                                                        후 일치/불일치 확인 후
                                                        산정.
                                                    </p>
                                                    특별시, 광역시, 특별자치시,
                                                    특별자치도 또는 시군의
                                                    행정구역
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
                                                        <span className="pause-tooltip-text"></span>
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </span>
                                        </td>
                                    </tr>

                                    {/* 소득 */}
                                    <tr className="point_phase">
                                        <td className="qualification">
                                            <span className="qualificationBox">
                                                소득 가점 결과
                                            </span>
                                            <span className="info_tooltip">
                                                <InfoCircleOutlined />
                                                <span className="tooltip-text">
                                                    <p>
                                                        가구당 월 평균 소득액
                                                        산정 기준
                                                    </p>
                                                    <div>
                                                        가구원 중 공급신청자 및
                                                        만 19세 이상
                                                        무주택세대구성원 전원의
                                                        소득을 합산.
                                                    </div>
                                                    <div>외벌이</div>
                                                    <li>소득 80 미만</li>
                                                    <div>맞벌이</div>
                                                    <li>
                                                        부부 중 한명의 소득이
                                                        가구100% 미만
                                                    </li>
                                                    <li>소득 100 미만</li>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="point_result">
                                            <input
                                                className="aptInfoSelect"
                                                value={
                                                    JSON.stringify(
                                                        data?.monthOfAverageIncome
                                                    ) +
                                                    ' ' +
                                                    '점'
                                                }
                                                readOnly={true}
                                            />
                                            <span>
                                                {data?.monthOfAverageIncome !==
                                                '' ? (
                                                    <span className="progress">
                                                        <CheckCircleOutlined />
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                                {data?.monthOfAverageIncome ===
                                                '' ? (
                                                    <span className="pause_tooltip">
                                                        <CloseCircleOutlined />
                                                        <span className="pause-tooltip-text"></span>
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </span>
                                        </td>
                                    </tr>
                                </table>

                                <hr className="sum_hr" />

                                {/* 총 한부모 가점 */}
                                <div className="multiChildPointRes">
                                    <span className="sum_text">총</span>
                                    <span className="multiChildPointSum">
                                        {newlyMarriagePointSum}
                                    </span>
                                    <span className="sum_text">점</span>
                                </div>
                            </form>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default OneParentPoint;
