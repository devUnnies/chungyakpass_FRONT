import {
    // 다자녀 국민 아파트 분양정보 post
    RES_MULTICHILD_KOOKMIN_APTNUM_POST,
    RES_MULTICHILD_KOOKMIN_APTNUM_POST_SUCCESS,
    RES_MULTICHILD_KOOKMIN_APTNUM_POST_ERROR,
} from '../actions/multiChildKookminAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postMultiChildKookminAptNum: reducerUtils.initial(),
};

export default function multiChildKookmin(state = initialState, action) {
    switch (action.type) {
        case RES_MULTICHILD_KOOKMIN_APTNUM_POST:
        case RES_MULTICHILD_KOOKMIN_APTNUM_POST_SUCCESS:
        case RES_MULTICHILD_KOOKMIN_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_KOOKMIN_APTNUM_POST,
                'postMultiChildKookminAptNum'
            )(state, action);
        default:
            return state;
    }
}
