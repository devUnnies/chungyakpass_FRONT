import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti';
import './Rank.css';
import MainButton from '../Button/MainButton';
import RequiredDocuments from './RequiredDocuments';

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

    return (
        <div className="FirstRankMain">
            <div className="greetingMessage">{GreetingMessage}</div>
            <p className="addExplanation">
                자격 조건을 수정하시려면 뒤로가기 버튼을 눌러 자격 조건을
                수정해주시기 바랍니다.
            </p>
            <Confetti />

            {/* 제출 서류확인 테이블 */}
            <RequiredDocuments />

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
    );
}

export default SecondRank;
