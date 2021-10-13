import {
    // 국민 아파트 분양정보 불러오기
    RES_GENERAL_KOOKMIN_APTNUM_POST,
    RES_GENERAL_KOOKMIN_APTNUM_POST_SUCCESS,
    RES_GENERAL_KOOKMIN_APTNUM_POST_ERROR,
} from '../actions/generalKookminAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postGeneralKookminAptNum: reducerUtils.initial(),
};

export default function generalKookmin(state = initialState, action) {
    switch (action.type) {
        case RES_GENERAL_KOOKMIN_APTNUM_POST:
        case RES_GENERAL_KOOKMIN_APTNUM_POST_SUCCESS:
        case RES_GENERAL_KOOKMIN_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_GENERAL_KOOKMIN_APTNUM_POST,
                'postGeneralKookminAptNum'
            )(state, action);
        default:
            return state;
    }
}
