import axios from 'axios';

//로그인 및 회원가입 API
export const logIn = (info) =>
    axios.post('account/authenticate', info, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });
export const logOut = () => axios.post('logout', {});
export const signUp = (info) =>
    axios.post('account/signup', info, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });
