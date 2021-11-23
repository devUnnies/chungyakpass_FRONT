import * as newlyMarriedKookminSpecialRankApi from '../../services/api/newlyMarriedKookminSpecialRankApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 신혼부부 공특법 적용 국민 순위
export const RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH =
    'RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH';
export const RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_SUCCESS =
    'RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_SUCCESS';
export const RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_ERROR =
    'RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_ERROR';

/* Action Creator */
export const patchNewlyMarriedKookminSpecialRank = createPromiseThunk(
    RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH,
    newlyMarriedKookminSpecialRankApi.patchNewlyMarriedKookminSpecialRank
);
