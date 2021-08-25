import {
    LOGIN_POST,
    LOGIN_POST_SUCCESS,
    LOGIN_POST_ERROR,
    SIGNUP_POST,
    SIGNUP_POST_SUCCESS,
    SIGNUP_POST_ERROR,
} from '../actions/authAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    login: reducerUtils.initial(),
    signup: reducerUtils.initial(),
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN_POST:
        case LOGIN_POST_SUCCESS:
        case LOGIN_POST_ERROR:
            return handleAsyncActions(LOGIN_POST, 'login')(state, action);
        // return {
        //     ...state,
        // }
        case SIGNUP_POST:
        case SIGNUP_POST_SUCCESS:
        case SIGNUP_POST_ERROR:
            return handleAsyncActions(SIGNUP_POST, 'signup')(state, action);
        // return {
        //     ...state,
        // }
        default:
            return state;
    }
}
