import * as multiChildMinyeongAptNumApi from '../../services/api/multiChildMinyeongAptNumApi'; // normalPrivateApi 안의 함수 모두 불러오기
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
//세대 저장
export const RES_MULTICHILD_MINYEONG_APTNUM_POST =
    'RES_MULTICHILD_MINYEONG_APTNUM_POST';
export const RES_MULTICHILD_MINYEONG_APTNUM_POST_SUCCESS =
    'RES_MULTICHILD_MINYEONG_APTNUM_POST_SUCCESS';
export const RES_MULTICHILD_MINYEONG_APTNUM_POST_ERROR =
    'RES_MULTICHILD_MINYEONG_APTNUM_POST_ERROR';

/* Action Creator */
export const postMultiChildMinyeongAptNum = createPromiseThunk(
    RES_MULTICHILD_MINYEONG_APTNUM_POST,
    multiChildMinyeongAptNumApi.postMultiChildMinyeongAptNum
);
