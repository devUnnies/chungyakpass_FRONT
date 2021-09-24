import {
    RES_NORMAL_PRIVATE_GET,
    RES_NORMAL_PRIVATE_GET_SUCCESS,
    RES_NORMAL_PRIVATE_GET_ERROR,
} from '../actions/normalPrivateAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    getNormalPrivate: reducerUtils.initial(),
};

export default function normalPrivate(state = initialState, action) {
    switch (action.type) {
        case RES_NORMAL_PRIVATE_GET:
        case RES_NORMAL_PRIVATE_GET_SUCCESS:
        case RES_NORMAL_PRIVATE_GET_ERROR:
            return handleAsyncActions(
                RES_NORMAL_PRIVATE_GET,
                'getNormalPrivate'
            )(state, action);
        default:
            return state;
    }
}
