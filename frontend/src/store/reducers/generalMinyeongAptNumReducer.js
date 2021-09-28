import {
    RES_GENERAL_MINYEONG_APTNUM_POST,
    RES_GENERAL_MINYEONG_APTNUM_POST_SUCCESS,
    RES_GENERAL_MINYEONG_APTNUM_POST_ERROR,
} from '../actions/generalMinyeongAptNumAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postGeneralMinyeongAptNum: reducerUtils.initial(),
};

export default function generalMinyeongAptNum(state = initialState, action) {
    switch (action.type) {
        case RES_GENERAL_MINYEONG_APTNUM_POST:
        case RES_GENERAL_MINYEONG_APTNUM_POST_SUCCESS:
        case RES_GENERAL_MINYEONG_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_GENERAL_MINYEONG_APTNUM_POST,
                'postGeneralMinyeongAptNum'
            )(state, action);
        default:
            return state;
    }
}
