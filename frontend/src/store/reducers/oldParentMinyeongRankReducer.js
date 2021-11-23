import {
    // 노부모 민영 순위
    RES_OLDPARENT_MINYEONG_RANK_PATCH,
    RES_OLDPARENT_MINYEONG_RANK_PATCH_SUCCESS,
    RES_OLDPARENT_MINYEONG_RANK_PATCH_ERROR,
} from '../actions/oldParentMinyeongRankAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    patchOldParentMinyeongRank: reducerUtils.initial(),
};

export default function oldParentMinyeongRank(state = initialState, action) {
    switch (action.type) {
        case RES_OLDPARENT_MINYEONG_RANK_PATCH:
        case RES_OLDPARENT_MINYEONG_RANK_PATCH_SUCCESS:
        case RES_OLDPARENT_MINYEONG_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_OLDPARENT_MINYEONG_RANK_PATCH,
                'patchOldParentMinyeongRank'
            )(state, action);
        default:
            return state;
    }
}
