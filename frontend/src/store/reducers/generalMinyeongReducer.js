import {
    RES_GENERAL_MINYEONG_GET,
    RES_GENERAL_MINYEONG_GET_SUCCESS,
    RES_GENERAL_MINYEONG_GET_ERROR,
} from '../actions/generalMinyeongAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    getGeneralMinyeong: reducerUtils.initial(),
};

export default function generalMinyeong(state = initialState, action) {
    switch (action.type) {
        case RES_GENERAL_MINYEONG_GET:
        case RES_GENERAL_MINYEONG_GET_SUCCESS:
        case RES_GENERAL_MINYEONG_GET_ERROR:
            return handleAsyncActions(
                RES_GENERAL_MINYEONG_GET,
                'getGeneralMinyeong'
            )(state, action);
        default:
            return state;
    }
}
