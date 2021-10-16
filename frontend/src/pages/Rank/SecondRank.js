import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti';
import './Rank.css';
import MainButton from '../../components/Button/MainButton';
import NormalRequiredDocuments from '../SubmitDocuments/NormalRequiredDocuments';
import { useLocation } from 'react-router';

const GreetingMessage = '2순위 축하드립니다!';

function SecondRank({ history }) {
    const goBack = () => {
        history.goBack();
    };
    const goHome = () => {
        history.push('/');
    };
    useEffect(() => {
        console.log(history);
    }, [history]);

    const GreetingMessage = '2순위 축하드립니다!';
    const location = useLocation(); // 각 공급별 결과 props 불러오기
    const generalMinyeongRes = location?.state?.form?.generalMinyeongRes; // 일반공급 결과 props 가져오기

    return (
        <div className="SecondRankMain">
            <div className="greetingMessage">{GreetingMessage}</div>
            <p className="addExplanation">
                자격 조건을 재확인하시려면 뒤로가기 버튼을 눌러주시기 바랍니다.
            </p>
            <Confetti />

            {/* 제출 서류확인 테이블 */}
            {generalMinyeongRes === '1순위' ||
            generalMinyeongRes === '2순위' ? (
                <NormalRequiredDocuments /> // 일반 국민 서류제출
            ) : null}

            <div className="goButton">
                <MainButton
                    onClick={goBack}
                    width="80"
                    height="30"
                    fontWeight="bold"
                >
                    뒤로가기
                </MainButton>
                <MainButton
                    onClick={goHome}
                    width="80"
                    height="30"
                    fontWeight="bold"
                >
                    홈으로
                </MainButton>
            </div>
        </div>
    );
}

export default SecondRank;
