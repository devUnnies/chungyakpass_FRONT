import {
    // 신혼부부 국민 공특법 적용 아파트 분양정보 post
    RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST,
    RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_SUCCESS,
    RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_ERROR,
} from '../actions/newlyMarriedKookminSpecialAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postNewlyMarriedKookminSpecialAptNum: reducerUtils.initial(),
};

export default function newlyMarriedKookminSpecial(
    state = initialState,
    action
) {
    switch (action.type) {
        case RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST:
        case RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_SUCCESS:
        case RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST,
                'postNewlyMarriedKookminSpecialAptNum'
            )(state, action);
        default:
            return state;
    }
}
