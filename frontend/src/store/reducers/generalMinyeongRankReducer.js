import {
    // 일반 민영 순위
    RES_GENERAL_MINYEONG_RANK_PATCH,
    RES_GENERAL_MINYEONG_RANK_PATCH_SUCCESS,
    RES_GENERAL_MINYEONG_RANK_PATCH_ERROR,
    // 일반 민영 순위 조회
    RES_GENERAL_MINYEONG_RANK_GET,
    RES_GENERAL_MINYEONG_RANK_GET_SUCCESS,
    RES_GENERAL_MINYEONG_RANK_GET_ERROR,
} from '../actions/generalMinyeongRankAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    patchGeneralMinyeongRank: reducerUtils.initial(),
    getGeneralMinyeongRank: reducerUtils.initial(),
};

export default function generalMinyeongRank(state = initialState, action) {
    switch (action.type) {
        case RES_GENERAL_MINYEONG_RANK_PATCH:
        case RES_GENERAL_MINYEONG_RANK_PATCH_SUCCESS:
        case RES_GENERAL_MINYEONG_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_GENERAL_MINYEONG_RANK_PATCH,
                'patchGeneralMinyeongRank'
            )(state, action);
        case RES_GENERAL_MINYEONG_RANK_GET:
        case RES_GENERAL_MINYEONG_RANK_GET_SUCCESS:
        case RES_GENERAL_MINYEONG_RANK_GET_ERROR:
            return handleAsyncActions(
                RES_GENERAL_MINYEONG_RANK_GET,
                'getGeneralMinyeongRank'
            )(state, action);
        default:
            return state;
    }
}
