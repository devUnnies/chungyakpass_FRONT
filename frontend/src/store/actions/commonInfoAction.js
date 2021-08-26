import * as commonInfoApi from '../../services/api/commonInfoApi'; // commonInfoApi 안의 함수 모두 불러오기
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
//세대 저장
export const ADD_HOUSE_HOLDER_POST = 'ADD_HOUSE_HOLDER_POST';
export const ADD_HOUSE_HOLDER_POST_SUCCESS = 'ADD_HOUSE_HOLDER_POST_SUCCESS';
export const ADD_HOUSE_HOLDER_POST_ERROR = 'ADD_HOUSE_HOLDER_POST_ERROR';

/* Action Creator */
export const addHouseHolder = createPromiseThunk(
    ADD_HOUSE_HOLDER_POST,
    commonInfoApi.addHouseHolder
);
