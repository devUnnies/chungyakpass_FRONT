import {
    // 다자녀 국민 순위
    RES_MULTICHILD_KOOKMIN_RANK_PATCH,
    RES_MULTICHILD_KOOKMIN_RANK_PATCH_SUCCESS,
    RES_MULTICHILD_KOOKMIN_RANK_PATCH_ERROR,
} from '../actions/multiChildKookminRankAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    patchMultiChildKookminRank: reducerUtils.initial(),
};

export default function multiChildKookminRank(state = initialState, action) {
    switch (action.type) {
        case RES_MULTICHILD_KOOKMIN_RANK_PATCH:
        case RES_MULTICHILD_KOOKMIN_RANK_PATCH_SUCCESS:
        case RES_MULTICHILD_KOOKMIN_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_KOOKMIN_RANK_PATCH,
                'patchMultiChildKookminRank'
            )(state, action);
        default:
            return state;
    }
}
