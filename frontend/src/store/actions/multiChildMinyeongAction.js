import * as multiChildMinyeongApi from '../../services/api/multiChildMinyeongApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 다자녀 민영 아파트 분양정보 보내기
export const RES_MULTICHILD_MINYEONG_APTNUM_POST =
    'RES_MULTICHILD_MINYEONG_APTNUM_POST';
export const RES_MULTICHILD_MINYEONG_APTNUM_POST_SUCCESS =
    'RES_MULTICHILD_MINYEONG_APTNUM_POST_SUCCESS';
export const RES_MULTICHILD_MINYEONG_APTNUM_POST_ERROR =
    'RES_MULTICHILD_MINYEONG_APTNUM_POST_ERROR';

/* Action Creator */
export const postMultiChildMinyeongAptNum = createPromiseThunk(
    RES_MULTICHILD_MINYEONG_APTNUM_POST,
    multiChildMinyeongApi.postMultiChildMinyeongAptNum
);

// // 다자녀 민영 로직 get
// export const RES_MULTICHILD_MINYEONG_GET = 'RES_MULTICHILD_MINYEONG_GET';
// export const RES_MULTICHILD_MINYEONG_GET_SUCCESS =
//     'RES_MULTICHILD_MINYEONG_GET_SUCCESS';
// export const RES_MULTICHILD_MINYEONG_GET_ERROR =
//     'RES_MULTICHILD_MINYEONG_GET_ERROR';

// /* Action Creator */
// export const getMultiChildMinyeong = createPromiseThunk(
//     RES_MULTICHILD_MINYEONG_GET,
//     multiChildMinyeongApi.getMultiChildMinyeong
// );
