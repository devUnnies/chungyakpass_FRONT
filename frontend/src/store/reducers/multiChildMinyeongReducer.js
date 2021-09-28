import {
    RES_MULTICHILD_MINYEONG_GET,
    RES_MULTICHILD_MINYEONG_GET_SUCCESS,
    RES_MULTICHILD_MINYEONG_GET_ERROR,
} from '../actions/multiChildMinyeongAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    getMultiChildMinyeong: reducerUtils.initial(),
};

export default function multiChildMinyeong(state = initialState, action) {
    switch (action.type) {
        case RES_MULTICHILD_MINYEONG_GET:
        case RES_MULTICHILD_MINYEONG_GET_SUCCESS:
        case RES_MULTICHILD_MINYEONG_GET_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_MINYEONG_GET,
                'getMultiChildMinyeong'
            )(state, action);
        default:
            return state;
    }
}
