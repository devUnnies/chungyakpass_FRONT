import {
    // 신혼부부 공특법 적용 국민 순위
    RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH,
    RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_SUCCESS,
    RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_ERROR,
} from '../actions/newlyMarriedKookminSpecialRankAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    patchNewlyMarriedKookminSpecialRank: reducerUtils.initial(),
};

export default function newlyMarriedKookminSpecialRank(
    state = initialState,
    action
) {
    switch (action.type) {
        case RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH:
        case RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_SUCCESS:
        case RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH,
                'patchNewlyMarriedKookminSpecialRank'
            )(state, action);
        default:
            return state;
    }
}
