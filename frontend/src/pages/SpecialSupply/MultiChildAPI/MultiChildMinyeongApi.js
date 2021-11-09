import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postMultiChildMinyeongAptNum } from '../../../store/actions/multiChildMinyeongAction';
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

const MultiChildMinyeongApi = ({ onSaveData }) => {
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    const multiChildMinyeongStore = useSelector(
        (state) => state.multiChildMinyeong
    ); // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const [loading, setLoading] = useState(true);
    const [notificationNumber, setNotificationNumber] = useState();
    const [housingType, setHousingType] = useState();
    const history = useHistory();

    const data = multiChildMinyeongStore?.postMultiChildMinyeongAptNum?.data; // 다자녀 민영 로직 접근 변수

    // 로딩 상태 적용
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [form, setForm] = useState({
        name: '',
        supportYn: '',
        multiChildMinyeongRes: '',
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
            multiChildMinyeongRes: '',
        });
    };

    useEffect(() => {
        if (multiChildMinyeongStore.postMultiChildMinyeongAptNum.data) {
            const data =
                multiChildMinyeongStore.postMultiChildMinyeongAptNum.data;
            console.log(JSON.stringify(data));
        }
    }, [multiChildMinyeongStore.postMultiChildMinyeongAptNum]);

    // 결과가 1, 2순위일 경우 순위확인 페이지로 연결
    const rankSuccess = async () => {
        if (
            form?.multiChildMinyeongRes === '1순위' ||
            form?.multiChildMinyeongRes === '2순위'
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
        if (form?.multiChildMinyeongRes === '탈락') {
            alert('자격 조건을 만족하지 못하는 항목이 있습니다.');
        }
    };

    return (
        <>
            {loading ? ( // 로딩 상태 2s
                <>
                    <Loading />
                    <p className="loading_msg">Please wait ...</p>
                    <p className="loading_msg">
                        회원님의 정보를 불러와{' '}
                        <strong className="text_highlight">
                            특별공급 다자녀 민영주택 유형
                        </strong>{' '}
                        자격을 확인하는 중입니다. 잠시만 기다려주세요.
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
                        ) + history.push('/')
                    ) : (
                        <>
                            <div className="special_title">
                                <h3 className="special_mainTitle">
                                    특별공급
                                    <span className="special_subTitle">
                                        | 다자녀 민영주택
                                    </span>
                                </h3>
                            </div>

                            <form
                                className="specialSupply_form"
                                onSubmit={handleSubmit}
                            >
                                <table className="specialMultiChildMinyeong_table">
                                    {data !== null ? (
                                        <>
                                            {/* 규제지역 판단. (규제지역 로직 결과값 넣기.)*/}
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
                                                                ※ 민영주택의
                                                                경우
                                                            </p>
                                                            주택청약종합저축
                                                            혹은 청약예금,
                                                            청약부금(85제곱미터이하)인
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
                                            <tr className="general_phase">
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
                                                <td className="general_result">
                                                    <input
                                                        className="generalAptInfoSelect"
                                                        value={
                                                            data?.meetLivingSurroundAreaTf
                                                                ? '충족'
                                                                : '미충족'
                                                        }
                                                        readOnly={true}
                                                    />
                                                    <span>
                                                        {data?.meetLivingSurroundAreaTf ===
                                                        true ? (
                                                            <span className="progress">
                                                                <CheckCircleOutlined />
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.meetLivingSurroundAreaTf ===
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

                                            {/* 세대구성원 무주택 판별 */}
                                            {data?.meetLivingSurroundAreaTf ===
                                            true ? (
                                                <>
                                                    <tr className="special_phase">
                                                        <td className="qulificaiton">
                                                            <span className="qulificaitonBox">
                                                                전세대구성원의
                                                                무주택 여부
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
                                                                readOnly={true}
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

                                                    {/* 3명 이상의 미성년 자녀수 충족 여부*/}
                                                    {data?.meetHomelessHouseholdMembersTf ===
                                                    true ? (
                                                        <>
                                                            <tr className="special_phase">
                                                                <td className="qulificaiton">
                                                                    <span className="qulificaitonBox">
                                                                        3명
                                                                        이상의
                                                                        미성년
                                                                        자녀 수
                                                                        충족
                                                                        여부
                                                                    </span>
                                                                </td>
                                                                <td className="special_result">
                                                                    <input
                                                                        className="aptInfoSelect"
                                                                        value={
                                                                            data?.calcMinorChildren
                                                                                ? '충족'
                                                                                : '미충족'
                                                                        }
                                                                        readOnly={
                                                                            true
                                                                        }
                                                                    />
                                                                    <span>
                                                                        {data?.calcMinorChildren >=
                                                                        3 ? (
                                                                            <span className="progress">
                                                                                <CheckCircleOutlined />
                                                                            </span>
                                                                        ) : null}
                                                                        {data?.calcMinorChildren <
                                                                        3 ? (
                                                                            <span className="pause_tooltip">
                                                                                <CloseCircleOutlined />
                                                                                <span class="pause-tooltip-text">
                                                                                    3명
                                                                                    이상의
                                                                                    미성년
                                                                                    자녀
                                                                                    수를
                                                                                    충족하는
                                                                                    경우에만
                                                                                    해당
                                                                                    청약
                                                                                    진행
                                                                                    가능.
                                                                                </span>
                                                                            </span>
                                                                        ) : null}
                                                                    </span>
                                                                </td>
                                                            </tr>

                                                            {data?.calcMinorChildren >=
                                                            3 ? (
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
                                                                                    '세'
                                                                                }
                                                                                readOnly={
                                                                                    true
                                                                                }
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
                                                                    {data?.americanAge <
                                                                    20 ? (
                                                                        <>
                                                                            {/* 미성년자인 경우 세대주 판별 */}
                                                                            <tr className="special_phase">
                                                                                <td className="qulificaiton">
                                                                                    <span className="qulificaitonBox">
                                                                                        세대주
                                                                                        여부
                                                                                    </span>
                                                                                </td>
                                                                                <td className="special_result">
                                                                                    <input
                                                                                        className="aptInfoSelect"
                                                                                        value={
                                                                                            data?.householderTf
                                                                                                ? '세대주'
                                                                                                : '세대구성원'
                                                                                        }
                                                                                        readOnly={
                                                                                            true
                                                                                        }
                                                                                    />
                                                                                    <span>
                                                                                        {data?.householderTf ===
                                                                                        true ? (
                                                                                            <span className="progress">
                                                                                                <CheckCircleOutlined />
                                                                                            </span>
                                                                                        ) : null}

                                                                                        {data?.householderTf ===
                                                                                        false ? (
                                                                                            <span className="pause_tooltip">
                                                                                                <CloseCircleOutlined />
                                                                                                <span class="pause-tooltip-text">
                                                                                                    만
                                                                                                    19세
                                                                                                    미만
                                                                                                    미성년자는
                                                                                                    세대주일
                                                                                                    경우에만
                                                                                                    해당
                                                                                                    청약
                                                                                                    진행
                                                                                                    가능.
                                                                                                </span>
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>

                                                                            {/* 세대주 여부를 먼저 충족시켜야 보여지는 로직. */}
                                                                            {/* 미성년자인 경우 형제, 자매 부양 판별 */}
                                                                            {data?.householderTf ===
                                                                            true ? (
                                                                                <>
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
                                                                        </>
                                                                    ) : null}

                                                                    {(data?.americanAge <
                                                                        20 &&
                                                                        data?.householderTf ===
                                                                            true &&
                                                                        form.supportYn ===
                                                                            'y') ||
                                                                    data?.americanAge >
                                                                        20 ? (
                                                                        <>
                                                                            {/* 순위 판별 시작 */}
                                                                            {/* 주거전용 85㎡ 기준 충족*/}
                                                                            <tr className="special_phase">
                                                                                <td className="qulificaiton">
                                                                                    <span className="qulificaitonBox">
                                                                                        주거전용
                                                                                        85㎡
                                                                                        초과공공건설임대주택,
                                                                                        수도권에
                                                                                        지정된
                                                                                        공공주택지구에서
                                                                                        공급하는
                                                                                        민영주택에
                                                                                        청약하는가?
                                                                                    </span>
                                                                                </td>
                                                                                <td className="special_result">
                                                                                    <input
                                                                                        className="aptInfoSelect"
                                                                                        value={
                                                                                            data?.priorityApt
                                                                                                ? '예'
                                                                                                : '아니오'
                                                                                        }
                                                                                        readOnly={
                                                                                            true
                                                                                        }
                                                                                    />
                                                                                    <span>
                                                                                        {data?.priorityApt ===
                                                                                        true ? (
                                                                                            <span
                                                                                                className="progress"
                                                                                                readOnly={
                                                                                                    true
                                                                                                }
                                                                                            >
                                                                                                <CheckCircleOutlined />
                                                                                            </span>
                                                                                        ) : null}
                                                                                        {data?.priorityApt ===
                                                                                        false ? (
                                                                                            <span className="secondRankTootip">
                                                                                                <PauseCircleOutlined />
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>

                                                                            {/* 규제 지역인 경우에만 보이도록 */}
                                                                            {data?.priorityApt ===
                                                                            true ? (
                                                                                <>
                                                                                    {data?.restrictedAreaTf ===
                                                                                    true ? (
                                                                                        <>
                                                                                            <tr className="special_phase">
                                                                                                <td className="qulificaiton">
                                                                                                    <span className="qulificaitonBox">
                                                                                                        전세대원의
                                                                                                        재당첨
                                                                                                        제한
                                                                                                        여부
                                                                                                    </span>
                                                                                                </td>
                                                                                                <td className="special_result">
                                                                                                    <input
                                                                                                        className="aptInfoSelect"
                                                                                                        value={
                                                                                                            data?.meetAllHouseMemberRewinningRestrictionTf ===
                                                                                                            true
                                                                                                                ? '제한 없음'
                                                                                                                : '제한 있음'
                                                                                                        }
                                                                                                        readOnly={
                                                                                                            true
                                                                                                        }
                                                                                                    />
                                                                                                    <span>
                                                                                                        {data?.meetAllHouseMemberRewinningRestrictionTf ===
                                                                                                        true ? (
                                                                                                            <span className="progress">
                                                                                                                <CheckCircleOutlined />
                                                                                                            </span>
                                                                                                        ) : null}
                                                                                                        {data?.meetAllHouseMemberRewinningRestrictionTf ===
                                                                                                        false ? (
                                                                                                            <span className="pause_tooltip">
                                                                                                                <CloseCircleOutlined />
                                                                                                                <span class="pause-tooltip-text">
                                                                                                                    제당첨
                                                                                                                    제한
                                                                                                                    있을
                                                                                                                    경우
                                                                                                                    탈락.
                                                                                                                </span>
                                                                                                            </span>
                                                                                                        ) : null}
                                                                                                    </span>
                                                                                                </td>
                                                                                            </tr>

                                                                                            {data?.meetAllHouseMemberRewinningRestrictionTf ===
                                                                                            true ? (
                                                                                                <>
                                                                                                    {/* 위 조건이 만족하면서 2주택 미만 여부를 만족해야함. */}
                                                                                                    {/* 2주택 이상 소유 시 2순위 */}
                                                                                                    <tr className="special_phase">
                                                                                                        <td className="qulificaiton">
                                                                                                            <span className="qulificaitonBox">
                                                                                                                2주택
                                                                                                                미만
                                                                                                                소유
                                                                                                                여부
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td className="special_result">
                                                                                                            <input
                                                                                                                className="aptInfoSelect"
                                                                                                                value={
                                                                                                                    data?.meetHouseHavingLessThan2Apt
                                                                                                                        ? '충족'
                                                                                                                        : '미충족'
                                                                                                                }
                                                                                                                readOnly={
                                                                                                                    true
                                                                                                                }
                                                                                                            />
                                                                                                            <span>
                                                                                                                {data?.meetHouseHavingLessThan2Apt ===
                                                                                                                true ? (
                                                                                                                    <span
                                                                                                                        className="progress"
                                                                                                                        readOnly={
                                                                                                                            true
                                                                                                                        }
                                                                                                                    >
                                                                                                                        <CheckCircleOutlined />
                                                                                                                    </span>
                                                                                                                ) : null}
                                                                                                                {data?.meetHouseHavingLessThan2Apt ===
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

                                                                                    {/* 청약통장 가입기간 충족 여부 */}
                                                                                    {
                                                                                        // 규제지역인 경우
                                                                                        (data?.restrictedAreaTf ===
                                                                                            true &&
                                                                                            data?.meetHouseHavingLessThan2Apt ===
                                                                                                true &&
                                                                                            data?.meetAllHouseMemberRewinningRestrictionTf ===
                                                                                                true) ||
                                                                                        // 규제지역이 아닌경우
                                                                                        data?.restrictedAreaTf ===
                                                                                            false ? (
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
                                                                                                                data?.meetBankJoinPeriodTf
                                                                                                                    ? '충족'
                                                                                                                    : '미충족'
                                                                                                            }
                                                                                                            readOnly={
                                                                                                                true
                                                                                                            }
                                                                                                        />
                                                                                                        <span>
                                                                                                            {data?.meetBankJoinPeriodTf ===
                                                                                                            true ? (
                                                                                                                <span className="progress">
                                                                                                                    <CheckCircleOutlined />
                                                                                                                </span>
                                                                                                            ) : null}
                                                                                                            {data?.meetBankJoinPeriodTf ===
                                                                                                            false ? (
                                                                                                                <span className="secondRankTootip">
                                                                                                                    <PauseCircleOutlined />
                                                                                                                </span>
                                                                                                            ) : null}
                                                                                                        </span>
                                                                                                    </td>
                                                                                                </tr>

                                                                                                {/* 예치 금액 충족 여부 */}
                                                                                                {data?.meetBankJoinPeriodTf ===
                                                                                                true ? (
                                                                                                    <>
                                                                                                        <tr className="special_phase">
                                                                                                            <td className="qulificaiton">
                                                                                                                <span className="qulificaitonBox">
                                                                                                                    예치
                                                                                                                    금액
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
                                                                                                                                    구분
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    서울/부산
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    기타
                                                                                                                                    광역시
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    기타
                                                                                                                                    시/군
                                                                                                                                </td>
                                                                                                                            </tr>
                                                                                                                            <tr>
                                                                                                                                <td>
                                                                                                                                    85㎡
                                                                                                                                    이하
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    300만원
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    250만원
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    200만원
                                                                                                                                </td>
                                                                                                                            </tr>
                                                                                                                            <tr>
                                                                                                                                <td>
                                                                                                                                    102㎡
                                                                                                                                    이하
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    600만원
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    400만원
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    300만원
                                                                                                                                </td>
                                                                                                                            </tr>
                                                                                                                            <tr>
                                                                                                                                <td>
                                                                                                                                    135㎡
                                                                                                                                    이하
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    1000만원
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    700만원
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    400만원
                                                                                                                                </td>
                                                                                                                            </tr>
                                                                                                                            <tr>
                                                                                                                                <td>
                                                                                                                                    모든
                                                                                                                                    면적
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    1500만원
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    1000만원
                                                                                                                                </td>
                                                                                                                                <td>
                                                                                                                                    500만원
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
                                                                                                                        data?.meetDepositTf
                                                                                                                            ? '충족'
                                                                                                                            : '미충족'
                                                                                                                    }
                                                                                                                    readOnly={
                                                                                                                        true
                                                                                                                    }
                                                                                                                />
                                                                                                                <span>
                                                                                                                    {
                                                                                                                        // 규제지역인 경우
                                                                                                                        data?.meetDepositTf ===
                                                                                                                        true ? (
                                                                                                                            <span className="progress">
                                                                                                                                <CheckCircleOutlined />
                                                                                                                            </span>
                                                                                                                        ) : null
                                                                                                                    }
                                                                                                                    {data?.meetDepositTf ===
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
                                                                                        ) : null
                                                                                    }
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
                                    data?.meetLivingSurroundAreaTf === true &&
                                    data?.meetHomelessHouseholdMembersTf ===
                                        true &&
                                    data?.calcMinorChildren >= 3 &&
                                    ((data?.americanAge < 20 &&
                                        form.supportYn === 'y' &&
                                        data?.householderTf === true) ||
                                        data?.americanAge >= 20) &&
                                    ((data?.restrictedAreaTf === true &&
                                        data?.meetAllHouseMemberRewinningRestrictionTf ===
                                            true &&
                                        data?.meetHouseHavingLessThan2Apt ===
                                            true) ||
                                        data?.restrictedAreaTf === false) &&
                                    data?.meetBankbookJoinPeriodTf === true &&
                                    data?.meetDepositTf === true
                                        ? (form.multiChildMinyeongRes = '1순위')
                                        : null}

                                    {/* 2순위 */}
                                    {data?.accountTf === true &&
                                    data?.meetLivingSurroundAreaTf === true &&
                                    data?.meetHomelessHouseholdMembersTf ===
                                        true &&
                                    data?.calcMinorChildren >= 3 &&
                                    ((data?.americanAge < 20 &&
                                        form.supportYn === 'y' &&
                                        data?.householderTf === true) ||
                                        data?.americanAge >= 20) &&
                                    (data?.priorityApt === false ||
                                        (data?.restrictedAreaTf === true && // 규제지역
                                            data?.meetAllHouseMemberRewinningRestrictionTf ===
                                                true &&
                                            (data?.meetHouseHavingLessThan2Apt ===
                                                false ||
                                                data?.meetBankbookJoinPeriodTf ===
                                                    false ||
                                                data?.meetDepositTf ===
                                                    false)) ||
                                        // 비규제지역
                                        (data?.restrictedAreaTf === false &&
                                            (data?.meetBankbookJoinPeriodTf ===
                                                false ||
                                                data?.meetDepositTf === false)))
                                        ? (form.multiChildMinyeongRes = '2순위')
                                        : null}

                                    {/* 탈락 */}
                                    {data?.accountTf === false ||
                                    data?.meetLivingSurroundAreaTf === false ||
                                    data?.meetHomelessHouseholdMembersTf ===
                                        false ||
                                    data?.calcMinorChildren < 3 ||
                                    (data?.americanAge < 20 &&
                                        (form.supportYn === 'n' ||
                                            data?.householderTf === false)) ||
                                    (data?.restrictedAreaTf === true &&
                                        data?.meetAllHouseMemberRewinningRestrictionTf ===
                                            false)
                                        ? (form.multiChildMinyeongRes = '탈락')
                                        : null}
                                </div>

                                {/* 순위에 따른 페이지 이동 */}
                                {/* 1, 2순위 */}
                                {form.multiChildMinyeongRes === '1순위' ||
                                form.multiChildMinyeongRes === '2순위' ? (
                                    <div className="multiChildRankButton">
                                        <MainButton
                                            onClick={rankSuccess}
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

                                {/* 탈락 */}
                                {form.multiChildMinyeongRes === '탈락' ? (
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

export default MultiChildMinyeongApi;
