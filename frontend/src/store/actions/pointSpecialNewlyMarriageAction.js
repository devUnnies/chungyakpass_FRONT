import * as pointSpecialNewlyMarriageApi from '../../services/api/pointSpecialNewlyMarriageApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 신혼부부 아파트 분양정보 보내기
export const RES_NEWLYMARRIAGE_APTNUM_POST = 'RES_NEWLYMARRIAGE_APTNUM_POST';
export const RES_NEWLYMARRIAGE_APTNUM_POST_SUCCESS =
    'RES_NEWLYMARRIAGE_APTNUM_POST_SUCCESS';
export const RRES_NEWLYMARRIAGE_APTNUM_POST_ERROR =
    'RRES_NEWLYMARRIAGE_APTNUM_POST_ERROR';

/* Action Creator */
export const postNewlyMarriagePointAptNum = createPromiseThunk(
    RES_NEWLYMARRIAGE_APTNUM_POST,
    pointSpecialNewlyMarriageApi.postNewlyMarriagePointAptNum
);
