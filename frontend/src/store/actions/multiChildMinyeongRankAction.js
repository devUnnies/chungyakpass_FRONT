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

// 다자녀 민영 순위 조회
export const RES_MULTICHILD_MINYEONG_RANK_GET =
    'RES_MULTICHILD_MINYEONG_RANK_GET';
export const RES_MULTICHILD_MINYEONG_RANK_GET_SUCCESS =
    'RES_MULTICHILD_MINYEONG_RANK_GET_SUCCESS';
export const RES_MULTICHILD_MINYEONG_RANK_GET_ERROR =
    'RES_MULTICHILD_MINYEONG_RANK_GET_ERROR';

/* Action Creator */
export const patchMultiChildMinyeongRank = createPromiseThunk(
    RES_MULTICHILD_MINYEONG_RANK_PATCH,
    multiChildMinyeongRankApi.patchMultiChildMinyeongRank
);

export const getMultiChildMinyeongRank = createPromiseThunk(
    RES_MULTICHILD_MINYEONG_RANK_GET,
    multiChildMinyeongRankApi.getMultiChildMinyeongRank
);
