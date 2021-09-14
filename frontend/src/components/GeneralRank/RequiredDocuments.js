import React from 'react';

function RequiredDocuments() {
    return (
        <>
            <p style={{ color: 'red' }}>
                * 모든 서류는 입주자모집공고일 이후에 발급한 것만 제출 가능.
            </p>

            <div className="documentTable_title">
                <h3 className="documentTable_mainTitle">
                    일반공급 청약 사전 공통 제출서류
                </h3>
            </div>
            <table border="1">
                <td>
                    <th>구분</th>
                    <tr>
                        <td>필수서류</td>
                    </tr>
                </td>
                <td>
                    <th>해당서류</th>
                    <tr>
                        <td>개인정보 활용 동의서 무주택 서약서</td>
                    </tr>
                    <tr>
                        <td>인감 증명서/인감 도장</td>
                    </tr>
                    <tr>
                        <td>신분증</td>
                    </tr>
                    <tr>
                        <td>주민등록표등본(상세)</td>
                    </tr>
                    <tr>
                        <td>주민등록표초본(상세)</td>
                    </tr>
                    <tr>
                        <td>출입국사실증명원</td>
                    </tr>
                    <tr>
                        <td>가족관계증명서(상세)</td>
                    </tr>
                </td>
                <td>
                    <th>발급기준</th>
                    <tr>본인</tr>
                    <tr>본인</tr>
                    <tr>본인</tr>
                    <tr>본인</tr>
                    <tr>본인</tr>
                    <tr>본인</tr>
                    <tr>본인</tr>
                </td>
                <td>
                    <th>확인 및 유의사항</th>
                    <tr>
                        <td>
                            <li>견본 주택에 비치</li>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <li>
                                용도: 아파트 계약용(본인 발급용)-대리발급분 불가
                            </li>
                            <li>본인에 한하여 본인 서명 사실 확인서 가능.</li>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <li>주민등록증, 운전면허증 또는 여권</li>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <li>
                                주민등록번호(세대원 포함), 주소변동사항 및 변동
                                사유, 세대구성사유 및 일자, 세대주 및 세대주와의
                                관계 포함하여 발급요망.
                            </li>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <li>
                                주민등록번호(세대원 포함), 주소변동사항 변동
                                사유 및 발생일(인정받고자 하는 기간 포함),
                                세대주 및 세대주와의 관계 포함하여 발급.
                            </li>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <li>
                                발급 기간: 입주자모집공고일 기준 현재부터 과거
                                1년.
                            </li>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <li>
                                성명, 주민등록번호(세대원 포함) '상세'로 발급
                            </li>
                        </td>
                    </tr>
                </td>
            </table>

            <div className="documentTable_title">
                <h3 className="documentTable_mainTitle">
                    일반공급 청약 가점제 당첨자 추가 사전 제출서류
                </h3>
            </div>
            <table border="1">
                <tr>
                    <th colspan="1">구분</th>
                    <th colspan="1">해당서류</th>
                    <th colspan="1">발급기준</th>
                    <th colspan="1">확인 및 유의사항</th>
                </tr>

                <tr>
                    <th rowspan="5">가점제 당첨자 추가서류</th>
                    <td>주민등록표등본(상세)</td>
                    <td>본인</td>
                    <td>
                        <li>견본 주택에 비치</li>
                    </td>
                </tr>

                <tr>
                    <td rowspan="1">주민등록표초본(상세)</td>
                    <tr rowspan="1">
                        <td colspan="1">직계존속</td>
                    </tr>

                    <tr rowspan="1">
                        <td>직계비속</td>
                    </tr>
                </tr>

                <tr>
                    <td rowspan="1">출입국사실증명원</td>
                    <tr>
                        <td>직계존속</td>
                    </tr>
                    <tr>
                        <td>직계비속</td>
                    </tr>
                </tr>
                <tr>
                    <td rowspan="1">혼인관계증명서(상세)</td>
                    <tr>
                        <td>본인</td>
                    </tr>
                    <tr>
                        <td>자녀</td>
                    </tr>
                </tr>

                <tr>
                    <td>복무확인서</td>
                    <td>본인</td>
                    <td>
                        <li>군 복무기간(10년 이상)이 명시된 복무확인서 1통</li>
                    </td>
                </tr>
            </table>

            <p style={{ color: 'red' }}>
                * 아파트 모집 공고문을 통해 추가 제출 서류를 필수로 확인해주시기
                바랍니다.
            </p>
        </>
    );
}

export default RequiredDocuments;
