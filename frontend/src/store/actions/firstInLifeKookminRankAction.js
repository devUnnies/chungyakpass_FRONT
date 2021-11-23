import * as firstInLifeKookminRankApi from '../../services/api/firstInLifeKookminRankApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 생애최초 국민 순위
export const RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH =
    'RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH';
export const RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH_SUCCESS =
    'RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH_SUCCESS';
export const RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH_ERROR =
    'RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH_ERROR';

// 생애최초 국민 순위 조회
export const RES_FIRSTINLIFE_KOOKMIN_RANK_GET =
    'RES_FIRSTINLIFE_KOOKMIN_RANK_GET';
export const RES_FIRSTINLIFE_KOOKMIN_RANK_GET_SUCCESS =
    'RES_FIRSTINLIFE_KOOKMIN_RANK_GET_SUCCESS';
export const RES_FIRSTINLIFE_KOOKMIN_RANK_GET_ERROR =
    'RES_FIRSTINLIFE_KOOKMIN_RANK_GET_ERROR';

/* Action Creator */
export const patchFirstLifeKookminRank = createPromiseThunk(
    RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH,
    firstInLifeKookminRankApi.patchFirstLifeKookminRank
);

export const getFirstLifeKookminRank = createPromiseThunk(
    RES_FIRSTINLIFE_KOOKMIN_RANK_GET,
    firstInLifeKookminRankApi.getFirstLifeKookminRank
);
