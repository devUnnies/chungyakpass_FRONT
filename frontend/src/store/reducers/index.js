import { combineReducers } from 'redux';
import auth from './authReducer';
import token from './tokenReducer';
import generalMinyeong from './generalMinyeongReducer';
import generalKookmin from './generalKookminReducer';
import multiChildMinyeong from './multiChildMinyeongReducer';
import multiChildKookmin from './multiChildKookminReducer';

const rootReducer = combineReducers({
    auth,
    token,
    generalMinyeong,
    generalKookmin,
    multiChildMinyeong,
    multiChildKookmin,
});

export default rootReducer;
