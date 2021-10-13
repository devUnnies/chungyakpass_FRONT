import * as multiChildKookminApi from '../../services/api/multiChildKookminApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 다자녀 민영 아파트 분양정보 보내기
export const RES_MULTICHILD_KOOKMIN_APTNUM_POST =
    'RES_MULTICHILD_KOOKMIN_APTNUM_POST';
export const RES_MULTICHILD_KOOKMIN_APTNUM_POST_SUCCESS =
    'RES_MULTICHILD_KOOKMIN_APTNUM_POST_SUCCESS';
export const RES_MULTICHILD_KOOKMIN_APTNUM_POST_ERROR =
    'RES_MULTICHILD_KOOKMIN_APTNUM_POST_ERROR';

/* Action Creator */
export const postMultiChildKookminAptNum = createPromiseThunk(
    RES_MULTICHILD_KOOKMIN_APTNUM_POST,
    multiChildKookminApi.postMultiChildKookminAptNum
);
