import { combineReducers } from 'redux';
import auth from './authReducer';
import token from './tokenReducer';
import generalMinyeong from './generalMinyeongReducer';
import generalMinyeongAptNum from './generalMinyeongAptNumReducer';
import multiChildMinyeong from './multiChildMinyeongAptNumReducer';
import multiChildMinyeongAptNum from './multiChildMinyeongAptNumReducer';

const rootReducer = combineReducers({
    auth,
    token,
    generalMinyeong,
    generalMinyeongAptNum,
    multiChildMinyeong,
    multiChildMinyeongAptNum,
});

export default rootReducer;
