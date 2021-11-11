import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postNewlyMarriedKookminAptNum } from '../../../store/actions/multiChildKookminAction';
import { Link } from 'react-router-dom';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    PauseCircleOutlined,
} from '@ant-design/icons';
import MainButton from '../../../components/Button/MainButton';
import '../SpecialSupply.css';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/loading';

const NewlyMarriedKookminApi = ({ onSaveData }) => {
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    const newlyMarriedKookminStore = useSelector(
        (state) => state.newlyMarriedKookmin
    ); // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const [loading, setLoading] = useState(true);
    const [notificationNumber, setNotificationNumber] = useState();
    const [housingType, setHousingType] = useState();
    const history = useHistory();
    const location = useLocation(); // aptNum 페이지의 props 불러오기

    const data = newlyMarriedKookminStore?.postNewlyMarriedKookminAptNum?.data; // 신혼부부 국민 로직 접근 변수

    // 로딩 상태 적용
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, []);

    const [form, setForm] = useState({
        name: '',
        supportYn: '',
        newlyMarriedKookminRes: '',
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
            newlyMarriedKookminRes: '',
        });
    };

    useEffect(() => {
        if (newlyMarriedKookminStore?.postNewlyMarriedKookminAptNum?.data) {
            const data =
                newlyMarriedKookminStore.postNewlyMarriedKookminAptNum.data;
            console.log(JSON.stringify(data));
        }
    }, [newlyMarriedKookminStore?.postNewlyMarriedKookminAptNum]);

    // 결과가 1, 2순위일 경우 순위확인 페이지로 연결
    const rankSuccess = async () => {
        if (
            form?.newlyMarriedKookminRes === '1순위' ||
            form?.newlyMarriedKookminRes === '2순위'
        ) {
            history.push({
                pathname: '/rank',
                state: {
                    form,
                },
            });
        }
    };

    const fail = async () => {
        if (form?.newlyMarriedKookminRes === '탈락') {
            alert('자격 조건을 만족하지 못하는 항목이 있습니다.');
        }
    };

    return (
        <>
            {loading ? ( // 로딩 상태 2s
                <>
                    <Loading />
                    <p className="loading_msg1">Please wait ...</p>
                    <p className="loading_msg2">
                        회원님의{' '}
                        <strong className="text_highlight">
                            특별공급 신혼부부 국민주택 유형
                        </strong>{' '}
                        자격 확인 중입니다. <br />
                        잠시만 기다려주세요.
                    </p>
                </>
            ) : (
                <>
                    {/* 공통 정보 입력 오류 값에 의한 error 발생 시(data.error 값이 null이 아닌 경우) alert 창으로 접근 막음.
                        공통 정보 입력 수정 페이지 생성 시 수정 페이지로 연결하기. */}
                    {data?.error === 'BAD_REQUEST' ||
                    data?.error === 'NOT_FOUND' ? (
                        alert(
                            '자격 확인을 진행할 수 없습니다' +
                                '\n' +
                                '사유: ' +
                                data?.message
                        ) + history.goBack(-1)
                    ) : (
                        <>
                            <div className="special_title">
                                <h3 className="special_mainTitle">
                                    특별공급
                                    <span className="special_subTitle">
                                        | 신혼부부 국민주택
                                    </span>
                                </h3>
                            </div>

                            <form
                                className="specialSupply_form"
                                onSubmit={handleSubmit}
                            >
                                <table className="specialMultiChildKookmin_table">
                                    <p
                                        className="foreignWarning"
                                        style={{ color: 'red' }}
                                    >
                                        * 외국인을 세대주 혹은 세대원으로
                                        포함시킬 경우 부적격 판정이 날 수 있음을
                                        알려드립니다.
                                    </p>

                                    {data !== null ? (
                                        <>
                                            {/* 규제지역 판단. (규제지역 로직 결과값)*/}
                                            <tr className="special_phase">
                                                <td className="qulificaiton">
                                                    <span className="qulificaitonBox">
                                                        선택한 아파트가
                                                        투기과열지구 또는
                                                        청약과열지역인가?
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span class="tooltip-text">
                                                            <p>
                                                                규제
                                                                지역('투기과열지구'
                                                                혹은
                                                                '청약과열지역')
                                                                ?
                                                            </p>
                                                            정부에서 주로
                                                            부동산의 투기 방지,
                                                            주택 시장 안정화
                                                            등을 위해 지정하여
                                                            관리하는 지역.
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="special_result">
                                                    <input
                                                        className="aptInfoSelect"
                                                        value={
                                                            data?.restrictedAreaTf
                                                                ? '규제지역'
                                                                : '비규제지역'
                                                        }
                                                        readOnly={true}
                                                    />
                                                    <span>
                                                        {data?.restrictedAreaTf !==
                                                        '' ? (
                                                            <span className="progress">
                                                                <CheckCircleOutlined />
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.restrictedAreaTf ===
                                                        '' ? (
                                                            <span className="pause_tooltip">
                                                                <CloseCircleOutlined />
                                                                <span class="pause-tooltip-text">
                                                                    값 입력 필요
                                                                </span>
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>
                                        </>
                                    ) : null}

                                    {data !== null ? (
                                        <>
                                            {/* 청약통장 조건 충족 여부 */}
                                            <tr className="special_phase">
                                                <td className="qulificaiton">
                                                    <span className="qulificaitonBox">
                                                        청약통장 조건 충족 여부
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span class="tooltip-text">
                                                            <p>
                                                                ※ 국민 주택의
                                                                경우
                                                            </p>
                                                            주택청약종합저축
                                                            혹은 청약 저축인
                                                            경우에만 청약통장
                                                            조건 만족.
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="special_result">
                                                    <input
                                                        className="aptInfoSelect"
                                                        value={
                                                            data?.accountTf
                                                                ? '충족'
                                                                : '미충족'
                                                        }
                                                        readOnly={true}
                                                    />
                                                    <span>
                                                        {data?.accountTf ===
                                                        true ? (
                                                            <span className="progress">
                                                                <CheckCircleOutlined />
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.accountTf ===
                                                        false ? (
                                                            <span className="pause_tooltip">
                                                                <CloseCircleOutlined />
                                                                <span class="pause-tooltip-text">
                                                                    청약 통장
                                                                    조건 미충족
                                                                    시 부적격
                                                                    발생.
                                                                </span>
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>
                                        </>
                                    ) : null}

                                    {data?.accountTf === true ? (
                                        <>
                                            {/* 인근지역 거주 여부 */}
                                            <tr className="special_phase">
                                                <td className="qulificaiton">
                                                    <span className="qulificaitonBox">
                                                        신청한 아파트 청약
                                                        지역의 인근지역 혹은
                                                        해당지역 거주 여부
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span class="tooltip-text">
                                                            <p>
                                                                ※ 인근지역의
                                                                경우
                                                            </p>
                                                            1순위 조건 충족자는
                                                            맞지만 해당 지역에
                                                            거주하는 자에게 우선
                                                            공급하므로 {'\n'}{' '}
                                                            청약 공급 우선
                                                            순위에서 밀릴 수
                                                            있음을 주의바랍니다.
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="special_result">
                                                    <input
                                                        className="aptInfoSelect"
                                                        value={
                                                            data?.meetLivingInSurroundAreaTf
                                                                ? '충족'
                                                                : '미충족'
                                                        }
                                                        readOnly={true}
                                                    />
                                                    <span>
                                                        {data?.meetLivingInSurroundAreaTf ===
                                                        true ? (
                                                            <span className="progress">
                                                                <CheckCircleOutlined />
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.meetLivingInSurroundAreaTf ===
                                                        false ? (
                                                            <span className="pause_tooltip">
                                                                <CloseCircleOutlined />
                                                                <span class="pause-tooltip-text">
                                                                    인근지역
                                                                    혹은
                                                                    해당지역
                                                                    거주 미충족
                                                                    시 탈락
                                                                </span>
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>

                                            {data?.meetLivingInSurroundAreaTf ===
                                            true ? (
                                                <>
                                                    {/* 만 나이 로직 결과 출력*/}
                                                    <tr className="special_phase">
                                                        <td className="qulificaiton">
                                                            <span className="qulificaitonBox">
                                                                나이
                                                            </span>
                                                        </td>
                                                        <td className="special_result">
                                                            <input
                                                                className="aptInfoSelect"
                                                                value={
                                                                    data?.americanAge +
                                                                    ' ' +
                                                                    '세'
                                                                }
                                                                readOnly={true}
                                                            />
                                                            <span>
                                                                {data?.americanAge !==
                                                                '' ? (
                                                                    <span className="progress">
                                                                        <CheckCircleOutlined />
                                                                    </span>
                                                                ) : null}
                                                                {data?.americanAge ===
                                                                '' ? (
                                                                    <span className="pause_tooltip">
                                                                        <CloseCircleOutlined />
                                                                        <span class="pause-tooltip-text">
                                                                            나이
                                                                            입력
                                                                            필요.
                                                                        </span>
                                                                    </span>
                                                                ) : null}
                                                            </span>
                                                        </td>
                                                    </tr>

                                                    {/*  미성년자인 경우에만 보이는 로직 */}
                                                    {data?.americanAge < 20 ? (
                                                        <>
                                                            {/* 미성년자인 경우 형제, 자매 부양 판별 */}
                                                            <tr className="special_phase">
                                                                <td className="qulificaiton">
                                                                    <span className="qulificaitonBox">
                                                                        형제,
                                                                        자매
                                                                        부양
                                                                        여부
                                                                    </span>
                                                                </td>
                                                                <td className="special_result">
                                                                    <span className="special_result_input">
                                                                        <input
                                                                            className="isSupportInput"
                                                                            type="radio"
                                                                            name="supportYn"
                                                                            onChange={
                                                                                onChange
                                                                            }
                                                                            value="y"
                                                                            checked={
                                                                                form.supportYn ===
                                                                                'y'
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                        />
                                                                        <span className="InputText">
                                                                            예
                                                                        </span>
                                                                        <input
                                                                            className="isSupportInput"
                                                                            type="radio"
                                                                            name="supportYn"
                                                                            onChange={
                                                                                onChange
                                                                            }
                                                                            value="n"
                                                                            checked={
                                                                                form.supportYn ===
                                                                                'n'
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                        />
                                                                        <span className="InputText">
                                                                            아니오
                                                                        </span>
                                                                    </span>
                                                                    <span>
                                                                        {form.supportYn ===
                                                                        'y' ? (
                                                                            <span className="progress">
                                                                                <CheckCircleOutlined />
                                                                            </span>
                                                                        ) : null}
                                                                        {form.supportYn ===
                                                                        'n' ? (
                                                                            <span className="pause_tooltip">
                                                                                <CloseCircleOutlined />
                                                                                <span class="pause-tooltip-text">
                                                                                    만
                                                                                    19세
                                                                                    미만
                                                                                    미성년자의
                                                                                    경우
                                                                                    형제
                                                                                    자매
                                                                                    부양하는
                                                                                    경우에만
                                                                                    청약
                                                                                    신청
                                                                                    가능.
                                                                                </span>
                                                                            </span>
                                                                        ) : null}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ) : null}

                                                    {/* 혼인 기간 7년 이내 충족 여부 */}
                                                    {data?.americanAge >= 20 ||
                                                    (data?.americanAge < 20 &&
                                                        form.supportYn ===
                                                            'y') ? (
                                                        <>
                                                            <tr className="special_phase">
                                                                <td className="qulificaiton">
                                                                    <span className="qulificaitonBox">
                                                                        혼인
                                                                        기간 7년
                                                                        이내
                                                                        여부
                                                                    </span>
                                                                </td>
                                                                <td className="special_result">
                                                                    <input
                                                                        className="aptInfoSelect"
                                                                        value={
                                                                            data?.meetMarriagePeriodIn7yearsTf
                                                                                ? '충족'
                                                                                : '미충족'
                                                                        }
                                                                        readOnly={
                                                                            true
                                                                        }
                                                                    />
                                                                    <span>
                                                                        {data?.meetMarriagePeriodIn7yearsTf ===
                                                                        true ? (
                                                                            <span className="progress">
                                                                                <CheckCircleOutlined />
                                                                            </span>
                                                                        ) : null}
                                                                        {data?.meetMarriagePeriodIn7yearsTf ===
                                                                        false ? (
                                                                            <span className="pause_tooltip">
                                                                                <CloseCircleOutlined />
                                                                                <span class="pause-tooltip-text">
                                                                                    혼인
                                                                                    기간이
                                                                                    7년
                                                                                    이내인
                                                                                    신혼부부만
                                                                                    청약
                                                                                    신청
                                                                                    가능.
                                                                                </span>
                                                                            </span>
                                                                        ) : null}
                                                                    </span>
                                                                </td>
                                                            </tr>

                                                            {/* 전세대구성원의 무주택 여부 */}
                                                            {data?.meetMarriagePeriodIn7yearsTf ===
                                                            true ? (
                                                                <>
                                                                    <tr className="special_phase">
                                                                        <td className="qulificaiton">
                                                                            <span className="qulificaitonBox">
                                                                                전세대구성원의
                                                                                무주택
                                                                                여부
                                                                            </span>
                                                                            <span className="info_tooltip">
                                                                                <InfoCircleOutlined />
                                                                                <span class="tooltip-text">
                                                                                    <p>
                                                                                        <div>
                                                                                            ※
                                                                                            무주택
                                                                                            조건
                                                                                        </div>
                                                                                        <div className="tooltip-text-info">
                                                                                            :
                                                                                            무주택
                                                                                            기간
                                                                                            산정은
                                                                                            본인
                                                                                            기준
                                                                                            만
                                                                                            30세부터
                                                                                            하되,
                                                                                            그
                                                                                            전에
                                                                                            혼인한
                                                                                            경우
                                                                                            혼인신고일을
                                                                                            기준으로
                                                                                            산정함.
                                                                                        </div>
                                                                                    </p>
                                                                                    <p>
                                                                                        <li>
                                                                                            60세
                                                                                            이상
                                                                                            직계존속이
                                                                                            소유한
                                                                                            주택
                                                                                            혹은
                                                                                            분양권
                                                                                        </li>
                                                                                        <li>
                                                                                            3개월
                                                                                            이내
                                                                                            처분한
                                                                                            상속주택
                                                                                        </li>
                                                                                        <li>
                                                                                            비도시
                                                                                            지역
                                                                                            단독주택
                                                                                        </li>
                                                                                        <li>
                                                                                            소형,
                                                                                            저가
                                                                                            주택
                                                                                        </li>
                                                                                        <li>
                                                                                            폐가
                                                                                            소유
                                                                                        </li>
                                                                                        <li>
                                                                                            무허가
                                                                                            건물
                                                                                            소유
                                                                                        </li>
                                                                                        <li>
                                                                                            문화재
                                                                                            지정
                                                                                            주택
                                                                                        </li>
                                                                                        <li>
                                                                                            미분양
                                                                                            주택
                                                                                            분양권
                                                                                        </li>
                                                                                        <li>
                                                                                            사업
                                                                                            목적
                                                                                        </li>
                                                                                    </p>
                                                                                </span>
                                                                            </span>
                                                                        </td>
                                                                        <td className="special_result">
                                                                            <input
                                                                                className="aptInfoSelect"
                                                                                value={
                                                                                    data?.meetHomelessHouseholdMembersTf
                                                                                        ? '충족'
                                                                                        : '미충족'
                                                                                }
                                                                                readOnly={
                                                                                    true
                                                                                }
                                                                            />
                                                                            <span>
                                                                                {data?.meetHomelessHouseholdMembersTf ===
                                                                                true ? (
                                                                                    <span className="progress">
                                                                                        <CheckCircleOutlined />
                                                                                    </span>
                                                                                ) : null}
                                                                                {data?.meetHomelessHouseholdMembersTf ===
                                                                                false ? (
                                                                                    <span className="pause_tooltip">
                                                                                        <CloseCircleOutlined />
                                                                                        <span class="pause-tooltip-text">
                                                                                            전
                                                                                            세대
                                                                                            구성원이
                                                                                            무주택이
                                                                                            아닐
                                                                                            시
                                                                                            청약
                                                                                            자격
                                                                                            미달.
                                                                                        </span>
                                                                                    </span>
                                                                                ) : null}
                                                                            </span>
                                                                        </td>
                                                                    </tr>

                                                                    {/* 월평균 기준 소득 충족 여부 */}
                                                                    {data?.meetHomelessHouseholdMembersTf ===
                                                                    true ? (
                                                                        <>
                                                                            <tr className="special_phase">
                                                                                <td className="qulificaiton">
                                                                                    <span className="qulificaitonBox">
                                                                                        월평균
                                                                                        소득
                                                                                        기준
                                                                                        충족
                                                                                        여부
                                                                                    </span>
                                                                                </td>
                                                                                <td className="special_result">
                                                                                    <input
                                                                                        className="aptInfoSelect"
                                                                                        value={
                                                                                            data?.meetMonthlyAverageIncomePriority ||
                                                                                            data?.meetMonthlyAverageIncomeGeneral
                                                                                                ? '충족'
                                                                                                : '미충족'
                                                                                        }
                                                                                        readOnly={
                                                                                            true
                                                                                        }
                                                                                    />
                                                                                    <span>
                                                                                        {data?.meetMonthlyAverageIncomePriority ===
                                                                                            true ||
                                                                                        data?.meetMonthlyAverageIncomeGeneral ===
                                                                                            true ? (
                                                                                            <span className="progress">
                                                                                                <CheckCircleOutlined />
                                                                                            </span>
                                                                                        ) : null}
                                                                                        {data?.meetMonthlyAverageIncomePriority ===
                                                                                            false &&
                                                                                        data?.meetMonthlyAverageIncomeGeneral ===
                                                                                            false ? (
                                                                                            <span className="pause_tooltip">
                                                                                                <CloseCircleOutlined />
                                                                                                <span class="pause-tooltip-text">
                                                                                                    월평균
                                                                                                    소득
                                                                                                    미충족
                                                                                                </span>
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>

                                                                            {/* 청약통장 가입기간 충족 여부 */}
                                                                            {data?.meetMonthlyAverageIncomePriority ===
                                                                                true ||
                                                                            data?.meetMonthlyAverageIncomeGeneral ===
                                                                                true ? (
                                                                                <>
                                                                                    <tr className="special_phase">
                                                                                        <td className="qulificaiton">
                                                                                            <span className="qulificaitonBox">
                                                                                                청약통장
                                                                                                가입기간
                                                                                                충족
                                                                                                여부
                                                                                            </span>
                                                                                            <span className="info_tooltip">
                                                                                                <InfoCircleOutlined />
                                                                                                <span class="tooltip-text">
                                                                                                    <table
                                                                                                        border="1"
                                                                                                        className="tootipeTable"
                                                                                                    >
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                지역
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                규제지역
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                위축
                                                                                                                지역
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                수도권
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                수도권
                                                                                                                외
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                가입
                                                                                                                기간
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                24개월
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                1개월
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                12개월
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                6개월
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </span>
                                                                                            </span>
                                                                                        </td>
                                                                                        <td className="special_result">
                                                                                            <input
                                                                                                className="aptInfoSelect"
                                                                                                value={
                                                                                                    data?.meetBankbookJoinPeriodTf
                                                                                                        ? '충족'
                                                                                                        : '미충족'
                                                                                                }
                                                                                                readOnly={
                                                                                                    true
                                                                                                }
                                                                                            />
                                                                                            <span>
                                                                                                {data?.meetBankbookJoinPeriodTf ===
                                                                                                true ? (
                                                                                                    <span className="progress">
                                                                                                        <CheckCircleOutlined />
                                                                                                    </span>
                                                                                                ) : null}
                                                                                                {data?.meetBankbookJoinPeriodTf ===
                                                                                                false ? (
                                                                                                    <span className="secondRankTootip">
                                                                                                        <PauseCircleOutlined />
                                                                                                    </span>
                                                                                                ) : null}
                                                                                            </span>
                                                                                        </td>
                                                                                    </tr>

                                                                                    {/* 건설지역 별 납입횟수 충족 여부 */}
                                                                                    {data?.meetBankbookJoinPeriodTf ===
                                                                                    true ? (
                                                                                        <>
                                                                                            <tr className="special_phase">
                                                                                                <td className="qulificaiton">
                                                                                                    <span className="qulificaitonBox">
                                                                                                        건설지역
                                                                                                        별
                                                                                                        납입횟수
                                                                                                        충족
                                                                                                        여부
                                                                                                    </span>
                                                                                                    <span className="info_tooltip">
                                                                                                        <InfoCircleOutlined />
                                                                                                        <span class="tooltip-text">
                                                                                                            <table
                                                                                                                border="1"
                                                                                                                className="tootipeTable"
                                                                                                            >
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        지역
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        규제지역
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        수도권
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        수도권
                                                                                                                        외
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        납입횟수
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        24회
                                                                                                                        이상
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        12회
                                                                                                                        이상
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        6회
                                                                                                                        이상
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </table>
                                                                                                        </span>
                                                                                                    </span>
                                                                                                </td>
                                                                                                <td className="special_result">
                                                                                                    <input
                                                                                                        className="aptInfoSelect"
                                                                                                        value={
                                                                                                            data?.meetNumberOfPaymentsTf
                                                                                                                ? '충족'
                                                                                                                : '미충족'
                                                                                                        }
                                                                                                        readOnly={
                                                                                                            true
                                                                                                        }
                                                                                                    />
                                                                                                    <span>
                                                                                                        {data?.meetNumberOfPaymentsTf ===
                                                                                                        true ? (
                                                                                                            <span className="progress">
                                                                                                                <CheckCircleOutlined />
                                                                                                            </span>
                                                                                                        ) : null}
                                                                                                        {data?.meetNumberOfPaymentsTf ===
                                                                                                        false ? (
                                                                                                            <span className="secondRankTootip">
                                                                                                                <PauseCircleOutlined />
                                                                                                            </span>
                                                                                                        ) : null}
                                                                                                    </span>
                                                                                                </td>
                                                                                            </tr>

                                                                                            {/* 혼인신고일 이후 주택의 처분일이 존재하고 그것이 2018.12.10 이전일 경우 2순위 청약 신청만 가능 */}
                                                                                            {data?.meetNumberOfPaymentsTf ===
                                                                                            true ? (
                                                                                                <>
                                                                                                    <tr className="special_phase">
                                                                                                        <td className="qulificaiton">
                                                                                                            <span className="qulificaitonBox">
                                                                                                                주택
                                                                                                                처분일에
                                                                                                                의한
                                                                                                                2순위
                                                                                                                결정
                                                                                                                여부
                                                                                                            </span>
                                                                                                            <span className="info_tooltip">
                                                                                                                <InfoCircleOutlined />
                                                                                                                <span class="tooltip-text">
                                                                                                                    혼인신고일
                                                                                                                    이후
                                                                                                                    주택의
                                                                                                                    처분일이
                                                                                                                    존재하고
                                                                                                                    그것이
                                                                                                                    2018.12.10
                                                                                                                    이전일
                                                                                                                    경우
                                                                                                                    2순위
                                                                                                                    청약
                                                                                                                    신청만
                                                                                                                    가능.
                                                                                                                </span>
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td className="special_result">
                                                                                                            <input
                                                                                                                className="aptInfoSelect"
                                                                                                                value={
                                                                                                                    data?.secondChungyak
                                                                                                                        ? '충족'
                                                                                                                        : '미충족'
                                                                                                                }
                                                                                                                readOnly={
                                                                                                                    true
                                                                                                                }
                                                                                                            />
                                                                                                            <span>
                                                                                                                {data?.secondChungyak ===
                                                                                                                false ? (
                                                                                                                    <span className="progress">
                                                                                                                        <CheckCircleOutlined />
                                                                                                                    </span>
                                                                                                                ) : null}
                                                                                                                {data?.secondChungyak ===
                                                                                                                true ? (
                                                                                                                    <span className="secondRankTootip">
                                                                                                                        <PauseCircleOutlined />
                                                                                                                    </span>
                                                                                                                ) : null}
                                                                                                            </span>
                                                                                                        </td>
                                                                                                    </tr>

                                                                                                    {/* 미성년 자녀(태아 포함) 존재하는지 여부 */}
                                                                                                    {data?.secondChungyak ===
                                                                                                    false ? (
                                                                                                        <>
                                                                                                            <tr className="special_phase">
                                                                                                                <td className="qulificaiton">
                                                                                                                    <span className="qulificaitonBox">
                                                                                                                        미성년
                                                                                                                        자녀(태아
                                                                                                                        포함)
                                                                                                                        존재
                                                                                                                        여부
                                                                                                                    </span>
                                                                                                                    <span className="info_tooltip">
                                                                                                                        <InfoCircleOutlined />
                                                                                                                        <span class="tooltip-text"></span>
                                                                                                                    </span>
                                                                                                                </td>
                                                                                                                <td className="special_result">
                                                                                                                    <input
                                                                                                                        className="aptInfoSelect"
                                                                                                                        value={
                                                                                                                            data?.meetNumberOfPaymentsTf
                                                                                                                                ? '충족'
                                                                                                                                : '미충족'
                                                                                                                        }
                                                                                                                        readOnly={
                                                                                                                            true
                                                                                                                        }
                                                                                                                    />
                                                                                                                    <span>
                                                                                                                        {data?.hasMinorChildren ===
                                                                                                                        true ? (
                                                                                                                            <span className="progress">
                                                                                                                                <CheckCircleOutlined />
                                                                                                                            </span>
                                                                                                                        ) : null}
                                                                                                                        {data?.hasMinorChildren ===
                                                                                                                        false ? (
                                                                                                                            <span className="secondRankTootip">
                                                                                                                                <PauseCircleOutlined />
                                                                                                                            </span>
                                                                                                                        ) : null}
                                                                                                                    </span>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </>
                                                                                                    ) : null}
                                                                                                </>
                                                                                            ) : null}
                                                                                        </>
                                                                                    ) : null}
                                                                                </>
                                                                            ) : null}
                                                                        </>
                                                                    ) : null}
                                                                </>
                                                            ) : null}
                                                        </>
                                                    ) : null}
                                                </>
                                            ) : null}
                                        </>
                                    ) : null}
                                </table>

                                <div className="rankRes">
                                    {/* 순위 매기기 */}
                                    {/* 1순위 */}
                                    {data?.accountTf === true &&
                                    data?.meetLivingInSurroundAreaTf === true &&
                                    ((data?.americanAge < 20 &&
                                        form.supportYn === 'y') ||
                                        data?.americanAge >= 20) &&
                                    data?.meetHomelessHouseholdMembersTf ===
                                        true &&
                                    data?.meetMarriagePeriodIn7yearsTf ===
                                        true &&
                                    (data?.meetMonthlyAverageIncomePriority ===
                                        true ||
                                        data?.meetMonthlyAverageIncomeGeneral ===
                                            true) &&
                                    data?.meetBankbookJoinPeriodTf === true &&
                                    data?.meetNumberOfPaymentsTf === true &&
                                    data?.secondChungyak === false &&
                                    data?.hasMinorChildren === true
                                        ? (form.newlyMarriedKookminRes =
                                              '1순위')
                                        : null}

                                    {/* 2순위 */}
                                    {data?.accountTf === true &&
                                    data?.meetLivingInSurroundAreaTf === true &&
                                    ((data?.americanAge < 20 &&
                                        form.supportYn === 'y') ||
                                        data?.americanAge >= 20) &&
                                    data?.meetHomelessHouseholdMembersTf ===
                                        true &&
                                    data?.meetMarriagePeriodIn7yearsTf ===
                                        true &&
                                    (data?.meetMonthlyAverageIncomePriority ===
                                        true ||
                                        data?.meetMonthlyAverageIncomeGeneral ===
                                            true) &&
                                    data?.meetBankbookJoinPeriodTf === true &&
                                    data?.meetNumberOfPaymentsTf === true &&
                                    (data?.secondChungyak === true ||
                                        data?.hasMinorChildren === false)
                                        ? (form.newlyMarriedKookminRes =
                                              '2순위')
                                        : null}

                                    {/* 탈락 */}
                                    {data?.accountTf === false ||
                                    data?.meetLivingInSurroundAreaTf ===
                                        false ||
                                    (data?.americanAge < 20 &&
                                        form.supportYn === 'n') ||
                                    data?.meetHomelessHouseholdMembersTf ===
                                        false ||
                                    data?.meetMarriagePeriodIn7yearsTf ===
                                        false ||
                                    (data?.meetMonthlyAverageIncomePriority ===
                                        false &&
                                        data?.meetMonthlyAverageIncomeGeneral ===
                                            false) ||
                                    data?.meetBankbookJoinPeriodTf === false ||
                                    data?.meetNumberOfPaymentsTf === false
                                        ? (form.newlyMarriedKookminRes = '탈락')
                                        : null}
                                </div>

                                {/* 순위에 따른 페이지 이동 */}
                                {/* 1, 2순위 */}
                                {form.newlyMarriedKookminRes === '1순위' ||
                                form.newlyMarriedKookminRes === '2순위' ? (
                                    <div className="multiChildRankButton">
                                        <MainButton
                                            onClick={rankSuccess}
                                            type="submit"
                                            width="100"
                                            height="30"
                                            fontWeight="bold"
                                            marginLeft="20%"
                                        >
                                            순위 확인하기
                                        </MainButton>
                                    </div>
                                ) : null}

                                {/* 탈락 */}
                                {form.newlyMarriedKookminRes === '탈락' ? (
                                    <div className="multiChildRankButton">
                                        <MainButton
                                            onClick={fail}
                                            type="button"
                                            width="100"
                                            height="30"
                                            fontWeight="bold"
                                            marginLeft="20%"
                                        >
                                            순위 확인하기
                                        </MainButton>
                                    </div>
                                ) : null}
                            </form>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default NewlyMarriedKookminApi;
