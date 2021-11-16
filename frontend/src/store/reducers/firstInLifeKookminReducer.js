import {
    // 생애최초 국민 아파트 분양정보 보내기
    RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST,
    RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST_SUCCESS,
    RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST_ERROR,
} from '../actions/firstInLifeKookminAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postFirstInLifeKookminAptNum: reducerUtils.initial(),
};

export default function firstInLifeKookmin(state = initialState, action) {
    switch (action.type) {
        case RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST:
        case RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST_SUCCESS:
        case RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST,
                'postFirstInLifeKookminAptNum'
            )(state, action);
        default:
            return state;
    }
}
