import * as oldParentMinyeongApi from '../../services/api/oldParentMinyeongApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 다자녀 민영 아파트 분양정보 보내기
export const RES_OLDPARENT_MINYEONG_APTNUM_POST =
    'RES_OLDPARENT_MINYEONG_APTNUM_POST';
export const RES_OLDPARENT_MINYEONG_APTNUM_POST_SUCCESS =
    'RES_OLDPARENT_MINYEONG_APTNUM_POST_SUCCESS';
export const RES_OLDPARENT_MINYEONG_APTNUM_POST_ERROR =
    'RES_OLDPARENT_MINYEONG_APTNUM_POST_ERROR';

/* Action Creator */
export const postOldParentMinyeongAptNum = createPromiseThunk(
    RES_OLDPARENT_MINYEONG_APTNUM_POST,
    oldParentMinyeongApi.postOldParentMinyeongAptNum
);
