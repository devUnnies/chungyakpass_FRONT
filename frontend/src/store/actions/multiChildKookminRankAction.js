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

/* Action Creator */
export const patchMultiChildKookminRank = createPromiseThunk(
    RES_MULTICHILD_KOOKMIN_RANK_PATCH,
    multiChildKookminRankApi.patchMultiChildKookminRank
);
