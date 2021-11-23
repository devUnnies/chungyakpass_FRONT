import * as newlyMarriedKookminRankApi from '../../services/api/newlyMarriedKookminRankApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 신혼부부 공특법 미적용 국민 순위
export const RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH =
    'RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH';
export const RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH_SUCCESS =
    'RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH_SUCCESS';
export const RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH_ERROR =
    'RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH_ERROR';

// 신혼부부 국민 순위 조회(공특법 적용, 미적용 둘 다)
export const RES_MEWLY_MARRIED_KOOKMIN_RANK_GET =
    'RES_MEWLY_MARRIED_KOOKMIN_RANK_GET';
export const RES_MEWLY_MARRIED_KOOKMIN_RANK_GET_SUCCESS =
    'RES_MEWLY_MARRIED_KOOKMIN_RANK_GET_SUCCESS';
export const RES_MEWLY_MARRIED_KOOKMIN_RANK_GET_ERROR =
    'RES_MEWLY_MARRIED_KOOKMIN_RANK_GET_ERROR';

/* Action Creator */
export const patchNewlyMarriedKookminRank = createPromiseThunk(
    RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH,
    newlyMarriedKookminRankApi.patchNewlyMarriedKookminRank
);

export const getNewlyMarriedKookminRank = createPromiseThunk(
    RES_MEWLY_MARRIED_KOOKMIN_RANK_GET,
    newlyMarriedKookminRankApi.getNewlyMarriedKookminRank
);
