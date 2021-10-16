import {
    ADD_HOUSE_POST,
    ADD_HOUSE_POST_SUCCESS,
    ADD_HOUSE_POST_ERROR,
    MOD_HOUSE_PUT,
    MOD_HOUSE_PUT_SUCCESS,
    MOD_HOUSE_PUT_ERROR,
    DEL_HOUSE_DELETE,
    DEL_HOUSE_DELETE_SUCCESS,
    DEL_HOUSE_DELETE_ERROR,
    ADD_BANKBOOK_POST,
    ADD_BANKBOOK_POST_SUCCESS,
    ADD_BANKBOOK_POST_ERROR,
    MOD_BANKBOOK_PUT,
    MOD_BANKBOOK_PUT_SUCCESS,
    MOD_BANKBOOK_PUT_ERROR,
    DEL_BANKBOOK_DELETE,
    DEL_BANKBOOK_DELETE_SUCCESS,
    DEL_BANKBOOK_DELETE_ERROR,
    ADD_MEMBER_POST,
    ADD_MEMBER_POST_SUCCESS,
    ADD_MEMBER_POST_ERROR,
    HOUSE_HOLDER_PATCH,
    HOUSE_HOLDER_PATCH_SUCCESS,
    HOUSE_HOLDER_PATCH_ERROR,
    MOD_MEMBER_PUT,
    MOD_MEMBER_PUT_SUCCESS,
    MOD_MEMBER_PUT_ERROR,
    DEL_MEMBER_DELETE,
    DEL_MEMBER_DELETE_SUCCESS,
    DEL_MEMBER_DELETE_ERROR,
    ADD_CHUNGYAK_POST,
    ADD_CHUNGYAK_POST_SUCCESS,
    ADD_CHUNGYAK_POST_ERROR,
    ADD_CHUNGYAK_RESTR_POST,
    ADD_CHUNGYAK_RESTR_POST_SUCCESS,
    ADD_CHUNGYAK_RESTR_POST_ERROR,
    ADD_ASSETS_POST,
    ADD_ASSETS_POST_SUCCESS,
    ADD_ASSETS_POST_ERROR,
    MOD_ASSETS_PUT,
    MOD_ASSETS_PUT_SUCCESS,
    MOD_ASSETS_PUT_ERROR,
    MOD_CHUNGYAK_PUT,
    MOD_CHUNGYAK_PUT_SUCCESS,
    MOD_CHUNGYAK_PUT_ERROR,
    MOD_CHUNGYAK_RESTR_PUT,
    MOD_CHUNGYAK_RESTR_PUT_SUCCESS,
    MOD_CHUNGYAK_RESTR_PUT_ERROR,
} from '../actions/commonInfoAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    addHouse: reducerUtils.initial(),
    modHouse: reducerUtils.initial(),
    delHouse: reducerUtils.initial(),
    addBank: reducerUtils.initial(),
    modBank: reducerUtils.initial(),
    delBank: reducerUtils.initial(),
    addMem: reducerUtils.initial(),
    modMem: reducerUtils.initial(),
    delMem: reducerUtils.initial(),
    patHolder: reducerUtils.initial(),
    addAssets: reducerUtils.initial(),
    modAssets: reducerUtils.initial(),
    addChungyak: reducerUtils.initial(),
    modChungyak: reducerUtils.initial(),
    addRestriction: reducerUtils.initial(),
    modRestriction: reducerUtils.initial(),
};

