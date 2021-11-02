import * as newlyMarriedKookminSpecialApi from '../../services/api/newlyMarriedKookminSpecialApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 신혼부부 국민 공특법 적용 아파트 분양정보 보내기
export const RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST =
    'RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST';
export const RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_SUCCESS =
    'RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_SUCCESS';
export const RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_ERROR =
    'RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_ERROR';

/* Action Creator */
export const postNewlyMarriedKookminSpecialAptNum = createPromiseThunk(
    RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST,
    newlyMarriedKookminSpecialApi.postNewlyMarriedKookminSpecialAptNum
);
