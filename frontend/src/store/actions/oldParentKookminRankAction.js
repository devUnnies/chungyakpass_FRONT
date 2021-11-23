import * as oldParentKookminRankApi from '../../services/api/oldParentKookminRankApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 노부모 국민 순위
export const RES_OLDPARENT_KOOKMIN_RANK_PATCH =
    'RES_OLDPARENT_KOOKMIN_RANK_PATCH';
export const RES_OLDPARENT_KOOKMIN_RANK_PATCH_SUCCESS =
    'RES_OLDPARENT_KOOKMIN_RANK_PATCH_SUCCESS';
export const RES_OLDPARENT_KOOKMIN_RANK_PATCH_ERROR =
    'RES_OLDPARENT_KOOKMIN_RANK_PATCH_ERROR';

/* Action Creator */
export const patchOldParentKookminRank = createPromiseThunk(
    RES_OLDPARENT_KOOKMIN_RANK_PATCH,
    oldParentKookminRankApi.patchOldParentKookminRank
);
