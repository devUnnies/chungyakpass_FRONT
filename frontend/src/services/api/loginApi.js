import axios from "axios";

const baseURL = "";
// const baseURL = 'http://localhost:3000/';

//로그인 및 회원가입 API
export const logIn = (info) => axios.post(baseURL + "login", info);
export const logOut = () => axios.post(baseURL + "logout", {});
export const signUp = (info) => axios.post(baseURL + "signup", info);
