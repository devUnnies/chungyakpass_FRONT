import {
    // 노부모 민영 아파트 분양정보 보내기
    RES_FIRSTINLIFE_MINYOENG_APTNUM_POST,
    RES_FIRSTINLIFE_MINYOENG_APTNUM_POST_SUCCESS,
    RES_FIRSTINLIFE_MINYOENG_APTNUM_POST_ERROR,
} from '../actions/firstInLifeMinyeongAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postFirstInLifeMinyeongAptNum: reducerUtils.initial(),
};

export default function firstInLifeMinyeong(state = initialState, action) {
    switch (action.type) {
        case RES_FIRSTINLIFE_MINYOENG_APTNUM_POST:
        case RES_FIRSTINLIFE_MINYOENG_APTNUM_POST_SUCCESS:
        case RES_FIRSTINLIFE_MINYOENG_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_FIRSTINLIFE_MINYOENG_APTNUM_POST,
                'postFirstInLifeMinyeongAptNum'
            )(state, action);
        default:
            return state;
    }
}
