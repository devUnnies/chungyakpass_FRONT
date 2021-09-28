import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getMultiChildMinyeong } from '../../../store/actions/multiChildMinyeongAction';
import { Link } from 'react-router-dom';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    PauseCircleOutlined,
} from '@ant-design/icons';
import MainButton from '../../../components/Button/MainButton';
import '../SpecialSupply.css';

const MultiChildMinyeongApi = ({ onSaveData }) => {
    // const [data, setData1] = useState(null);
    // const [data2, setData2] = useState(null);
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    const multiChildMinyeongStore = useSelector(
        (state) => state.multiChildMinyeong
    ); // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const [loading, setLoading] = useState(false);

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

    const onClick = async () => {
        // try {
        //     const res = await axios.get(
        //         'https://jsonplaceholder.typicode.com/todos/1'
        //     );
        //     setData1(res.data.userId); // userId 하나만 가져오기.
        //     setData2(res.data.completed); // completed 하나만 가져오기
        // } catch (e) {
        //     console.log(e);
        // }
        dispatch(getMultiChildMinyeong()); // api 연결 요청.
        const data = multiChildMinyeongStore?.getMultiChildMinyeong?.data?.data;
        console.log(JSON.stringify(data));
    };

    // useEffect(() => {
    //     // 불러오기 성공 시
    //     if (multiChildMinyeongStore.getMultiChildMinyeong.data) {
    //         const data = multiChildMinyeongStore.getMultiChildMinyeong.data.data;
    //         console.log(JSON.stringify(data));
    //     }
    // }, [multiChildMinyeongStore.getMultiChildMinyeong]);

    return (
        <>
            <div className="special_title">
                <h3 className="special_mainTitle">
                    {' '}
                    특별공급{' '}
                    <span className="special_subTitle">
                        {' '}
                        | 다자녀 민영주택{' '}
                    </span>
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
            <form className="specialSupply_form" onSubmit={handleSubmit}>
                {/* 버튼 클릭시 데이터 불러오기 */}
                <table className="specialMinyeong_table">
                    {/* 규제지역 판단. (규제지역 로직 결과값 넣기.)*/}
                    <tr className="special_phase">
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
                        <td className="special_result">
                            {multiChildMinyeongStore.getMultiChildMinyeong
                                .data && (
                                <input
                                    className="aptInfoSelect"
                                    value={JSON.stringify(
                                        multiChildMinyeongStore
                                            .getMultiChildMinyeong.data
                                    )}
                                    readOnly={true}
                                />
                            )}
                        </td>
                    </tr>

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
                                    주택청약종합저축 혹은 청약예금,
                                    청약부금(85제곱미터이하)인 경우에만 청약통장
                                    조건 만족.
                                </span>
                            </span>
                        </td>
                        <td className="special_result">
                            {/* {data && (
                                <input
                                    className="aptInfoSelect"
                                    value={JSON.stringify(data)}
                                    readOnly={true}
                                />
                            )} */}
                            {/* <span>
                                {data && data !== '' ? (
                                    <span className="progress">
                                        <CheckCircleOutlined />
                                    </span>
                                ) : (
                                    <></>
                                )}
                                {data && data === '' ? (
                                    <span className="pause_tooltip">
                                        <CloseCircleOutlined />
                                        <span class="pause-tooltip-text">
                                            청약 통장 조건 미충족 시 부적격
                                            발생.
                                        </span>
                                    </span>
                                ) : (
                                    <></>
                                )}
                            </span> */}
                        </td>
                    </tr>

                    {/* 세대구성원 무주택 판별 */}
                    <tr className="special_phase">
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
                                        <div className="tooltip-text-info">
                                            : 무주택 기간 산정은 본인 기준 만
                                            30세부터 하되, 그 전에 혼인한 경우
                                            혼인신고일을 기준으로 산정함.
                                        </div>
                                    </p>
                                    <p>
                                        <li>
                                            60세 이상 직계존속이 소유한 주택
                                            혹은 분양권
                                        </li>
                                        <li>3개월 이내 처분한 상속주택</li>
                                        <li>비도시 지역 단독주택</li>
                                        <li>소형, 저가 주택</li>
                                        <li>폐가 소유</li>
                                        <li>무허가 건물 소유</li>
                                        <li>문화재 지정 주택</li>
                                        <li>미분양 주택 분양권</li>
                                        <li>사업 목적</li>
                                    </p>
                                </span>
                            </span>
                        </td>
                        {/* <td className="special_phase">
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
                        </td> */}
                    </tr>

                    {/* 3명 이상의 미성년 자녀수 충족 여부*/}
                    <tr className="special_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                3명 이상의 미성년 자녀 수 충족 여부
                            </span>
                        </td>
                        <td className="special_result">
                            {/* {data && (
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
                                            3명 이상의 미성년 자녀 수를 충족하는 경우에만 해당 청약 진행 가능.
                                        </span>
                                    </span>
                                ) : null}
                            </span> */}
                        </td>
                    </tr>

                    {/* 만 나이 로직 결과 출력*/}
                    <tr className="special_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">나이</span>
                        </td>
                        <td className="special_result">
                            {/* {data && (
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
                                            미성년 자녀 수 조건 미충족
                                        </span>
                                    </span>
                                ) : null}
                            </span> */}
                        </td>
                    </tr>

                    {/* 미성년자인 경우 세대주 판별 */}
                    <tr className="special_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">세대주 여부</span>
                        </td>
                        <td className="special_result">
                            {/* {data && (
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
                            </span> */}
                        </td>
                    </tr>

                    {/* 미성년자인 경우 형제, 자매 부양 판별 */}
                    <tr className="general_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                형제, 자매 부양 여부
                            </span>
                        </td>
                        {/* {data && (
                            <td className="special_result">
                                <span className="special_result_input">
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
                                            <span class="pause-tooltip-text">
                                                만 19세 미만 미성년자는
                                                세대주이면서 부양할 가족이 있는
                                                경우에만 해당 청약이 신청 진행
                                                가능.
                                            </span>
                                        </span>
                                    ) : null}
                                </span>
                            </td>
                        )} */}
                    </tr>

                    {/* 이후 조건 충족 시 다음 인풋 보이도록. */}

                    {/* 순위 판별 시작 */}
                    {/* 주거전용 85㎡ 기준 충족*/}
                    <tr className="special_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                주거전용 85㎡ 초과공공건설임대주택, 수도권에
                                지정된 공공주택지구에서 공급하는 민영주택에
                                청약하는가?
                            </span>
                        </td>
                        {/* <td className="special_result">
                            {data && (
                                <input
                                    className="aptInfoSelect"
                                    value={JSON.stringify(data)}
                                    readOnly={true}
                                />
                            )}
                            <span>
                                {data && data !== '' ? (
                                    <span className="progress" readOnly={true}>
                                        <CheckCircleOutlined />
                                    </span>
                                ) : null}
                                {data && data === '' ? (
                                    <span className="secondRankTootip">
                                        <PauseCircleOutlined />
                                        {(form.multiChildMinyeongRes = '2순위')}
                                    </span>
                                ) : null}
                            </span>
                        </td> */}
                    </tr>

                    {/* 위 조건이 만족하면서 2주택이 만족해야함. */}
                    {/* 2주택 이상 소유 시 2순위 */}
                    {form.supportYn === 'y' ? (
                        <>
                            <tr className="special_phase">
                                <td className="qulificaiton">
                                    <span className="qulificaitonBox">
                                        2주택 이상 소유 여부
                                    </span>
                                </td>
                                {/* <td className="special_result">
                                    {data && (
                                        <input
                                            className="aptInfoSelect"
                                            value={JSON.stringify(data)}
                                            readOnly={true}
                                        />
                                    )}
                                    <span>
                                        {data && data !== '' ? (
                                            <span
                                                className="progress"
                                                readOnly={true}
                                            >
                                                <CheckCircleOutlined />
                                            </span>
                                        ) : null}
                                        {data && data === '' ? (
                                            <span className="secondRankTootip">
                                                <PauseCircleOutlined />
                                                {
                                                    (form.multiChildMinyeongRes =
                                                        '2순위')
                                                }
                                            </span>
                                        ) : null}
                                    </span>
                                </td> */}
                            </tr>

                            {/* 규제 지역인 경우에만 보이도록 */}
                            {/* 세대주 여부 (미성년자 제외) */}
                            <tr className="special_phase">
                                <td className="qulificaiton">
                                    <span className="qulificaitonBox">
                                        세대주 여부
                                    </span>
                                </td>
                                {/* <td className="special_result">
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
                                                    (form.multiChildMinyeongRes =
                                                        '2순위')
                                                }
                                            </span>
                                        ) : null}
                                    </span>
                                </td> */}
                            </tr>

                            {/* 세대원 청약 당첨 이력 */}
                            <tr className="special_phase">
                                <td className="qulificaiton">
                                    <span className="qulificaitonBox">
                                        전 세대원이 5년 이내 청약 당첨 이력이
                                        존재하는가?
                                    </span>
                                </td>
                                {/* <td className="special_result">
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
                                                    (form.multiChildMinyeongRes =
                                                        '2순위')
                                                }
                                            </span>
                                        ) : null}
                                    </span>
                                </td> */}
                            </tr>

                            {/* 청약통장 가입기간 충족 여부 */}
                            <tr className="special_phase">
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
                                {/* <td className="special_result">
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
                                                    (form.multiChildMinyeongRes =
                                                        '2순위')
                                                }
                                            </span>
                                        ) : null}
                                    </span>
                                </td> */}
                            </tr>

                            {/* 예치 금액 충족 여부 */}
                            <tr className="special_phase">
                                <td className="qulificaiton">
                                    <span className="qulificaitonBox">
                                        지역별 예치 금액 충족 여부
                                    </span>
                                    <span className="info_tooltip">
                                        <InfoCircleOutlined />
                                        <span class="tooltip-text">
                                            <table
                                                border="1"
                                                className="tootipeTable"
                                            >
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
                                {/* <td className="special_result">
                                    {data && (
                                        <input
                                            className="aptInfoSelect"
                                            value={JSON.stringify(data2)}
                                            readOnly={true}
                                        />
                                    )}
                                    <span>
                                        {data && data2 !== true ? (
                                            <span className="progress">
                                                <CheckCircleOutlined />
                                                {
                                                    (form.multiChildMinyeongRes =
                                                        '1순위')
                                                }
                                            </span>
                                        ) : null}
                                        {data && data2 === true ? (
                                            <span className="secondRankTootip">
                                                <PauseCircleOutlined />
                                                {
                                                    (form.multiChildMinyeongRes =
                                                        '2순위')
                                                }
                                            </span>
                                        ) : null}
                                    </span>
                                </td> */}
                            </tr>
                        </>
                    ) : (
                        <></>
                    )}
                </table>

                {/* 순위에 따른 페이지 이동 */}
                {/* {data && form.supportYn !== '' ? (
                    <>
                        {form.multiChildMinyeongRes === '1순위' ? (
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
                )} */}
            </form>
        </>
    );
};

export default MultiChildMinyeongApi;
