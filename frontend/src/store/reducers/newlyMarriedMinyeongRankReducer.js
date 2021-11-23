import {
    // 신혼부부 민영 순위
    RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH,
    RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_SUCCESS,
    RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_ERROR,
    // 신혼부부 민영 순위 조회
    RES_MEWLY_MARRIED_MINYEONG_RANK_GET,
    RES_MEWLY_MARRIED_MINYEONG_RANK_GET_SUCCESS,
    RES_MEWLY_MARRIED_MINYEONG_RANK_GET_ERROR,
} from '../actions/newlyMarriedMinyeongRankAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    patchNewlyMarriedMinyeongRank: reducerUtils.initial(),
    getNewlyMarriedMinyeongRank: reducerUtils.initial(),
};

export default function newlyMarriedMinyeongRank(state = initialState, action) {
    switch (action.type) {
        case RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH:
        case RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_SUCCESS:
        case RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH,
                'patchNewlyMarriedMinyeongRank'
            )(state, action);
        case RES_MEWLY_MARRIED_MINYEONG_RANK_GET:
        case RES_MEWLY_MARRIED_MINYEONG_RANK_GET_SUCCESS:
        case RES_MEWLY_MARRIED_MINYEONG_RANK_GET_ERROR:
            return handleAsyncActions(
                RES_MEWLY_MARRIED_MINYEONG_RANK_GET,
                'getNewlyMarriedMinyeongRank'
            )(state, action);
        default:
            return state;
    }
}
