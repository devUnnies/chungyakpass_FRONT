import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { logIn } from '../../store/actions/authAction';
import { signinWithToken } from '../../store/actions/tokenAction';
import storage from '../../services/store';
import './Login.css';
import Input from '../../components/Input/Input';
import useInputState from '../../components/Input/useInputState';
import useWindowWidth from '../../components/WindowSize/useWindowWidth';
import MainButton from '../../components/Button/MainButton';
import SubButton from '../../components/Button/SubButton';
import { useHistory } from 'react-router-dom';

function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const authStore = useSelector((state) => state.auth);

    const [email, setEmail, handleChangeEmail] = useInputState('');
    const [password, setPassword, handleChangePassword] = useInputState('');
    // 창 가로 사이즈 가져옴
    const windowWidth = useWindowWidth();

    // 가입하기 버튼을 누르면 실행하는 함수
    const handleSubmit = useCallback(
        (event) => {
            // 이전의 값을 가지고 와서 기본값으로 세팅
            event.preventDefault();

            const userForm = { email: email, password: password };

            // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
            dispatch(logIn(userForm));
            console.log('로그인하기!!!!!');
        },
        [email, password]
    );

    const handleReset = useCallback(() => {
        setEmail();
        setPassword();
    }, []);

    useEffect(() => {
        // 로그인 성공시
        if (authStore.login.data) {
            const data = authStore.login.data.data;
            dispatch(signinWithToken(data.token));
            storage.set('user-token', data.token);
            history.push('/');
        }
    }, [authStore.login]);

    return (
        <>
            <div className="Login">
                <div className="container">
                    <form onSubmit={handleSubmit} className="loginform">
                        <input
                            type="email"
                            placeholder="이메일"
                            value={email}
                            onChange={handleChangeEmail}
                            className="loginemail"
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={handleChangePassword}
                            className="loginpassword"
                        />
                        <br />

                        <SubButton
                            width="100"
                            height="30"
                            fontSize="16"
                            type="reset"
                            onClick={handleReset}
                        >
                            초기화
                        </SubButton>
                        <MainButton width="100" height="30" fontSize="16">
                            로그인
                        </MainButton>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
