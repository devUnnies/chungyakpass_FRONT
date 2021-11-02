import {
    // 한부모 아파트 분양정보 post
    RES_ONEPARENT_APTNUM_POST,
    RES_ONEPARENT_APTNUM_POST_SUCCESS,
    RES_ONEPARENT_APTNUM_POST_ERROR,
} from '../actions/pointSpecialOneParentAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postOneParentPointAptNum: reducerUtils.initial(),
};

export default function oneParentPoint(state = initialState, action) {
    switch (action.type) {
        case RES_ONEPARENT_APTNUM_POST:
        case RES_ONEPARENT_APTNUM_POST_SUCCESS:
        case RES_ONEPARENT_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_ONEPARENT_APTNUM_POST,
                'postOneParentPointAptNum'
            )(state, action);
        default:
            return state;
    }
}
