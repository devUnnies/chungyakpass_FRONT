import * as pointSpecialOneParentApi from '../../services/api/pointSpecialOneParentApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 한부모 아파트 분양정보 보내기
export const RES_ONEPARENT_APTNUM_POST = 'RES_ONEPARENT_APTNUM_POST';
export const RES_ONEPARENT_APTNUM_POST_SUCCESS =
    'RES_ONEPARENT_APTNUM_POST_SUCCESS';
export const RES_ONEPARENT_APTNUM_POST_ERROR =
    'RES_ONEPARENT_APTNUM_POST_ERROR';

/* Action Creator */
export const postOneParentPointAptNum = createPromiseThunk(
    RES_ONEPARENT_APTNUM_POST,
    pointSpecialOneParentApi.postOneParentPointAptNum
);
