import {
    // 노부모 정보 post
    RES_SPECIAL_OLDPARENT_POST,
    RES_SPECIAL_OLDPARENT_POST_SUCCESS,
    RES_SPECIAL_OLDPARENT_POST_ERROR,
} from '../actions/pointSpecialOldParentAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postSpecialOldParentPoint: reducerUtils.initial(),
};

export default function oldParentPoint(state = initialState, action) {
    switch (action.type) {
        case RES_SPECIAL_OLDPARENT_POST:
        case RES_SPECIAL_OLDPARENT_POST_SUCCESS:
        case RES_SPECIAL_OLDPARENT_POST_ERROR:
            return handleAsyncActions(
                RES_SPECIAL_OLDPARENT_POST,
                'postSpecialOldParentPoint'
            )(state, action);
        default:
            return state;
    }
}
