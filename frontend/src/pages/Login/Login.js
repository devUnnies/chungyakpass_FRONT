import React, { useState, useCallback, useMemo, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { loginTest } from "../../store/actions/authAction";

import Input from "../../components/Input/Input";
import useInputState from "../../components/Input/useInputState";
import useWindowWidth from "../../components/WindowSize/useWindowWidth";
import MainButton from "../../components/Button/MainButton";
import SubButton from "../../components/Button/SubButton";

function Login() {
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth);

  const [email, setEmail, handleChangeEmail] = useInputState("");
  const [password, setPassword, handleChangePassword] = useInputState("");
  // 창 가로 사이즈 가져옴
  const windowWidth = useWindowWidth();

  // 가입하기 버튼을 누르면 실행하는 함수
  const handleSubmit = useCallback(
    (event) => {
      // 이전의 값을 가지고 와서 기본값으로 세팅
      event.preventDefault();

      const userForm = { email: email, password: password };

      console.log(userForm);
      // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
      dispatch(loginTest(userForm));
    },
    [email, password]
  );

  const handleReset = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={handleChangeEmail}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handleChangePassword}
        />
        <MainButton width="100" height="30" fontSize="16" type="submit">
          로그인하기
        </MainButton>
        <SubButton
          width="100"
          height="30"
          fontSize="16"
          type="button"
          onClick={handleReset}
        >
          초기화
        </SubButton>
      </form>
      <div>{windowWidth}</div>
    </>
  );
}

export default Login;