export default function commonInfo(state = initialState, action) {
    switch (action.type) {
        case ADD_HOUSE_POST:
        case ADD_HOUSE_POST_SUCCESS:
        case ADD_HOUSE_POST_ERROR:
            return handleAsyncActions(ADD_HOUSE_POST, 'addHouse')(
                state,
                action
            );
        case MOD_HOUSE_PUT:
        case MOD_HOUSE_PUT_SUCCESS:
        case MOD_HOUSE_PUT_ERROR:
            return handleAsyncActions(MOD_HOUSE_PUT, 'modHouse')(state, action);
        case DEL_HOUSE_DELETE:
        case DEL_HOUSE_DELETE_SUCCESS:
        case DEL_HOUSE_DELETE_ERROR:
            return handleAsyncActions(DEL_HOUSE_DELETE, 'delHouse')(
                state,
                action
            );
        case ADD_BANKBOOK_POST:
        case ADD_BANKBOOK_POST_SUCCESS:
        case ADD_BANKBOOK_POST_ERROR:
            return handleAsyncActions(ADD_BANKBOOK_POST, 'addBank')(
                state,
                action
            );
        case MOD_BANKBOOK_PUT:
        case MOD_BANKBOOK_PUT_SUCCESS:
        case MOD_BANKBOOK_PUT_ERROR:
            return handleAsyncActions(MOD_BANKBOOK_PUT, 'modBank')(
                state,
                action
            );
        case DEL_BANKBOOK_DELETE:
        case DEL_BANKBOOK_DELETE_SUCCESS:
        case DEL_BANKBOOK_DELETE_ERROR:
            return handleAsyncActions(DEL_BANKBOOK_DELETE, 'delBank')(
                state,
                action
            );
        case ADD_MEMBER_POST:
        case ADD_MEMBER_POST_SUCCESS:
        case ADD_MEMBER_POST_ERROR:
            return handleAsyncActions(ADD_MEMBER_POST, 'addMem')(state, action);
        case MOD_MEMBER_PUT:
        case MOD_MEMBER_PUT_SUCCESS:
        case MOD_MEMBER_PUT_ERROR:
            return handleAsyncActions(MOD_MEMBER_PUT, 'modMem')(state, action);
        case DEL_MEMBER_DELETE:
        case DEL_MEMBER_DELETE_SUCCESS:
        case DEL_MEMBER_DELETE_ERROR:
            return handleAsyncActions(DEL_MEMBER_DELETE, 'delMem')(
                state,
                action
            );
        case HOUSE_HOLDER_PATCH:
        case HOUSE_HOLDER_PATCH_SUCCESS:
        case HOUSE_HOLDER_PATCH_ERROR:
            return handleAsyncActions(HOUSE_HOLDER_PATCH, 'patHolder')(
                state,
                action
            );
        case ADD_ASSETS_POST:
        case ADD_ASSETS_POST_SUCCESS:
        case ADD_ASSETS_POST_ERROR:
            return handleAsyncActions(ADD_ASSETS_POST, 'addAssets')(
                state,
                action
            );
        case MOD_ASSETS_PUT:
        case MOD_ASSETS_PUT_SUCCESS:
        case MOD_ASSETS_PUT_ERROR:
            return handleAsyncActions(MOD_ASSETS_PUT, 'modAssets')(
                state,
                action
            );
        case ADD_CHUNGYAK_POST:
        case ADD_CHUNGYAK_POST_SUCCESS:
        case ADD_CHUNGYAK_POST_ERROR:
            return handleAsyncActions(ADD_CHUNGYAK_POST, 'addChungyak')(
                state,
                action
            );
        case MOD_CHUNGYAK_PUT:
        case MOD_CHUNGYAK_PUT_SUCCESS:
        case MOD_CHUNGYAK_PUT_ERROR:
            return handleAsyncActions(MOD_CHUNGYAK_PUT, 'modChungyak')(
                state,
                action
            );
        case ADD_CHUNGYAK_RESTR_POST:
        case ADD_CHUNGYAK_RESTR_POST_SUCCESS:
        case ADD_CHUNGYAK_RESTR_POST_ERROR:
            return handleAsyncActions(
                ADD_CHUNGYAK_RESTR_POST,
                'addRestriction'
            )(state, action);
        case MOD_CHUNGYAK_RESTR_PUT:
        case MOD_CHUNGYAK_RESTR_PUT_SUCCESS:
        case MOD_CHUNGYAK_RESTR_PUT_ERROR:
            return handleAsyncActions(MOD_CHUNGYAK_RESTR_PUT, 'modRestriction')(
                state,
                action
            );
        default:
            return state;
    }
}
