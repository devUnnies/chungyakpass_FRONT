import * as firstInLifeMinyeongRankApi from '../../services/api/firstInLifeMinyeongRankApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 생애최초 민영 순위
export const RES_FIRSTINLIFE_MINYEONG_RANK_PATCH =
    'RES_FIRSTINLIFE_MINYEONG_RANK_PATCH';
export const RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_SUCCESS =
    'RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_SUCCESS';
export const RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_ERROR =
    'RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_ERROR';

/* Action Creator */
export const patchFirstLifeMinyeongRank = createPromiseThunk(
    RES_FIRSTINLIFE_MINYEONG_RANK_PATCH,
    firstInLifeMinyeongRankApi.patchFirstLifeMinyeongRank
);
