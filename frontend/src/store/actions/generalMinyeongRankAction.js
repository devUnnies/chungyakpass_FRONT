import * as generalMinyeongRankApi from '../../services/api/generalMinyeongRankApi'; // 일반 민영 순위 Api 안의 함수 모두 불러오기
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 일반 민영 순위
export const RES_GENERAL_MINYEONG_RANK_PATCH =
    'RES_GENERAL_MINYEONG_RANK_PATCH';
export const RES_GENERAL_MINYEONG_RANK_PATCH_SUCCESS =
    'RES_GENERAL_MINYEONG_RANK_PATCH_SUCCESS';
export const RES_GENERAL_MINYEONG_RANK_PATCH_ERROR =
    'RES_GENERAL_MINYEONG_RANK_PATCH_ERROR';

// 일반 민영 순위 조회
export const RES_GENERAL_MINYEONG_RANK_GET = 'RES_GENERAL_MINYEONG_RANK_GET';
export const RES_GENERAL_MINYEONG_RANK_GET_SUCCESS =
    'RES_GENERAL_MINYEONG_RANK_GET_SUCCESS';
export const RES_GENERAL_MINYEONG_RANK_GET_ERROR =
    'RES_GENERAL_MINYEONG_RANK_GET_ERROR';

/* Action Creator */
export const patchGeneralMinyeongRank = createPromiseThunk(
    RES_GENERAL_MINYEONG_RANK_PATCH,
    generalMinyeongRankApi.patchGeneralMinyeongRank
);

export const getGeneralMinyeongRank = createPromiseThunk(
    RES_GENERAL_MINYEONG_RANK_GET,
    generalMinyeongRankApi.getGeneralMinyeongRank
);
