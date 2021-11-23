import * as multiChildKookminRankApi from '../../services/api/multiChildKookminRankApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 다자녀 국민 순위
export const RES_MULTICHILD_KOOKMIN_RANK_PATCH =
    'RES_MULTICHILD_KOOKMIN_RANK_PATCH';
export const RES_MULTICHILD_KOOKMIN_RANK_PATCH_SUCCESS =
    'RES_MULTICHILD_KOOKMIN_RANK_PATCH_SUCCESS';
export const RES_MULTICHILD_KOOKMIN_RANK_PATCH_ERROR =
    'RES_MULTICHILD_KOOKMIN_RANK_PATCH_ERROR';

// 다자녀 국민 순위 조회
export const RES_MULTICHILD_KOOKMIN_RANK_GET =
    'RES_MULTICHILD_KOOKMIN_RANK_GET';
export const RES_MULTICHILD_KOOKMIN_RANK_GET_SUCCESS =
    'RES_MULTICHILD_KOOKMIN_RANK_GET_SUCCESS';
export const RES_MULTICHILD_KOOKMIN_RANK_GET_ERROR =
    'RES_MULTICHILD_KOOKMIN_RANK_GET_ERROR';

/* Action Creator */
export const patchMultiChildKookminRank = createPromiseThunk(
    RES_MULTICHILD_KOOKMIN_RANK_PATCH,
    multiChildKookminRankApi.patchMultiChildKookminRank
);

export const getMultiChildKookminRank = createPromiseThunk(
    RES_MULTICHILD_KOOKMIN_RANK_GET,
    multiChildKookminRankApi.getMultiChildKookminRank
);
