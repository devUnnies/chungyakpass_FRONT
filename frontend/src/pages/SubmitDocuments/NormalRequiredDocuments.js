import React from 'react';
import '../Rank/Rank.css';

function NormalRequiredDocuments() {
    return (
        <div className="documentMain">
            <div className="documentTable_title">
                <h4 className="documentTable_mainTitle">
                    일반공급 청약 사전 공통 제출서류
                </h4>
            </div>

            <div
                style={{ color: 'red', marginBottom: '1%' }}
                className="documentAlert"
            >
                * 모든 서류는 입주자모집공고일 이후에 발급한 것만 제출
                가능합니다.
                <p style={{ color: 'red' }} className="documentAlert">
                    * 아파트 모집 공고문을 통해 추가 제출 서류를 필수로
                    확인해주시기 바랍니다.
                </p>
            </div>

            <table border="1" className="documentTable">
                <tr className="table-text-align">
                    <td className="table-header">구분</td>
                    <td className="table-header">해당서류</td>
                    <td className="table-header">발급기준</td>
                    <td className="table-header">확인 및 유의사항</td>
                </tr>

                <tr>
                    <td rowspan="7" className="table-row1">
                        필수서류
                    </td>
                    <td className="table-text-align">
                        개인정보 활용 동의서 무주택 서약서
                    </td>
                    <td className="table-text-align">본인</td>
                    <td>
                        <li>견본 주택에 비치</li>
                    </td>
                </tr>

                <tr>
                    <td className="table-text-align">인감 증명서/인감 도장</td>
                    <td className="table-text-align">본인</td>
                    <td>
                        <li>
                            용도: 아파트 계약용(본인 발급용)-대리발급분 불가
                        </li>
                        <li>본인에 한하여 본인 서명 사실 확인서 가능.</li>
                    </td>
                </tr>

                <tr>
                    <td className="table-text-align">신분증</td>
                    <td className="table-text-align">본인</td>
                    <td>
                        <li>주민등록증, 운전면허증 또는 여권</li>
                    </td>
                </tr>

                <tr>
                    <td className="table-text-align">주민등록표등본(상세)</td>
                    <td className="table-text-align">본인</td>
                    <td>
                        <li>
                            주민등록번호(세대원 포함), 주소변동사항 및 변동
                            사유, 세대구성사유 및 일자, 세대주 및 세대주와의
                            관계 포함하여 발급요망.
                        </li>
                    </td>
                </tr>

                <tr>
                    <td className="table-text-align">주민등록표초본(상세)</td>
                    <td className="table-text-align">본인</td>
                    <td>
                        <li>
                            주민등록번호(세대원 포함), 주소변동사항 변동 사유 및
                            발생일(인정받고자 하는 기간 포함), 세대주 및
                            세대주와의 관계 포함하여 발급.
                        </li>
                    </td>
                </tr>

                <tr>
                    <td className="table-text-align">출입국사실증명원</td>
                    <td className="table-text-align">본인</td>
                    <td>
                        <li>
                            발급 기간: 입주자모집공고일 기준 현재부터 과거 1년.
                        </li>
                    </td>
                </tr>

                <tr>
                    <td className="table-text-align">가족관계증명서(상세)</td>
                    <td className="table-text-align">본인</td>
                    <td>
                        <li>성명, 주민등록번호(세대원 포함) '상세'로 발급</li>
                    </td>
                </tr>
            </table>
            <div className="documentTable_title">
                <h3 className="documentTable_mainTitle">
                    일반공급 청약 가점제 당첨자 추가 사전 제출서류
                </h3>
            </div>
            <table border="1" className="documentTable">
                <tr className="table-text-align">
                    <td className="table-header">구분</td>
                    <td className="table-header">해당서류</td>
                    <td className="table-header">발급기준</td>
                    <td className="table-header">확인 및 유의사항</td>
                </tr>

                <tr>
                    <td rowspan="8" className="table-row1">
                        가점제 당첨자 추가서류
                    </td>
                    <td className="table-text-align">주민등록표등본(상세)</td>
                    <td className="table-text-align">배우자</td>
                    <td>
                        <li>주민등록상 배우자가 분리된 경우 제출</li>
                    </td>
                </tr>

                <tr>
                    <td rowspan="2" className="table-text-align">
                        주민등록표초본(상세)
                    </td>
                    <td className="table-text-align">직계존속</td>
                    <td>
                        <li>
                            주민등록표상 세대주와 직계존속이 입주자모집공고일
                            현재로부터 과거 3년이상 계속하여 동일한 주민등록본에
                            등재여부가 확인되지 않는 경우
                            <div>(5년 이상의 주소변동사항을 포함하여 발급)</div>
                        </li>
                    </td>
                </tr>
                <td className="table-text-align">직계비속</td>
                <td>
                    <li>
                        만 30세 이상 직계비속을 부영가족으로 산정한 경우
                        <div>(5년 이상의 주소변동사항을 포함하여 발급)</div>
                    </li>
                </td>

                <tr>
                    <td rowspan="2" className="table-text-align">
                        출입국사실증명원
                    </td>
                    <td className="table-text-align">직계존속</td>
                    <td>
                        <li>발급기간: 입주자모집공고일 현재부터 과거 3년</li>
                    </td>
                </tr>
                <td className="table-text-align">직계비속</td>
                <td>
                    <li>피부양 직계비속을 부양가족으로 산정한 경우</li>
                    <li>발급기간: 입주자모집공고일 현재부터 과거 1년</li>
                </td>

                <tr>
                    <td rowspan="2" className="table-text-align">
                        혼인관계증명서(상세)
                    </td>
                    <td className="table-text-align">본인</td>
                    <td>
                        <li>
                            만 30세 이전에 결혼하여 무주택기간을 산정한 경우
                        </li>
                    </td>
                </tr>
                <tr>
                    <td className="table-text-align">자녀</td>
                    <td>
                        <li>
                            만 18세 이상인 미혼자녀를 부양가족으로 산정한 경우
                        </li>
                    </td>
                </tr>

                <tr>
                    <td className="table-text-align">복무확인서</td>
                    <td className="table-text-align">본인</td>
                    <td>
                        <li>군 복무기간(10년 이상)이 명시된 복무확인서 1통</li>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default NormalRequiredDocuments;
