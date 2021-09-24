import * as normalPrivateApi from '../../services/api/normalPrivateApi'; // normalPrivateApi 안의 함수 모두 불러오기
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
//세대 저장
export const RES_NORMAL_PRIVATE_GET = 'RES_NORMAL_PRIVATE_GET';
export const RES_NORMAL_PRIVATE_GET_SUCCESS = 'RES_NORMAL_PRIVATE_GET_SUCCESS';
export const RES_NORMAL_PRIVATE_GET_ERROR = 'RES_NORMAL_PRIVATE_GET_ERROR';

/* Action Creator */
export const getNormalPrivate = createPromiseThunk(
    RES_NORMAL_PRIVATE_GET,
    normalPrivateApi.getNormalPrivate
);
