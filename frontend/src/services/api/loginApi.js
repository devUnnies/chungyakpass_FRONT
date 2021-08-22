import axios from 'axios';

//로그인 및 회원가입 API
export const logIn = (info) =>
    axios.post('authenticate', info, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });
export const logOut = () => axios.post('logout', {});
export const signUp = (info) =>
    axios.post('signup', info, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });
