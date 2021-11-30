import { React } from 'react';
import './NoEmail.css';
import TopButton from '../../components/TopButton/TopButton';

function NoEmail() {
    return (
        <>
            <div className="emailInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">이메일 무단수집거부</span>
            </div>
            {/* <div className="noEmail_Title">
                <h2 className="e_title">이메일 무단수집 거부</h2>
            </div> */}

            <div className="e_container">
                <div className="e_containerBox">
                    <img
                        src={
                            require('../../assets/img_email_refusal.png')
                                .default
                        }
                        className="noEmail_img"
                    ></img>
                    <p className="e_contents">
                        본 웹 사이트에 게시된 이메일 주소가 전자우편 수집
                        프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로
                        수집되는 것을 거부하며 이를 위반 시 정보통신망법에 의해
                        형사 처벌됨을 유념하시기 바랍니다.
                    </p>
                    <p className="e_legal">
                        ※ 정보통신망 이용촉진 및 정보보호 등에 관한법률 제50조의
                        2 (전자우편주소의 무단 수집행위 등 금지)
                    </p>
                </div>

                <div className="e_containerUl">
                    <ul>
                        <h3>
                            <li className="legal_title">
                                정보통신망법 제 50조의 2 (전자우편주소의 무단
                                수집행위 등 금지)
                            </li>
                        </h3>
                        <li className="legal_contents">
                            누구든지 전자우편주소의 수집을 거부하는 의사가
                            명시된 인터넷 홈페이지에서 자동으로 전자우편주소를
                            수집하는 프로그램 그 밖의 기술적 장치를 이용하여
                            전자우편주소를 수집하여서는 아니된다.
                        </li>
                        <li className="legal_contents">
                            누구든지 제1항의 규정을 위반하여 수집된
                            전자우편주소를 판매·유통하여서는 아니된다.
                        </li>
                        <li className="legal_contents">
                            누구든지 제1항의 및 제2항의 규정에 의하여 수집·판매
                            및 유통이 금지된 전자우편주소임을 알고 이를
                            정보전송에 이용하여서는 아니된다.
                        </li>
                    </ul>
                </div>

                <div className="email_alert">
                    ※ 만일, 위와 같은 기술적 조치를 사용한 이메일주소 무단수집
                    피해를 당하신 경우
                    <span className="alert_highlight">
                        {' '}
                        불법스팸 대응센터 전용전화(국번없이 02-1336)나 홈페이지(
                        www.spamcop.or.kr )의 신고
                    </span>{' '}
                    창을 통하여 신고하기 바랍니다.
                </div>
            </div>
            <TopButton />
        </>
    );
}

export default NoEmail;
