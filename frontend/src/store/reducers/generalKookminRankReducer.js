import {
    // 일반 국민 순위
    RES_GENERAL_KOOKMIN_RANK_PATCH,
    RES_GENERAL_KOOKMIN_RANK_PATCH_SUCCESS,
    RES_GENERAL_KOOKMIN_RANK_PATCH_ERROR,
} from '../actions/generalKookminRankAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    patchGeneralKookminRank: reducerUtils.initial(),
};

export default function generalKoominRank(state = initialState, action) {
    switch (action.type) {
        case RES_GENERAL_KOOKMIN_RANK_PATCH:
        case RES_GENERAL_KOOKMIN_RANK_PATCH_SUCCESS:
        case RES_GENERAL_KOOKMIN_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_GENERAL_KOOKMIN_RANK_PATCH,
                'patchGeneralKookminRank'
            )(state, action);
        default:
            return state;
    }
}
