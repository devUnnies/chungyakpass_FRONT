import * as pointSpecialOldParentApi from '../../services/api/pointSpecialOldParentApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 노부모 필요 정보 보내기
export const RES_SPECIAL_OLDPARENT_POST = 'RES_SPECIAL_OLDPARENT_POST';
export const RES_SPECIAL_OLDPARENT_POST_SUCCESS =
    'RES_SPECIAL_OLDPARENT_POST_SUCCESS';
export const RES_SPECIAL_OLDPARENT_POST_ERROR =
    'RES_SPECIAL_OLDPARENT_POST_ERROR';

/* Action Creator */
export const postSpecialOldParentPoint = createPromiseThunk(
    RES_SPECIAL_OLDPARENT_POST,
    pointSpecialOldParentApi.postSpecialOldParentPoint
);
