import * as generalRankPostApi from '../../services/api/generalRankPostApi'; // 일반 순위 Api 안의 함수 모두 불러오기
import { createPromiseThunk } from '../../services/api/asyncUtils';

export const RES_GENERAL_RANK_POST = 'RES_GENERAL_RANK_POST';
export const RES_GENERAL_RANK_POST_SUCCESS = 'RES_GENERAL_RANK_POST_SUCCESS';
export const RES_GENERAL_RANK_POST_ERROR = 'RES_GENERAL_RANK_POST_ERROR';

/* Action Creator */
export const postGeneralRank = createPromiseThunk(
    RES_GENERAL_RANK_POST,
    generalRankPostApi.postGeneralRank
);
