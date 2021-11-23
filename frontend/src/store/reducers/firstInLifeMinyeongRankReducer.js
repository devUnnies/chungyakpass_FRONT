import {
    // 생애최초 민영 순위
    RES_FIRSTINLIFE_MINYEONG_RANK_PATCH,
    RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_SUCCESS,
    RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_ERROR,
    // 생애최초 민영 순위 조회
    RES_FIRSTINLIFE_MINYEONG_RANK_GET,
    RES_FIRSTINLIFE_MINYEONG_RANK_GET_SUCCESS,
    RES_FIRSTINLIFE_MINYEONG_RANK_GET_ERROR,
} from '../actions/firstInLifeMinyeongRankAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    patchFirstLifeMinyeongRank: reducerUtils.initial(),
    getFirstLifeMinyeongRank: reducerUtils.initial(),
};

export default function firstLifeMinyeongRank(state = initialState, action) {
    switch (action.type) {
        case RES_FIRSTINLIFE_MINYEONG_RANK_PATCH:
        case RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_SUCCESS:
        case RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_FIRSTINLIFE_MINYEONG_RANK_PATCH,
                'patchFirstLifeMinyeongRank'
            )(state, action);
        case RES_FIRSTINLIFE_MINYEONG_RANK_GET:
        case RES_FIRSTINLIFE_MINYEONG_RANK_GET_SUCCESS:
        case RES_FIRSTINLIFE_MINYEONG_RANK_GET_ERROR:
            return handleAsyncActions(
                RES_FIRSTINLIFE_MINYEONG_RANK_GET,
                'getFirstLifeMinyeongRank'
            )(state, action);
        default:
            return state;
    }
}
