import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postFirstInLifeMinyeongAptNum } from '../../../store/actions/firstInLifeMinyeongAction';
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

const FirstLifeMinyeongApi = ({ onSaveData }) => {
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    const firstLifeMinyeongStore = useSelector(
        (state) => state.firstInLifeMinyeong
    ); // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const [loading, setLoading] = useState(true);
    const [notificationNumber, setNotificationNumber] = useState();
    const [housingType, setHousingType] = useState();
    const history = useHistory();
    const location = useLocation(); // aptNum 페이지의 props 불러오기

    const data = firstLifeMinyeongStore?.postFirstInLifeMinyeongAptNum?.data; // 생애최초 민영 로직 접근 변수

    // 로딩 상태 적용
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [form, setForm] = useState({
        name: '',
        incomeTaxPayYn: '',
        firstLifeMinyeongRes: '',
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
            incomeTaxPayYn: '',
            firstLifeMinyeongRes: '',
        });
    };

    useEffect(() => {
        if (firstLifeMinyeongStore?.postFirstInLifeMinyeongAptNum?.data) {
            const data =
                firstLifeMinyeongStore.postFirstInLifeMinyeongAptNum.data;
            console.log(JSON.stringify(data));
        }
    }, [firstLifeMinyeongStore?.postFirstInLifeMinyeongAptNum]);

    // 결과가 1, 2순위일 경우 순위확인 페이지로 연결
    const rankSuccess = async () => {
        if (form?.firstLifeMinyeongRes === '1순위') {
            history.push({
                pathname: '/firstRank',
                state: {
                    form,
                },
            });
        }
    };

    const fail = async () => {
        if (form?.firstLifeMinyeongRes === '탈락') {
            alert(
                '자격 조건을 만족하지 못하는 항목이 있습니다. \n 탈락입니다.'
            );
        }
    };

    return (
        <>
            {loading ? ( // 로딩 상태 2s
                <Loading />
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
                        ) + history.push('/')
                    ) : (
                        <>
                            <div className="special_title">
                                <h3 className="special_mainTitle">
                                    특별공급
                                    <span className="special_subTitle">
                                        | 생애최초 민영주택
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
                                        <p className="foreignWarning">
                                            * 일반공급 1순위인 경우에만 청약
                                            신청 가능합니다.
                                        </p>
                                    </p>

                                    {data !== null ? (
                                        <>
                                            {/* 세대구성원 무주택 판별 */}
                                            <tr className="special_phase">
                                                <td className="qulificaiton">
                                                    <span className="qulificaitonBox">
                                                        전세대구성원의 무주택
                                                        여부
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span class="tooltip-text">
                                                            <p>
                                                                <div>
                                                                    ※ 무주택
                                                                    조건
                                                                </div>
                                                                <div className="tooltip-text-info">
                                                                    : 무주택
                                                                    기간 산정은
                                                                    본인 기준 만
                                                                    30세부터
                                                                    하되, 그
                                                                    전에 혼인한
                                                                    경우
                                                                    혼인신고일을
                                                                    기준으로
                                                                    산정함.
                                                                </div>
                                                            </p>
                                                            <p>
                                                                <li>
                                                                    60세 이상
                                                                    직계존속이
                                                                    소유한 주택
                                                                    혹은 분양권
                                                                </li>
                                                                <li>
                                                                    3개월 이내
                                                                    처분한
                                                                    상속주택
                                                                </li>
                                                                <li>
                                                                    비도시 지역
                                                                    단독주택
                                                                </li>
                                                                <li>
                                                                    소형, 저가
                                                                    주택
                                                                </li>
                                                                <li>
                                                                    폐가 소유
                                                                </li>
                                                                <li>
                                                                    무허가 건물
                                                                    소유
                                                                </li>
                                                                <li>
                                                                    문화재 지정
                                                                    주택
                                                                </li>
                                                                <li>
                                                                    미분양 주택
                                                                    분양권
                                                                </li>
                                                                <li>
                                                                    사업 목적
                                                                </li>
                                                            </p>
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="special_result">
                                                    <input
                                                        className="aptInfoSelect"
                                                        value={
                                                            data?.homelessYn
                                                                ? '충족'
                                                                : '미충족'
                                                        }
                                                        readOnly={true}
                                                    />
                                                    <span>
                                                        {data?.homelessYn ===
                                                        true ? (
                                                            <span className="progress">
                                                                <CheckCircleOutlined />
                                                            </span>
                                                        ) : null}
                                                        {data?.homelessYn ===
                                                        false ? (
                                                            <span className="pause_tooltip">
                                                                <CloseCircleOutlined />
                                                                <span class="pause-tooltip-text">
                                                                    전 세대
                                                                    구성원이
                                                                    무주택이
                                                                    아닐 시 청약
                                                                    자격 미달.
                                                                </span>
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                </td>
                                            </tr>
                                        </>
                                    ) : null}

                                    {data?.homelessYn === true ? (
                                        <>
                                            {/* 전용면적 85㎡ 이하 민영주택 여부 */}
                                            <tr className="special_phase">
                                                <td className="qulificaiton">
                                                    <span className="qulificaitonBox">
                                                        전용면적 85㎡ 이하
                                                        민영주택 여부
                                                    </span>
                                                    <span className="info_tooltip"></span>
                                                </td>
                                                <td className="special_result">
                                                    <input
                                                        className="aptInfoSelect"
                                                        value={
                                                            data?.targetHousingType
                                                                ? '충족'
                                                                : '미충족'
                                                        }
                                                        readOnly={true}
                                                    />
                                                    <span>
                                                        {data?.targetHousingType ===
                                                        true ? (
                                                            <span className="progress">
                                                                <CheckCircleOutlined />
                                                            </span>
                                                        ) : null}
                                                        {data?.targetHousingType ===
                                                        false ? (
                                                            <span className="pause_tooltip">
                                                                <CloseCircleOutlined />
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                </td>
                                            </tr>

                                            {data?.targetHousingType ===
                                            true ? (
                                                <>
                                                    {/* 투기과열지구 내 분양가 9억 초과 주택 여부 */}
                                                    <tr className="special_phase">
                                                        <td className="qulificaiton">
                                                            <span className="qulificaitonBox">
                                                                투기과열지구 내
                                                                분양가 9억원
                                                                이하 주택 여부
                                                            </span>
                                                            <span className="info_tooltip"></span>
                                                        </td>
                                                        <td className="special_result">
                                                            <input
                                                                className="aptInfoSelect"
                                                                value={
                                                                    data?.targetHouseAmount
                                                                        ? '충족'
                                                                        : '미충족'
                                                                }
                                                                readOnly={true}
                                                            />
                                                            <span>
                                                                {data?.targetHouseAmount ===
                                                                true ? (
                                                                    <span className="progress">
                                                                        <CheckCircleOutlined />
                                                                    </span>
                                                                ) : null}
                                                                {data?.targetHouseAmount ===
                                                                false ? (
                                                                    <span className="pause_tooltip">
                                                                        <CloseCircleOutlined />
                                                                    </span>
                                                                ) : null}
                                                            </span>
                                                        </td>
                                                    </tr>

                                                    {data?.targetHouseAmount ===
                                                    true ? (
                                                        <>
                                                            {/*  전세대 구성원의 소득 기준 충족 여부*/}
                                                            <tr className="special_phase">
                                                                <td className="qulificaiton">
                                                                    <span className="qulificaitonBox">
                                                                        전세대
                                                                        구성원의
                                                                        소득
                                                                        기준
                                                                        충족
                                                                        여부
                                                                    </span>
                                                                    <span class="tooltip-text">
                                                                        <p>
                                                                            <div>
                                                                                ※
                                                                                소득
                                                                                기준
                                                                                충족
                                                                            </div>
                                                                            <div className="tooltip-text-info">
                                                                                해당
                                                                                세대의
                                                                                월평균
                                                                                소득이
                                                                                전년도
                                                                                도시근로자
                                                                                가구당
                                                                                월평균
                                                                                소득의
                                                                                130%
                                                                                이하를
                                                                                만족해야
                                                                                한다.
                                                                            </div>
                                                                            <div className="tooltip-text-info">
                                                                                단,
                                                                                21.2.2.
                                                                                공급승인신청분부터
                                                                                해당
                                                                                세대의
                                                                                월평균
                                                                                소득이
                                                                                전년도
                                                                                도시근로자
                                                                                가구당
                                                                                월평균
                                                                                소득의
                                                                                160%
                                                                                이하를
                                                                                만족해야
                                                                                한다.
                                                                            </div>
                                                                        </p>
                                                                    </span>
                                                                </td>
                                                                <td className="special_result">
                                                                    <input
                                                                        className="aptInfoSelect"
                                                                        value={
                                                                            data?.monthOfAverageIncomePriority
                                                                                ? '충족'
                                                                                : '미충족'
                                                                        }
                                                                        readOnly={
                                                                            true
                                                                        }
                                                                    />
                                                                    <span>
                                                                        {data?.monthOfAverageIncomePriority ===
                                                                        true ? (
                                                                            <span className="progress">
                                                                                <CheckCircleOutlined />
                                                                            </span>
                                                                        ) : null}
                                                                        {data?.monthOfAverageIncomePriority ===
                                                                        false ? (
                                                                            <span className="pause_tooltip">
                                                                                <CloseCircleOutlined />
                                                                                <span class="pause-tooltip-text">
                                                                                    해당
                                                                                    세대의
                                                                                    월평균
                                                                                    소득
                                                                                    미충족
                                                                                </span>
                                                                            </span>
                                                                        ) : null}
                                                                    </span>
                                                                </td>
                                                            </tr>

                                                            {data?.monthOfAverageIncomePriority ===
                                                            true ? (
                                                                <>
                                                                    {/*대상자 충족여부(혼인, 미혼 자녀 유무 여부)*/}
                                                                    <tr className="special_phase">
                                                                        <td className="qulificaiton">
                                                                            <span className="qulificaitonBox">
                                                                                신청자
                                                                                본인이
                                                                                혼인
                                                                                상태이거나
                                                                                미혼인
                                                                                자녀의
                                                                                존재
                                                                                여부
                                                                            </span>
                                                                            <span class="tooltip-text">
                                                                                <p>
                                                                                    <div>
                                                                                        ※
                                                                                        대상자
                                                                                        충족
                                                                                    </div>
                                                                                    <div className="tooltip-text-info">
                                                                                        입주자모집공고일
                                                                                        현재
                                                                                        혼인
                                                                                        중이거나
                                                                                        미혼인
                                                                                        자녀(입양을
                                                                                        포함,
                                                                                        혼인
                                                                                        중이
                                                                                        아닌
                                                                                        경우에는
                                                                                        동일한
                                                                                        주민등록표
                                                                                        등본에
                                                                                        올라
                                                                                        있는
                                                                                        자녀를
                                                                                        말함)가
                                                                                        있는
                                                                                        분을
                                                                                        대상으로
                                                                                        함.
                                                                                    </div>
                                                                                </p>
                                                                            </span>
                                                                        </td>
                                                                        <td className="special_result">
                                                                            <input
                                                                                className="aptInfoSelect"
                                                                                value={
                                                                                    data?.vaildObject
                                                                                        ? '충족'
                                                                                        : '미충족'
                                                                                }
                                                                                readOnly={
                                                                                    true
                                                                                }
                                                                            />
                                                                            <span>
                                                                                {data?.vaildObject ===
                                                                                true ? (
                                                                                    <span className="progress">
                                                                                        <CheckCircleOutlined />
                                                                                    </span>
                                                                                ) : null}
                                                                                {data?.vaildObject ===
                                                                                false ? (
                                                                                    <span className="pause_tooltip">
                                                                                        <CloseCircleOutlined />
                                                                                        <span class="pause-tooltip-text">
                                                                                            해당
                                                                                            세대의
                                                                                            월평균
                                                                                            소득
                                                                                            미충족
                                                                                        </span>
                                                                                    </span>
                                                                                ) : null}
                                                                            </span>
                                                                        </td>
                                                                    </tr>

                                                                    {/* data 값이 없음. -> 우선 monthOfAverageIncomeGeneral로 대체*/}
                                                                    {data?.vaildObject ===
                                                                    true ? (
                                                                        <>
                                                                            {/* 투기과열지구 또는 청약 과열지역의 주택에 특별공급 청약시 과거 5년 이내에 다른 주택에 당첨된 자가 세대에 속해있는지 여부 확인*/}
                                                                            <tr className="special_phase">
                                                                                <td className="qulificaiton">
                                                                                    <span className="qulificaitonBox">
                                                                                        규제지역인
                                                                                        경우,
                                                                                        과거
                                                                                        5년
                                                                                        이내에
                                                                                        다른
                                                                                        주택에
                                                                                        당첨된
                                                                                        자가
                                                                                        세대에
                                                                                        속해있는지
                                                                                        여부
                                                                                    </span>
                                                                                    <span class="tooltip-text">
                                                                                        <p>
                                                                                            <div>
                                                                                                ※
                                                                                                특별공급
                                                                                                재당첨
                                                                                                제한
                                                                                            </div>
                                                                                            <div className="tooltip-text-info">
                                                                                                *
                                                                                                투기과열지구
                                                                                                또는
                                                                                                청약과열지역의
                                                                                                주택에
                                                                                                특별공급
                                                                                                청약
                                                                                                시
                                                                                                과거
                                                                                                5년
                                                                                                이내에
                                                                                                다른
                                                                                                주택에
                                                                                                당첨된
                                                                                                자가
                                                                                                속해
                                                                                                있는
                                                                                                세대에
                                                                                                속한
                                                                                                자는
                                                                                                청약불가
                                                                                            </div>
                                                                                        </p>
                                                                                    </span>
                                                                                </td>
                                                                                <td className="special_result">
                                                                                    <input
                                                                                        className="aptInfoSelect"
                                                                                        value={
                                                                                            data?.monthOfAverageIncomeGeneral
                                                                                                ? '충족'
                                                                                                : '미충족'
                                                                                        }
                                                                                        readOnly={
                                                                                            true
                                                                                        }
                                                                                    />
                                                                                    <span>
                                                                                        {data?.monthOfAverageIncomeGeneral ===
                                                                                        true ? (
                                                                                            <span className="progress">
                                                                                                <CheckCircleOutlined />
                                                                                            </span>
                                                                                        ) : null}
                                                                                        {data?.monthOfAverageIncomeGeneral ===
                                                                                        false ? (
                                                                                            <span className="pause_tooltip">
                                                                                                <CloseCircleOutlined />
                                                                                                <span class="pause-tooltip-text">
                                                                                                    특별공급
                                                                                                    청약
                                                                                                    재당첨
                                                                                                    제한에
                                                                                                    의한
                                                                                                    미충족
                                                                                                    발생.
                                                                                                </span>
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>

                                                                            {data?.monthOfAverageIncomeGeneral ===
                                                                            true ? (
                                                                                <>
                                                                                    {/* 입주자모집공고일 현재 근로자 또는 자영업자로서 5년 이상 소득세를 납부 여부*/}
                                                                                    <tr className="special_phase">
                                                                                        <td className="qulificaiton">
                                                                                            <span className="qulificaitonBox">
                                                                                                입주자모집공고일
                                                                                                현재
                                                                                                근로자
                                                                                                혹은
                                                                                                자영업자로서
                                                                                                5년
                                                                                                이상
                                                                                                소득세
                                                                                                납부
                                                                                                여부
                                                                                            </span>
                                                                                        </td>
                                                                                        <td className="special_result">
                                                                                            <span className="special_result_input">
                                                                                                <input
                                                                                                    className="isSupportInput"
                                                                                                    type="radio"
                                                                                                    name="incomeTaxPayYn"
                                                                                                    onChange={
                                                                                                        onChange
                                                                                                    }
                                                                                                    value="y"
                                                                                                    checked={
                                                                                                        form.incomeTaxPayYn ===
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
                                                                                                    name="incomeTaxPayYn"
                                                                                                    onChange={
                                                                                                        onChange
                                                                                                    }
                                                                                                    value="n"
                                                                                                    checked={
                                                                                                        form.incomeTaxPayYn ===
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
                                                                                                {form?.incomeTaxPayYn ===
                                                                                                'y' ? (
                                                                                                    <span className="progress">
                                                                                                        <CheckCircleOutlined />
                                                                                                    </span>
                                                                                                ) : null}
                                                                                                {form.incomeTaxPayYn ===
                                                                                                'n' ? (
                                                                                                    <span className="pause_tooltip">
                                                                                                        <CloseCircleOutlined />
                                                                                                        <span class="pause-tooltip-text">
                                                                                                            근로자
                                                                                                            혹은
                                                                                                            자영업자로서
                                                                                                            소득세
                                                                                                            미납부
                                                                                                            의한
                                                                                                            미충족
                                                                                                            발생.
                                                                                                        </span>
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
                                </table>

                                <div className="rankRes">
                                    {/* 순위 매기기 */}
                                    {/* 1순위(모든 자격 true일 경우) or 탈락(어떠한 자격이 하나라도 결과가 false일 경우) */}
                                    {data?.homelessYn === true &&
                                    data?.targetHousingType === true &&
                                    data?.targetHouseAmount === true &&
                                    data?.monthOfAverageIncomePriority ===
                                        true &&
                                    data?.vaildObject === true &&
                                    data?.monthOfAverageIncomeGeneral ===
                                        true &&
                                    form.incomeTaxPayYn === 'y'
                                        ? (form.firstLifeMinyeongRes = '1순위')
                                        : (form.firstLifeMinyeongRes = '탈락')}
                                </div>

                                {/* 순위에 따른 페이지 이동 */}
                                {/*1순위*/}
                                {form.firstLifeMinyeongRes === '1순위' ? (
                                    <div className="firstLifeRankButton">
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

                                {/*탈락*/}
                                {form.firstLifeMinyeongRes === '탈락' ? (
                                    <div className="firstLifeRankButton">
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

export default FirstLifeMinyeongApi;
