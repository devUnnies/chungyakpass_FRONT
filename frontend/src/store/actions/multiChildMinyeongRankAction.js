import * as multiChildMinyeongRankApi from '../../services/api/multiChildMinyeongRankApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 다자녀 민영 순위
export const RES_MULTICHILD_MINYEONG_RANK_PATCH =
    'RES_MULTICHILD_MINYEONG_RANK_PATCH';
export const RES_MULTICHILD_MINYEONG_RANK_PATCH_SUCCESS =
    'RES_MULTICHILD_MINYEONG_RANK_PATCH_SUCCESS';
export const RES_MULTICHILD_MINYEONG_RANK_PATCH_ERROR =
    'RES_MULTICHILD_MINYEONG_RANK_PATCH_ERROR';

/* Action Creator */
export const patchMultiChildMinyeongRank = createPromiseThunk(
    RES_MULTICHILD_MINYEONG_RANK_PATCH,
    multiChildMinyeongRankApi.patchMultiChildMinyeongRank
);
