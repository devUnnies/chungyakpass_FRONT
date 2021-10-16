import {
    // 노부모 민영 아파트 분양정보 보내기
    RES_OLDPARENT_MINYEONG_APTNUM_POST,
    RES_OLDPARENT_MINYEONG_APTNUM_POST_SUCCESS,
    RES_OLDPARENT_MINYEONG_APTNUM_POST_ERROR,
} from '../actions/oldParentMinyeongAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postOldParentMinyeongAptNum: reducerUtils.initial(),
};

export default function oldParentMinyeong(state = initialState, action) {
    switch (action.type) {
        case RES_OLDPARENT_MINYEONG_APTNUM_POST:
        case RES_OLDPARENT_MINYEONG_APTNUM_POST_SUCCESS:
        case RES_OLDPARENT_MINYEONG_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_OLDPARENT_MINYEONG_APTNUM_POST,
                'postOldParentMinyeongAptNum'
            )(state, action);
        default:
            return state;
    }
}
