import * as oldParentMinyeongRankApi from '../../services/api/oldParentMinyeongRankApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 노부모 민영 순위
export const RES_OLDPARENT_MINYEONG_RANK_PATCH =
    'RES_OLDPARENT_MINYEONG_RANK_PATCH';
export const RES_OLDPARENT_MINYEONG_RANK_PATCH_SUCCESS =
    'RES_OLDPARENT_MINYEONG_RANK_PATCH_SUCCESS';
export const RES_OLDPARENT_MINYEONG_RANK_PATCH_ERROR =
    'RES_OLDPARENT_MINYEONG_RANK_PATCH_ERROR';

/* Action Creator */
export const patchOldParentMinyeongRank = createPromiseThunk(
    RES_OLDPARENT_MINYEONG_RANK_PATCH,
    oldParentMinyeongRankApi.patchOldParentMinyeongRank
);
