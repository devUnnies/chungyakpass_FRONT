import * as generalMinyeongApi from '../../services/api/generalMinyeongApi'; // normalPrivateApi 안의 함수 모두 불러오기
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

// 일반 민영 로직 받아오기
// export const RES_GENERAL_MINYEONG_GET = 'RES_GENERAL_MINYEONG_GET';
// export const RES_GENERAL_MINYEONG_GET_SUCCESS =
//     'RES_GENERAL_MINYEONG_GET_SUCCESS';
// export const RES_GENERAL_MINYEONG_GET_ERROR = 'RES_GENERAL_MINYEONG_GET_ERROR';

// /* Action Creator */
// export const getGeneralMinyeong = createPromiseThunk(
//     RES_GENERAL_MINYEONG_GET,
//     generalMinyeongApi.getGeneralMinyeong
// );
