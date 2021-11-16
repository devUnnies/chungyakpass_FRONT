import * as generalMinyeongApi from '../../services/api/generalMinyeongApi'; // 일반민영Api 안의 함수 모두 불러오기
import { createPromiseThunk } from '../../services/api/asyncUtils';

// 일반 민영 아파트 분양 정보 받아오기
export const RES_GENERAL_MINYEONG_APTNUM_POST =
    'RES_GENERAL_MINYEONG_APTNUM_POST';
export const RES_GENERAL_MINYEONG_APTNUM_POST_SUCCESS =
    'RES_GENERAL_MINYEONG_APTNUM_POST_SUCCESS';
export const RES_GENERAL_MINYEONG_APTNUM_POST_ERROR =
    'RES_GENERAL_MINYEONG_APTNUM_POST_ERROR';

/* Action Creator */
export const postGeneralMinyeongAptNum = createPromiseThunk(
    RES_GENERAL_MINYEONG_APTNUM_POST,
    generalMinyeongApi.postGeneralMinyeongAptNum
);
