import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postGeneralMinyeongPoint } from '../../../store/actions/pointGeneralMinyeongAction';
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
import './GeneralMinyeoungPoint.css';

const GeneralMinyeoungPoint = ({ onSaveData }) => {
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    const generalMinyeongPointStore = useSelector(
        (state) => state.generalMinyeongPoint
    ); // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const [loading, setLoading] = useState(false);
    const location = useLocation(); // aptNum 페이지의 props 불러오기
    const history = useHistory();

    const data = generalMinyeongPointStore?.postGeneralMinyeongPoint?.data; // 일반 민영 가점 로직 접근 변수
    const generalMinyeongPointSum =
        data?.periodOfHomelessness +
        data?.bankbookJoinPeriod +
        data?.numberOfDependents; // 일반 민영 가점 총점 합산.
    console.log(generalMinyeongPointSum);

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
        if (generalMinyeongPointStore?.postGeneralMinyeongPoint?.data) {
            const data =
                generalMinyeongPointStore.postGeneralMinyeongPoint.data;
            console.log(JSON.stringify(data));
        }
    }, [generalMinyeongPointStore?.postGeneralMinyeongPoint]);

    return (
        <>
            {data?.error === 'NOT_FOUND' || data?.error === 'BAD_REQUEST' ? (
                alert(
                    '가/배점을 확인할 수 없습니다.' +
                        '\n' +
                        '사유: ' +
                        data?.message
                ) + history.push('/')
            ) : (
                <>
                    <div className="point_title">
                        <h3 className="point_mainTitle">
                            가점 계산
                            <span className="point_subTitle">
                                | 일반공급 민영{' '}
                            </span>
                        </h3>
                    </div>

                    {/* 일반공급 민영 가점 테이블 */}
                    <form
                        className="generalMinyeongPoint_form"
                        onSubmit={handleSubmit}
                    >
                        <table className="generalMinyeongPoint_table">
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
                                            JSON.stringify(
                                                data?.periodOfHomelessness
                                            ) +
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
                                            JSON.stringify(
                                                data?.bankbookJoinPeriod
                                            ) +
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

                            {/* 부양 가족 */}
                            <tr className="point_phase">
                                <td className="qulificaiton">
                                    <span className="qulificaitonBox">
                                        부양 가족 가점 결과
                                    </span>
                                    <span className="info_tooltip">
                                        <InfoCircleOutlined />
                                        <span class="tooltip-text">
                                            <p>
                                                <strong>부양 가족 계산</strong>
                                            </p>
                                            <ul>본인 제외</ul>
                                            <ul>배우자 포함</ul>
                                            <ul>
                                                본인(혹은 배우자)이(가) 세대주일
                                                경우, 무주택 직계존속 산정.
                                            </ul>
                                            <ul>무주택 직계존속(외국인x)</ul>
                                            <li>
                                                입주자모집공고일 현재, 청약통장
                                                가입자가 세대주로서 최근 3년
                                                이상 계속하여 동일
                                                주민등록표상에 등재되어 있는
                                                무주택 직계존속을 부양가족으로
                                                인정.
                                            </li>
                                            <li>
                                                부모중 한사람이라도 유주택자인
                                                경우 그 배우자또한 부양가족으로
                                                산정하지 않음.
                                            </li>
                                        </span>
                                    </span>
                                </td>
                                <td className="point_result">
                                    <input
                                        className="aptInfoSelect"
                                        value={
                                            JSON.stringify(
                                                data?.numberOfDependents
                                            ) +
                                            ' ' +
                                            '점'
                                        }
                                        readOnly={true}
                                    />
                                    <span>
                                        {data?.numberOfDependents !== '' ? (
                                            <span className="progress">
                                                <CheckCircleOutlined />
                                            </span>
                                        ) : (
                                            <></>
                                        )}
                                        {data?.numberOfDependents === '' ? (
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

                        {/* 총 일반공급 민영 가점 */}
                        <div className="generalMinyeongPointRes">
                            <span className="sum_text">총</span>
                            <span className="generalMinyeongPointSum">
                                {generalMinyeongPointSum}
                            </span>
                            <span className="sum_text">점</span>
                        </div>
                    </form>
                </>
            )}
        </>
    );
};

export default GeneralMinyeoungPoint;
