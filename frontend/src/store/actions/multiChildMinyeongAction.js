import * as multiChildMinyeongApi from '../../services/api/multiChildMinyeongApi'; // normalPrivateApi 안의 함수 모두 불러오기
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 다자녀 민영 로직 받아오기
export const RES_MULTICHILD_MINYEONG_GET = 'RES_MULTICHILD_MINYEONG_GET';
export const RES_MULTICHILD_MINYEONG_GET_SUCCESS =
    'RES_MULTICHILD_MINYEONG_GET_SUCCESS';
export const RES_MULTICHILD_MINYEONG_GET_ERROR =
    'RES_MULTICHILD_MINYEONG_GET_ERROR';

/* Action Creator */
export const getMultiChildMinyeong = createPromiseThunk(
    RES_MULTICHILD_MINYEONG_GET,
    multiChildMinyeongApi.getMultiChildMinyeong
);
