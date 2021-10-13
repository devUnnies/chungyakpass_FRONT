import { combineReducers } from 'redux';
import auth from './authReducer';
import token from './tokenReducer';
import commonInfo from './commonInfoReducer';
import generalMinyeong from './generalMinyeongReducer';
import generalKookmin from './generalKookminReducer';
import multiChildMinyeong from './multiChildMinyeongReducer';
import multiChildKookmin from './multiChildKookminReducer';

const rootReducer = combineReducers({
    auth,
    token,
    commonInfo,
    generalMinyeong,
    generalKookmin,
    multiChildMinyeong,
    multiChildKookmin,
});

// const rootReducer = (state, action) => {
//     if (action.type === 'LOGOUT') {
//         return appReducer(undefined, action);
//     }

//     return appReducer(state, action);
// };

export default rootReducer;
