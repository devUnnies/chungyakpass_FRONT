import React from 'react';
import './AtAGlance.css';

const AtAGlance = () => {
    return (
        <div className="atAGlanceContainer">
            <div className="atAGlanceNormalTitleContainer">
                <span className="atAGlanceNormalTitle">한눈에 보기</span>
            </div>
            <div className="atAGlanceTableContainer">
                <table className="atAGlanceTable">
                    <thead className="atAGlanceTableThead">
                        <tr className="atAGlanceTableTheadTr">
                            <th className="atAGlanceTableTheadTrTh">유형</th>
                            <th className="atAGlanceTableTheadTrTh">결과</th>
                        </tr>
                    </thead>
                    <tbody className="atAGlanceTableTbody">
                        <tr className="atAGlanceTableTbodyTr">
                            <td className="atAGlanceTableTbodyTrTdSubTitle">
                                일반공급 국민주택
                            </td>
                            <td className="atAGlanceTableTbodyTrTdResult">
                                1순위
                            </td>
                        </tr>
                        <tr className="atAGlanceTableTbodyTr">
                            <td className="atAGlanceTableTbodyTrTdSubTitle">
                                일반공급 민영주택
                            </td>
                            <td className="atAGlanceTableTbodyTrTdResult">
                                2순위
                            </td>
                        </tr>
                        <tr className="atAGlanceTableTbodyTr">
                            <td className="atAGlanceTableTbodyTrTdSubTitle">
                                특별공급 신혼부부
                            </td>
                            <td className="atAGlanceTableTbodyTrTdResult">
                                자격미달
                            </td>
                        </tr>
                        <tr className="atAGlanceTableTbodyTr">
                            <td className="atAGlanceTableTbodyTrTdSubTitle">
                                특별공급 다자녀
                            </td>
                            <td className="atAGlanceTableTbodyTrTdResult">
                                자격미달
                            </td>
                        </tr>
                        <tr className="atAGlanceTableTbodyTr">
                            <td className="atAGlanceTableTbodyTrTdSubTitle">
                                특별공급 생애최초
                            </td>
                            <td className="atAGlanceTableTbodyTrTdResult">
                                1순위
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AtAGlance;
