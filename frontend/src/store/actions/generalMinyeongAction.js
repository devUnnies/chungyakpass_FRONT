import * as generalMinyeongApi from '../../services/api/generalMinyeongApi'; // normalPrivateApi 안의 함수 모두 불러오기
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 일반 민영 로직 받아오기
export const RES_GENERAL_MINYEONG_GET = 'RES_GENERAL_MINYEONG_GET';
export const RES_GENERAL_MINYEONG_GET_SUCCESS =
    'RES_GENERAL_MINYEONG_GET_SUCCESS';
export const RES_GENERAL_MINYEONG_GET_ERROR = 'RES_GENERAL_MINYEONG_GET_ERROR';

/* Action Creator */
export const getGeneralMinyeong = createPromiseThunk(
    RES_GENERAL_MINYEONG_GET,
    generalMinyeongApi.getGeneralMinyeong
);
