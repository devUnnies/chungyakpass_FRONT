import { combineReducers } from 'redux';
import auth from './authReducer';
import token from './tokenReducer';
import generalMinyeong from './generalMinyeongReducer';
import multiChildMinyeong from './multiChildMinyeongReducer';

const rootReducer = combineReducers({
    auth,
    token,
    generalMinyeong,
    multiChildMinyeong,
});

export default rootReducer;
