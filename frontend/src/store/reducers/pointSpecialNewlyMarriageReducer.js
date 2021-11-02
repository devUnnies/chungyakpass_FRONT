import {
    // 신혼부부 아파트 분양정보 post
    RES_NEWLYMARRIAGE_APTNUM_POST,
    RES_NEWLYMARRIAGE_APTNUM_POST_SUCCESS,
    RES_NEWLYMARRIAGE_APTNUM_POST_ERROR,
} from '../actions/pointSpecialNewlyMarriageAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postNewlyMarriagePointAptNum: reducerUtils.initial(),
};

export default function newlyMarriagePoint(state = initialState, action) {
    switch (action.type) {
        case RES_NEWLYMARRIAGE_APTNUM_POST:
        case RES_NEWLYMARRIAGE_APTNUM_POST_SUCCESS:
        case RES_NEWLYMARRIAGE_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_NEWLYMARRIAGE_APTNUM_POST,
                'postNewlyMarriagePointAptNum'
            )(state, action);
        default:
            return state;
    }
}
