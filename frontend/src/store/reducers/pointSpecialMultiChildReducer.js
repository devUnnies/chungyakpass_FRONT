import {
    // 다자녀 아파트 분양정보 post
    RES_MULTICHILD_APTNUM_POST,
    RES_MULTICHILD_APTNUM_POST_SUCCESS,
    RES_MULTICHILD_APTNUM_POST_ERROR,
} from '../actions/pointSpecialMultiChildAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postMultiChildAptNum: reducerUtils.initial(),
};

export default function multiChildPoint(state = initialState, action) {
    switch (action.type) {
        case RES_MULTICHILD_APTNUM_POST:
        case RES_MULTICHILD_APTNUM_POST_SUCCESS:
        case RES_MULTICHILD_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_APTNUM_POST,
                'postMultiChildAptNum'
            )(state, action);
        default:
            return state;
    }
}
