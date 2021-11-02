import { combineReducers } from 'redux';
import auth from './authReducer';
import token from './tokenReducer';
import commonInfo from './commonInfoReducer';
import generalMinyeong from './generalMinyeongReducer';
import generalKookmin from './generalKookminReducer';
import generalMinyeongPoint from './pointGeneralMinyeongReducer';
import multiChildMinyeong from './multiChildMinyeongReducer';
import multiChildKookmin from './multiChildKookminReducer';
import multiChildPoint from './pointSpecialMultiChildReducer';
import oldParentMinyeong from './oldParentMinyeongReducer';
import oldParentKookmin from './oldParentKookminReducer';
import firstInLifeMinyeong from './firstInLifeMinyeongReducer';
import firstInLifeKookmin from './firstInLifeKookminReducer';
import newlyMarriedKookmin from './newlyMarriedKookminReducer';
import newlyMarriagePoint from './pointSpecialNewlyMarriageReducer';
import oneParentPoint from './pointSpecialOneParentReducer';

const rootReducer = combineReducers({
    auth,
    token,
    commonInfo,
    generalMinyeong,
    generalKookmin,
    generalMinyeongPoint,
    multiChildMinyeong,
    multiChildKookmin,
    multiChildPoint,
    oldParentMinyeong,
    oldParentKookmin,
    firstInLifeMinyeong,
    newlyMarriedKookmin,
    newlyMarriagePoint,
    oneParentPoint,
});

// const rootReducer = (state, action) => {
//     if (action.type === 'LOGOUT') {
//         return appReducer(undefined, action);
//     }

//     return appReducer(state, action);
// };

export default rootReducer;
