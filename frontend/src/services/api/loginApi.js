import axios from 'axios';
import { post } from './instance';

//로그인 및 회원가입 API
export const logIn = (info) => post('account/authenticate', info);
export const signUp = (info) => post('account/signup', info);
