import {
    RES_GENERAL_RANK_POST,
    RES_GENERAL_RANK_POST_SUCCESS,
    RES_GENERAL_RANK_POST_ERROR,
} from '../actions/generalRankPostAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postGeneralRank: reducerUtils.initial(),
};

export default function generalRank(state = initialState, action) {
    switch (action.type) {
        case RES_GENERAL_RANK_POST:
        case RES_GENERAL_RANK_POST_SUCCESS:
        case RES_GENERAL_RANK_POST_ERROR:
            return handleAsyncActions(RES_GENERAL_RANK_POST, 'postGeneralRank')(
                state,
                action
            );
        default:
            return state;
    }
}
