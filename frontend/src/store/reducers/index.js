import { combineReducers } from 'redux';
import auth from './authReducer';
import token from './tokenReducer';
import commonInfo from './commonInfoReducer';
import generalMinyeong from './generalMinyeongReducer';
import generalMinyeongAptNum from './generalMinyeongAptNumReducer';
import multiChildMinyeong from './multiChildMinyeongAptNumReducer';
import multiChildMinyeongAptNum from './multiChildMinyeongAptNumReducer';

const rootReducer = combineReducers({
    auth,
    token,
    commonInfo,
    generalMinyeong,
    generalMinyeongAptNum,
    multiChildMinyeong,
    multiChildMinyeongAptNum,
});

// const rootReducer = (state, action) => {
//     if (action.type === 'LOGOUT') {
//         return appReducer(undefined, action);
//     }

//     return appReducer(state, action);
// };

export default rootReducer;
