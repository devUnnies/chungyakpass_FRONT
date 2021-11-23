import {
    // 노부모 국민 순위
    RES_OLDPARENT_KOOKMIN_RANK_PATCH,
    RES_OLDPARENT_KOOKMIN_RANK_PATCH_SUCCESS,
    RES_OLDPARENT_KOOKMIN_RANK_PATCH_ERROR,
} from '../actions/oldParentKookminRankAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    patchOldParentKookminRank: reducerUtils.initial(),
};

export default function oldParentKookminRank(state = initialState, action) {
    switch (action.type) {
        case RES_OLDPARENT_KOOKMIN_RANK_PATCH:
        case RES_OLDPARENT_KOOKMIN_RANK_PATCH_SUCCESS:
        case RES_OLDPARENT_KOOKMIN_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_OLDPARENT_KOOKMIN_RANK_PATCH,
                'patchOldParentKookminRank'
            )(state, action);
        default:
            return state;
    }
}
