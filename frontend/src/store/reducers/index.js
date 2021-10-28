import { combineReducers } from 'redux';
import auth from './authReducer';
import token from './tokenReducer';
import commonInfo from './commonInfoReducer';
import generalMinyeong from './generalMinyeongReducer';
import generalKookmin from './generalKookminReducer';
import multiChildMinyeong from './multiChildMinyeongReducer';
import multiChildKookmin from './multiChildKookminReducer';
import multiChildPoint from './pointSpecialMultiChildReducer';
import oldParentMinyeong from './oldParentMinyeongReducer';
import oldParentKookmin from './oldParentKookminReducer';
import firstInLifeMinyeong from './firstInLifeMinyeongReducer';

const rootReducer = combineReducers({
    auth,
    token,
    commonInfo,
    generalMinyeong,
    generalKookmin,
    multiChildMinyeong,
    multiChildKookmin,
    multiChildPoint,
    oldParentMinyeong,
    oldParentKookmin,
    firstInLifeMinyeong,
});

// const rootReducer = (state, action) => {
//     if (action.type === 'LOGOUT') {
//         return appReducer(undefined, action);
//     }

//     return appReducer(state, action);
// };

export default rootReducer;
