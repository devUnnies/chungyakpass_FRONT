import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postOldParentMinyeongAptNum } from '../../../store/actions/oldParentMinyeongAction';
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

const OldParentMinyeongApi = ({ onSaveData }) => {
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    const oldParentMinyeongStore = useSelector(
        (state) => state.oldParentMinyeong
    ); // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const [loading, setLoading] = useState(false);
    const [notificationNumber, setNotificationNumber] = useState();
    const [housingType, setHousingType] = useState();
    const history = useHistory();

    const data = oldParentMinyeongStore?.postOldParentMinyeongAptNum?.data; // 다자녀 민영 로직 접근 변수

    const [form, setForm] = useState({
        name: '',
        supportYn: '',
        oldParentMinyeongRes: '',
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
            oldParentMinyeongRes: '',
        });
    };

    useEffect(() => {
        if (oldParentMinyeongStore?.postOldParentMinyeongAptNum?.data) {
            const data =
                oldParentMinyeongStore.postOldParentMinyeongAptNum.data;
            console.log(JSON.stringify(data));
        }
    }, [oldParentMinyeongStore?.postOldParentMinyeongAptNum]);

    // 결과가 1, 2순위일 경우 순위확인 페이지로 연결
    const rankSuccess = async () => {
        if (form?.oldParentMinyeongRes === '1순위') {
            history.push({
                pathname: '/firstRank',
                state: {
                    form,
                },
            });
        }
    };

    const fail = async () => {
        if (form?.oldParentMinyeongRes !== '1순위') {
            alert(
                '입력값이 비어있거나 자격 조건을 만족하지 못하는 항목이 있습니다.'
            );
        }
    };

    return (
        <>
            {/* 공통 정보 입력 오류 값에 의한 error 발생 시(data.error 값이 null이 아닌 경우) alert 창으로 접근 막음.
        공통 정보 입력 수정 페이지 생성 시 수정 페이지로 연결하기. */}
            {data?.error === 'BAD_REQUEST' ? (
                alert(data?.code + '\n' + data?.message) + history.push('/')
            ) : (
                <>
                    <div className="special_title">
                        <h3 className="special_mainTitle">
                            특별공급
                            <span className="special_subTitle">
                                | 노부모부양 민영주택
                            </span>
                        </h3>
                    </div>

                    <form
                        className="specialSupply_form"
                        onSubmit={handleSubmit}
                    >
                        <table className="specialOldParentMinyeong_table">
                            {data !== null ? (
                                <>
                                    {/* 규제지역 판단. (규제지역 로직 결과값 넣기.)*/}
                                    <tr className="special_phase">
                                        <td className="qulificaiton">
                                            <span className="qulificaitonBox">
                                                선택한 아파트가 투기과열지구
                                                또는 청약과열지역인가?
                                            </span>
                                            <span className="info_tooltip">
                                                <InfoCircleOutlined />
                                                <span class="tooltip-text">
                                                    <p>
                                                        규제 지역('투기과열지구'
                                                        혹은 '청약과열지역') ?
                                                    </p>
                                                    정부에서 주로 부동산의 투기
                                                    방지, 주택 시장 안정화 등을
                                                    위해 지정하여 관리하는 지역.
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
                                                    <p>※ 민영주택의 경우</p>
                                                    주택청약종합저축 혹은
                                                    청약예금,
                                                    청약부금(85제곱미터이하)인
                                                    경우에만 청약통장 조건 만족.
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
                                                {data?.accountTf === true ? (
                                                    <span className="progress">
                                                        <CheckCircleOutlined />
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                                {data?.accountTf === false ? (
                                                    <span className="pause_tooltip">
                                                        <CloseCircleOutlined />
                                                        <span class="pause-tooltip-text">
                                                            청약 통장 조건
                                                            미충족 시 부적격
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
                                    {/* 세대주 여부 판단 */}
                                    <tr className="special_phase">
                                        <td className="qulificaiton">
                                            <span className="qulificaitonBox">
                                                세대주 여부
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
                                                readOnly={true}
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
                                                            만 19세 미만
                                                            미성년자는 세대주일
                                                            경우에만 해당 청약
                                                            진행 가능.
                                                        </span>
                                                    </span>
                                                ) : null}
                                            </span>
                                        </td>
                                    </tr>

                                    {data?.householderTf === true ? (
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
                                                                    나이 입력
                                                                    필요.
                                                                </span>
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                </td>
                                            </tr>

                                            {/* 미성년자인 경우 형제, 자매 부양 조건 충족 */}
                                            {data?.americanAge < 20 ? (
                                                <>
                                                    <tr className="special_phase">
                                                        <td className="qulificaiton">
                                                            <span className="qulificaitonBox">
                                                                형제, 자매 부양
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

                                            {/* 세대구성원 무주택 판별 */}
                                            {data?.americanAge >= 20 ||
                                            (data?.americanAge < 20 &&
                                                form.supportYn === true) ? (
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

                                                    {data?.meetHomelessHouseholdMembersTf ===
                                                    true ? (
                                                        <>
                                                            {/* 3년 이상 노부모 부양 여부 */}
                                                            <tr className="special_phase">
                                                                <td className="qulificaiton">
                                                                    <span className="qulificaitonBox">
                                                                        3년 이상
                                                                        노부모
                                                                        부양
                                                                        여부
                                                                    </span>
                                                                </td>
                                                                <td className="special_result">
                                                                    <input
                                                                        className="aptInfoSelect"
                                                                        value={
                                                                            data?.meetOldParentSupportMore3yearsTf
                                                                                ? '충족'
                                                                                : '미충족'
                                                                        }
                                                                        readOnly={
                                                                            true
                                                                        }
                                                                    />
                                                                    <span>
                                                                        {data?.meetOldParentSupportMore3yearsTf ===
                                                                        true ? (
                                                                            <span className="progress">
                                                                                <CheckCircleOutlined />
                                                                            </span>
                                                                        ) : null}
                                                                        {data?.meetOldParentSupportMore3yearsTf ===
                                                                        false ? (
                                                                            <span className="pause_tooltip">
                                                                                <CloseCircleOutlined />
                                                                                <span class="pause-tooltip-text">
                                                                                    3년
                                                                                    이상
                                                                                    노부모
                                                                                    부양
                                                                                    충족하지
                                                                                    않음.
                                                                                </span>
                                                                            </span>
                                                                        ) : null}
                                                                    </span>
                                                                </td>
                                                            </tr>

                                                            {data?.meetOldParentSupportMore3yearsTf ===
                                                            true ? (
                                                                <>
                                                                    {/* 규제 지역인 경우에만 보이도록 */}
                                                                    {data?.restrictedAreaTf ===
                                                                    true ? (
                                                                        <>
                                                                            {/* 세대원 청약 당첨 이력 */}
                                                                            <tr className="special_phase">
                                                                                <td className="qulificaiton">
                                                                                    <span className="qulificaitonBox">
                                                                                        전
                                                                                        세대원의
                                                                                        5년
                                                                                        이내
                                                                                        청약
                                                                                        당첨이력
                                                                                        전무
                                                                                        여부
                                                                                    </span>
                                                                                </td>
                                                                                <td className="special_result">
                                                                                    <input
                                                                                        className="aptInfoSelect"
                                                                                        value={
                                                                                            data?.meetAllHouseMemberNotWinningIn5yearsTf
                                                                                                ? '충족'
                                                                                                : '미충족'
                                                                                        }
                                                                                        readOnly={
                                                                                            true
                                                                                        }
                                                                                    />
                                                                                    <span>
                                                                                        {data?.meetAllHouseMemberNotWinningIn5yearsTf ===
                                                                                        true ? (
                                                                                            <span className="progress">
                                                                                                <CheckCircleOutlined />
                                                                                            </span>
                                                                                        ) : null}
                                                                                        {data?.meetAllHouseMemberNotWinningIn5yearsTf ===
                                                                                        false ? (
                                                                                            <span className="pause_tooltip">
                                                                                                <CloseCircleOutlined />
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                        </>
                                                                    ) : null}

                                                                    {(data?.restrictedAreaTf ===
                                                                        true &&
                                                                        data?.meetAllHouseMemberNotWinningIn5yearsTf ===
                                                                            true) ||
                                                                    data?.restrictedAreaTf ===
                                                                        false ? (
                                                                        <>
                                                                            {/* 청약통장 가입기간 충족 여부 */}
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
                                                                                            <span className="pause_tooltip">
                                                                                                <CloseCircleOutlined />
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>

                                                                            {data?.meetBankbookJoinPeriodTf ===
                                                                            true ? (
                                                                                <>
                                                                                    {/* 예치 금액 충족 여부 */}
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
                                                                                                {data?.meetDepositTf ===
                                                                                                true ? (
                                                                                                    <span className="progress">
                                                                                                        <CheckCircleOutlined />
                                                                                                    </span>
                                                                                                ) : null}
                                                                                                {data?.meetDepositTf ===
                                                                                                false ? (
                                                                                                    <span className="pause_tooltip">
                                                                                                        <CloseCircleOutlined />
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
                        </table>

                        <div className="rankRes">
                            {/* 순위 매기기 */}
                            {data?.accountTf === true &&
                            data?.householderTf === true &&
                            ((data?.americanAge < 20 &&
                                form.supportYn === 'y') ||
                                data?.americanAge >= 20) &&
                            data?.meetHomelessHouseholdMembersTf === true &&
                            data?.meetOldParentSupportMore3yearsTf === true &&
                            ((data?.restrictedAreaTf === true &&
                                data?.meetAllHouseMemberNotWinningIn5yearsTf ===
                                    true) ||
                                data?.restrictedAreaTf === false) &&
                            data?.meetBankbookJoinPeriodTf === true &&
                            data?.meetDepositTf === true
                                ? (form.oldParentMinyeongRes = '1순위')
                                : (form.oldParentMinyeongRes = '탈락')}
                        </div>

                        {/* 순위에 따른 페이지 이동 */}
                        {form.oldParentMinyeongRes === '1순위' ? (
                            <div className="oldParentRankButton">
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
                        ) : (
                            <div className="oldParentRankButton">
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
                        )}
                    </form>
                </>
            )}
        </>
    );
};

export default OldParentMinyeongApi;
