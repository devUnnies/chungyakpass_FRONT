import * as loginApi from "../../services/api/loginApi"; // loginApi 안의 함수 모두 불러오기
import { createPromiseThunk } from "../../services/api/asyncUtils";

/* 액션 타입 */
//로그인
export const LOGIN_POST = "LOGIN_POST";
export const LOGIN_POST_SUCCESS = "LOGIN_POST_SUCCESS";
export const LOGIN_POST_ERROR = "LOGIN_POST_ERROR";

export const loginTest = (info) => ({
  type: LOGIN_POST,
  info,
});

// 회원가입
export const SIGNUP_POST = "SIGNUP_POST";
export const SIGNUP_POST_SUCCESS = "SIGNUP_POST_SUCCESS";
export const SIGNUP_POST_ERROR = "SIGNUP_POST_ERROR";

export const signupTest = (info) => ({
  type: SIGNUP_POST,
  info,
});

// 로그아웃

/* Action Creator */
// export const logIn = createPromiseThunk(LOGIN_POST, loginApi.logIn);
export const signUp = createPromiseThunk(SIGNUP_POST, loginApi.signUp);
