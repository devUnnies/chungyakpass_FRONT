import {
    ADD_HOUSE_HOLDER_POST,
    ADD_HOUSE_HOLDER_POST_SUCCESS,
    ADD_HOUSE_HOLDER_POST_ERROR,
} from '../actions/commonInfoAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    addHouseHolder: reducerUtils.initial(),
};

export default function commonInfo(state = initialState, action) {
    switch (action.type) {
        case ADD_HOUSE_HOLDER_POST:
        case ADD_HOUSE_HOLDER_POST_SUCCESS:
        case ADD_HOUSE_HOLDER_POST_ERROR:
            return handleAsyncActions(ADD_HOUSE_HOLDER_POST, 'addHouseHolder')(
                state,
                action
            );
        default:
            return state;
    }
}
