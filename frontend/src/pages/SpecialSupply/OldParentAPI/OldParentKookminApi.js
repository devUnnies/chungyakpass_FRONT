import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getMultiChildMinyeong } from '../../../store/actions/multiChildMinyeongAction'; // oldParentApi 만든 후 변경하기.
import { Link } from 'react-router-dom';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    PauseCircleOutlined,
} from '@ant-design/icons';
import MainButton from '../../../components/Button/MainButton';
import '../SpecialSupply.css';

const OldParentKookminApi = ({ onSaveData }) => {
    // const [data, setData1] = useState(null);
    // const [data2, setData2] = useState(null);
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    const oldParentKookminStore = useSelector(
        (state) => state.OldParentKookmin
    ); // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: '',
        supportYn: '',
        oldParentKookminRes: '',
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
            oldParentKookminRes: '',
        });
    };

    const onClick = async () => {
        // dispatch(getOldParentKookmin()); // api 연결 요청.
        // const data = oldParentKookminStore?.getOldParentKookmin?.data?.data;
        // console.log(JSON.stringify(data));
    };

    // useEffect(() => {
    //     // 불러오기 성공 시
    //     if (oldParentKookminStore.getOldParentKookmin.data) {
    //         const data = oldParentKookminStore.getOldParentKookmin.data.data;
    //         console.log(JSON.stringify(data));
    //     }
    // }, [oldParentKookminStore.getOldParentKookmin]);

    return (
        <>
            <div className="special_title">
                <h3 className="special_mainTitle">
                    {' '}
                    특별공급{' '}
                    <span className="special_subTitle">
                        {' '}
                        | 노부모부양 국민주택{' '}
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
                <table className="specialKookmin_table">
                    <p className="foreignWarning" style={{ color: 'red' }}>
                        * 외국인을 세대주 혹은 세대원으로 포함시킬 경우 부적격
                        판정이 날 수 있습니다.{' '}
                    </p>
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
                        {/* <td className="special_result">
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
                        </td> */}
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
                                    <p>※ 국민주택의 경우</p>
                                    주택청약종합저축 혹은 청약 저축인 경우에만
                                    청약통장 조건 만족.
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

                    {/* 세대주 여부 판단 */}
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
                                            세대주인 경우에만 진행 가능.
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

                    {/* 3년 이상 노부모 부양 여부 */}
                    <tr className="special_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                3년 이상 노부모 부양 여부
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
                                            3년 이상 노부모 부양하는 경우에만 해당 청약 진행 가능.
                                        </span>
                                    </span>
                                ) : null}
                            </span> */}
                        </td>
                    </tr>

                    {/* 월평균 기준 소득 충족 여부 */}
                    <tr className="special_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                월평균 소득 기준 충족 여부
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
                                            월평균 소득 미충족
                                        </span>
                                    </span>
                                ) : null}
                            </span> */}
                        </td>
                    </tr>

                    {/* 자산 기준 충족 여부*/}
                    <tr className="special_phase">
                        <td className="qulificaiton">
                            <span className="qulificaitonBox">
                                자산 기준 충족 여부
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
                                            자산 기준 미충족
                                        </span>
                                    </span>
                                ) : null}
                            </span> */}
                        </td>
                    </tr>

                    {/* 이후 조건 충족 시 다음 인풋 보이도록. */}

                    {/* 순위 판별 시작 */}
                    {form.supportYn === 'y' ? (
                        <>
                            {/* 규제 지역인 경우에만 보이도록 */}
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
                                            <span className="pause_tooltip">
                                                <CloseCircleOutlined />
                                            </span>
                                        ) : null}
                                    </span>
                                </td> */}
                            </tr>

                            {/* 청약통장 가입기간 충족 여부 */}
                            {/* "공공주택특별법적용&미적용 이외의 국민주택"은 이 부분 판단할 필요 없음. */}
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
                                            <span className="pause_tooltip">
                                                <CloseCircleOutlined />
                                            </span>
                                        ) : null}
                                    </span>
                                </td> */}
                            </tr>

                            {/* 건설지역 별 납입횟수 충족 여부 */}
                            {/* 공공주택특별법이 적용되는 국민주택만 판단. */}
                            <tr className="special_phase">
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
                                {/* <td className="special_result">
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
                                                    (form.oldParentMinyeongRes =
                                                        '1순위')
                                                }
                                            </span>
                                        ) : null}
                                        {data && data === '' ? (
                                            <span className="pause_tooltip">
                                                <CloseCircleOutlined />
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
                {/* {data && form.oldParentMinyeongRes === '1순위' ? (
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
                    <></>
                )} */}
            </form>
        </>
    );
};

export default OldParentKookminApi;
