import {
    // 일반 민영 정보 post
    RES_GENERAL_MINYEONG_POST,
    RES_GENERAL_MINYEONG_POST_SUCCESS,
    RES_GENERAL_MINYEONG_POST_ERROR,
} from '../actions/pointGeneralMinyeongAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postGeneralMinyeongPoint: reducerUtils.initial(),
};

export default function generalMinyeongPoint(state = initialState, action) {
    switch (action.type) {
        case RES_GENERAL_MINYEONG_POST:
        case RES_GENERAL_MINYEONG_POST_SUCCESS:
        case RES_GENERAL_MINYEONG_POST_ERROR:
            return handleAsyncActions(
                RES_GENERAL_MINYEONG_POST,
                'postGeneralMinyeongPoint'
            )(state, action);
        default:
            return state;
    }
}
