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

/* Action Creator */
export const patchGeneralMinyeongRank = createPromiseThunk(
    RES_GENERAL_MINYEONG_RANK_PATCH,
    generalMinyeongRankApi.patchGeneralMinyeongRank
);
