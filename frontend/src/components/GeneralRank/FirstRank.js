import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti';
import './Rank.css';
import MainButton from '../Button/MainButton';
import RequiredDocuments from './RequiredDocuments';

const GreetingMessage = '모든 자격 조건을 충족하셨습니다. 1순위 축하드립니다!';

function FirstRank({ history }) {
    const goHome = () => {
        history.push('/');
    };
    useEffect(() => {
        console.log(history);
    }, [history]);

    return (
        <div className="FirstRankMain">
            <div className="greetingMessage">{GreetingMessage}</div>
            <Confetti />

            {/* 제출 서류확인 테이블 */}
            <RequiredDocuments />

            <MainButton
                onClick={goHome}
                width="80"
                height="30"
                fontWeight="bold"
            >
                홈으로
            </MainButton>
        </div>
    );
}

export default FirstRank;
