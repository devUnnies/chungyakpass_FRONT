import {
    // 노부모 국민 아파트 분양정보 보내기
    RES_OLDPARENT_KOOKMIN_APTNUM_POST,
    RES_OLDPARENT_KOOKMIN_APTNUM_POST_SUCCESS,
    RES_OLDPARENT_KOOKMIN_APTNUM_POST_ERROR,
} from '../actions/oldParentKookminAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postOldParentKookminAptNum: reducerUtils.initial(),
};

export default function oldParentKookmin(state = initialState, action) {
    switch (action.type) {
        case RES_OLDPARENT_KOOKMIN_APTNUM_POST:
        case RES_OLDPARENT_KOOKMIN_APTNUM_POST_SUCCESS:
        case RES_OLDPARENT_KOOKMIN_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_OLDPARENT_KOOKMIN_APTNUM_POST,
                'postOldParentKookminAptNum'
            )(state, action);
        default:
            return state;
    }
}
