import React from 'react';
import { useHistory } from 'react-router';
import MainButton from '../../components/Button/MainButton';
import './MyPage.css';

const MyPage = () => {
    const history = useHistory();

    return (
        <div className="mypage">
            <div className="mypageContainer">
                <MainButton
                    width="200"
                    height="50"
                    fontSize="17"
                    type="readBankbook"
                    onClick={() => {
                        history.push('/bankbook');
                    }}
                >
                    청약통장 조회
                </MainButton>

                <MainButton
                    width="200"
                    height="50"
                    fontSize="17"
                    type="readHouse"
                    onClick={() => {
                        history.push('/house');
                    }}
                >
                    세대 조회
                </MainButton>

                <MainButton
                    width="200"
                    height="50"
                    fontSize="17"
                    type="readJudgeHistory"
                    onClick={() => {
                        // history.push('/judgeHistory');
                        alert('서비스를 개발 중입니다!');
                    }}
                >
                    자격판단이력 확인
                </MainButton>
            </div>
        </div>
    );
};

export default MyPage;
