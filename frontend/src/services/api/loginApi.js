import axios from "axios";

const baseURL = "";
// const baseURL = 'http://3.37.166.82:8080/api/';

//로그인 및 회원가입 API
export const logIn = (info) => axios.post(baseURL + "login", info);
export const logOut = () => axios.post(baseURL + "logout", {});
export const signUp = (info) => axios.post(baseURL + "signup", info);
