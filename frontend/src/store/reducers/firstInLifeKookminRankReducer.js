import {
    // 생애최초 국민 순위
    RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH,
    RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH_SUCCESS,
    RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH_ERROR,
    // 생애최초 국민 순위 조회
    RES_FIRSTINLIFE_KOOKMIN_RANK_GET,
    RES_FIRSTINLIFE_KOOKMIN_RANK_GET_SUCCESS,
    RES_FIRSTINLIFE_KOOKMIN_RANK_GET_ERROR,
} from '../actions/firstInLifeKookminRankAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    patchFirstLifeKookminRank: reducerUtils.initial(),
    getFirstLifeKookminRank: reducerUtils.initial(),
};

export default function firstLifeKookminRank(state = initialState, action) {
    switch (action.type) {
        case RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH:
        case RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH_SUCCESS:
        case RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH,
                'patchFirstLifeKookminRank'
            )(state, action);
        case RES_FIRSTINLIFE_KOOKMIN_RANK_GET:
        case RES_FIRSTINLIFE_KOOKMIN_RANK_GET_SUCCESS:
        case RES_FIRSTINLIFE_KOOKMIN_RANK_GET_ERROR:
            return handleAsyncActions(
                RES_FIRSTINLIFE_KOOKMIN_RANK_GET,
                'getFirstLifeKookminRank'
            )(state, action);
        default:
            return state;
    }
}
