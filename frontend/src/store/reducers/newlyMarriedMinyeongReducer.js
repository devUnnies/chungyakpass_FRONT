import {
    // 신혼부부 민영 아파트 분양정보 post
    RES_NEWLYMARRIED_MINYEONG_APTNUM_POST,
    RES_NEWLYMARRIED_MINYEONG_APTNUM_POST_SUCCESS,
    RES_NEWLYMARRIED_MINYEONG_APTNUM_POST_ERROR,
} from '../actions/newlyMarriedMinyeongAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postNewlyMarriedMinyeongAptNum: reducerUtils.initial(),
};

export default function newlyMarriedMinyeong(state = initialState, action) {
    switch (action.type) {
        case RES_NEWLYMARRIED_MINYEONG_APTNUM_POST:
        case RES_NEWLYMARRIED_MINYEONG_APTNUM_POST_SUCCESS:
        case RES_NEWLYMARRIED_MINYEONG_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_NEWLYMARRIED_MINYEONG_APTNUM_POST,
                'postNewlyMarriedMinyeongAptNum'
            )(state, action);
        default:
            return state;
    }
}
