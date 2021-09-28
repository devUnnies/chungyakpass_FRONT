import {
    RES_MULTICHILD_MINYEONG_APTNUM_POST,
    RES_MULTICHILD_MINYEONG_APTNUM_POST_SUCCESS,
    RES_MULTICHILD_MINYEONG_APTNUM_POST_ERROR,
} from '../actions/multiChildMinyeongAptNumAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postMultiChildMinyeongAptNum: reducerUtils.initial(),
};

export default function multiChildMinyeongAptNum(state = initialState, action) {
    switch (action.type) {
        case RES_MULTICHILD_MINYEONG_APTNUM_POST:
        case RES_MULTICHILD_MINYEONG_APTNUM_POST_SUCCESS:
        case RES_MULTICHILD_MINYEONG_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_MINYEONG_APTNUM_POST,
                'postMultiChildMinyeongAptNum'
            )(state, action);
        default:
            return state;
    }
}
