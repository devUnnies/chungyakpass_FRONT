import * as newlyMarriedMinyeongRankApi from '../../services/api/newlyMarriedMinyeongRankApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 신혼부부 민영 순위
export const RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH =
    'RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH';
export const RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_SUCCESS =
    'RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_SUCCESS';
export const RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_ERROR =
    'RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_ERROR';

// 신혼부부 민영 순위 조회
export const RES_MEWLY_MARRIED_MINYEONG_RANK_GET =
    'RES_MEWLY_MARRIED_MINYEONG_RANK_GET';
export const RES_MEWLY_MARRIED_MINYEONG_RANK_GET_SUCCESS =
    'RES_MEWLY_MARRIED_MINYEONG_RANK_GET_SUCCESS';
export const RES_MEWLY_MARRIED_MINYEONG_RANK_GET_ERROR =
    'RES_MEWLY_MARRIED_MINYEONG_RANK_GET_ERROR';

/* Action Creator */
export const patchNewlyMarriedMinyeongRank = createPromiseThunk(
    RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH,
    newlyMarriedMinyeongRankApi.patchNewlyMarriedMinyeongRank
);

export const getNewlyMarriedMinyeongRank = createPromiseThunk(
    RES_MEWLY_MARRIED_MINYEONG_RANK_GET,
    newlyMarriedMinyeongRankApi.getNewlyMarriedMinyeongRank
);
