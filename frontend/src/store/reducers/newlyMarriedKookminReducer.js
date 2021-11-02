import {
    // 신혼부부 국민 아파트 분양정보 post
    RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST,
    RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST_SUCCESS,
    RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST_ERROR,
} from '../actions/newlyMarriedKookminAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postNewlyMarriedKookminAptNum: reducerUtils.initial(),
};

export default function newlyMarriedKookmin(state = initialState, action) {
    switch (action.type) {
        case RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST:
        case RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST_SUCCESS:
        case RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST,
                'postNewlyMarriedKookminAptNum'
            )(state, action);
        default:
            return state;
    }
}
