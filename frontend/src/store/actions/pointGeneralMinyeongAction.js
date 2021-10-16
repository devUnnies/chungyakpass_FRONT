import * as pointGeneralMinyeongApi from '../../services/api/pointGeneralMinyeongApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 일반 민영 필요 정보 보내기
export const RES_GENERAL_MINYEONG_POST = 'RES_GENERAL_MINYEONG_POST';
export const RES_GENERAL_MINYEONG_POST_SUCCESS =
    'RES_GENERAL_MINYEONG_POST_SUCCESS';
export const RES_GENERAL_MINYEONG_POST_ERROR =
    'RES_GENERAL_MINYEONG_POST_ERROR';

/* Action Creator */
export const postGeneralMinyeongPoint = createPromiseThunk(
    RES_GENERAL_MINYEONG_POST,
    pointGeneralMinyeongApi.postGeneralMinyeongPoint
);
