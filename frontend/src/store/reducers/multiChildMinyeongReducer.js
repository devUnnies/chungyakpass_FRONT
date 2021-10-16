import {
    // 다자녀 민영 아파트 분양정보 보내기
    RES_MULTICHILD_MINYEONG_APTNUM_POST,
    RES_MULTICHILD_MINYEONG_APTNUM_POST_SUCCESS,
    RES_MULTICHILD_MINYEONG_APTNUM_POST_ERROR,

    // 다자녀 민영 로직 불러오기
    // RES_MULTICHILD_MINYEONG_GET,
    // RES_MULTICHILD_MINYEONG_GET_SUCCESS,
    // RES_MULTICHILD_MINYEONG_GET_ERROR,
} from '../actions/multiChildMinyeongAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    // getMultiChildMinyeong: reducerUtils.initial(),
    postMultiChildMinyeongAptNum: reducerUtils.initial(),
};

export default function multiChildMinyeong(state = initialState, action) {
    switch (action.type) {
        // case RES_MULTICHILD_MINYEONG_GET:
        // case RES_MULTICHILD_MINYEONG_GET_SUCCESS:
        // case RES_MULTICHILD_MINYEONG_GET_ERROR:
        //     return handleAsyncActions(
        //         RES_MULTICHILD_MINYEONG_GET,
        //         'getMultiChildMinyeong'
        //     )(state, action);
        case RES_MULTICHILD_MINYEONG_APTNUM_POST:
        case RES_MULTICHILD_MINYEONG_APTNUM_POST_SUCCESS:
        case RES_MULTICHILD_MINYEONG_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_MINYEONG_APTNUM_POST,
                'postMultiChildMinyeongAptNum'
            )(state, action);
        default:
            return state;
    }
}
