import * as commonInfoApi from '../../services/api/commonInfoApi'; // commonInfoApi 안의 함수 모두 불러오기
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
//세대 조회
export const HOUSE_GET = 'HOUSE_GET';
export const HOUSE_GET_SUCCESS = 'HOUSE_GET_SUCCESS';
export const HOUSE_GET_ERROR = 'HOUSE_GET_ERROR';
//세대 저장
export const ADD_HOUSE_POST = 'ADD_HOUSE_POST';
export const ADD_HOUSE_POST_SUCCESS = 'ADD_HOUSE_POST_SUCCESS';
export const ADD_HOUSE_POST_ERROR = 'ADD_HOUSE_POST_ERROR';
//세대 수정
export const MOD_HOUSE_PUT = 'MOD_HOUSE_PUT';
export const MOD_HOUSE_PUT_SUCCESS = 'MOD_HOUSE_PUT_SUCCESS';
export const MOD_HOUSE_PUT_ERROR = 'MOD_HOUSE_PUT_ERROR';
//세대 삭제
export const DEL_HOUSE_DELETE = 'DEL_HOUSE_DELETE';
export const DEL_HOUSE_DELETE_SUCCESS = 'DEL_HOUSE_DELETE_SUCCESS';
export const DEL_HOUSE_DELETE_ERROR = 'DEL_HOUSE_DELETE_ERROR';

//청약통장 저장
export const ADD_BANKBOOK_POST = 'ADD_BANKBOOK_POST';
export const ADD_BANKBOOK_POST_SUCCESS = 'ADD_BANKBOOK_POST_SUCCESS';
export const ADD_BANKBOOK_POST_ERROR = 'ADD_BANKBOOK_POST_ERROR';
//청약통장 수정
export const MOD_BANKBOOK_PUT = 'MOD_BANKBOOK_PUT';
export const MOD_BANKBOOK_PUT_SUCCESS = 'MOD_BANKBOOK_PUT_SUCCESS';
export const MOD_BANKBOOK_PUT_ERROR = 'MOD_BANKBOOK_PUT_ERROR';
//청약통장 삭제
export const DEL_BANKBOOK_DELETE = 'DEL_BANKBOOK_DELETE';
export const DEL_BANKBOOK_DELETE_SUCCESS = 'DEL_BANKBOOK_DELETE_SUCCESS';
export const DEL_BANKBOOK_DELETE_ERROR = 'DEL_BANKBOOK_DELETE_ERROR';

//세대구성원 조회
export const MEMBER_GET = 'MEMBER_GET';
export const MEMBER_GET_SUCCESS = 'MEMBER_GET_SUCCESS';
export const MEMBER_GET_ERROR = 'MEMBER_GET_ERROR';

//세대구성원 저장
export const ADD_MEMBER_POST = 'ADD_MEMBER_POST';
export const ADD_MEMBER_POST_SUCCESS = 'ADD_MEMBER_POST_SUCCESS';
export const ADD_MEMBER_POST_ERROR = 'ADD_MEMBER_POST_ERROR';
//세대구성원 수정
export const MOD_MEMBER_PUT = 'MOD_MEMBER_PUT';
export const MOD_MEMBER_PUT_SUCCESS = 'MOD_MEMBER_PUT_SUCCESS';
export const MOD_MEMBER_PUT_ERROR = 'MOD_MEMBER_PUT_ERROR';
//세대구성원 삭제
export const DEL_MEMBER_DELETE = 'DEL_MEMBER_DELETE';
export const DEL_MEMBER_DELETE_SUCCESS = 'DEL_MEMBER_DELETE_SUCCESS';
export const DEL_MEMBER_DELETE_ERROR = 'DEL_MEMBER_DELETE_ERROR';
//저장 후 리덕스에서 삭제
export const ADD_MEMBER_DELETE = 'ADD_MEMBER_DELETE';

//세대주 지정
export const HOUSE_HOLDER_PATCH = 'HOUSE_HOLDER_PATCH';
export const HOUSE_HOLDER_PATCH_SUCCESS = 'HOUSE_HOLDER_PATCH_SUCCESS';
export const HOUSE_HOLDER_PATCH_ERROR = 'HOUSE_HOLDER_PATCH_ERROR';

//자산 저장
export const ADD_ASSETS_POST = 'ADD_ASSETS_POST';
export const ADD_ASSETS_POST_SUCCESS = 'ADD_ASSETS_POST_SUCCESS';
export const ADD_ASSETS_POST_ERROR = 'ADD_ASSETS_POST_ERROR';
//자산 수정
export const MOD_ASSETS_PUT = 'MOD_ASSETS_PUT';
export const MOD_ASSETS_PUT_SUCCESS = 'MOD_ASSETS_PUT_SUCCESS';
export const MOD_ASSETS_PUT_ERROR = 'MOD_ASSETS_PUT_ERROR';

//무주택시작일 수정
export const HOMELESS_START_DATE_PATCH = 'HOMELESS_START_DATE_PATCH';
export const HOMELESS_START_DATE_PATCH_SUCCESS =
    'HOMELESS_START_DATE_PATCH_SUCCESS';
export const HOMELESS_START_DATE_PATCH_ERROR =
    'HOMELESS_START_DATE_PATCH_ERROR';

// 청약당첨이력 저장
export const ADD_CHUNGYAK_POST = 'ADD_CHUNGYAK_POST';
export const ADD_CHUNGYAK_POST_SUCCESS = 'ADD_CHUNGYAK_POST_SUCCESS';
export const ADD_CHUNGYAK_POST_ERROR = 'ADD_CHUNGYAK_POST_ERROR';
// 청약신청이력 수정
export const MOD_CHUNGYAK_PUT = 'MOD_CHUNGYAK_PUT';
export const MOD_CHUNGYAK_PUT_SUCCESS = 'MOD_CHUNGYAK_PUT_SUCCESS';
export const MOD_CHUNGYAK_PUT_ERROR = 'MOD_CHUNGYAK_PUT_ERROR';

// 청약제한사항 저장
export const ADD_CHUNGYAK_RESTR_POST = 'ADD_CHUNGYAK_RESTR_POST';
export const ADD_CHUNGYAK_RESTR_POST_SUCCESS =
    'ADD_CHUNGYAK_RESTR_POST_SUCCESS';
export const ADD_CHUNGYAK_RESTR_POST_ERROR = 'ADD_CHUNGYAK_RESTR_POST_ERROR';
// 청약제한사항 수정
export const MOD_CHUNGYAK_RESTR_PUT = 'MOD_CHUNGYAK_RESTR_PUT';
export const MOD_CHUNGYAK_RESTR_PUT_SUCCESS = 'MOD_CHUNGYAK_RESTR_PUT_SUCCESS';
export const MOD_CHUNGYAK_RESTR_PUT_ERROR = 'MOD_CHUNGYAK_RESTR_PUT_ERROR';

/* Action Creator */
export const getHouse = createPromiseThunk(HOUSE_GET, commonInfoApi.getHouse);

export const addHouse = createPromiseThunk(
    ADD_HOUSE_POST,
    commonInfoApi.addHouse
);

export const modHouse = createPromiseThunk(
    MOD_HOUSE_PUT,
    commonInfoApi.modHouse
);

export const delHouse = createPromiseThunk(
    DEL_HOUSE_DELETE,
    commonInfoApi.delHouse
);

export const addBank = createPromiseThunk(
    ADD_BANKBOOK_POST,
    commonInfoApi.addBankBook
);

export const modBank = createPromiseThunk(
    MOD_BANKBOOK_PUT,
    commonInfoApi.modBankBook
);

export const delBank = createPromiseThunk(
    DEL_BANKBOOK_DELETE,
    commonInfoApi.delBankBook
);

export const getMem = createPromiseThunk(MEMBER_GET, commonInfoApi.getMember);

export const addMem = createPromiseThunk(
    ADD_MEMBER_POST,
    commonInfoApi.addMember
);

export const addMemDel = () => ({ type: ADD_MEMBER_DELETE });

export const modMem = createPromiseThunk(
    MOD_MEMBER_PUT,
    commonInfoApi.modMember
);

export const delMem = createPromiseThunk(
    DEL_MEMBER_DELETE,
    commonInfoApi.delMember
);

export const patHolder = createPromiseThunk(
    HOUSE_HOLDER_PATCH,
    commonInfoApi.patchHolder
);

export const addAsse = createPromiseThunk(
    ADD_ASSETS_POST,
    commonInfoApi.addAssets
);

export const modAsse = createPromiseThunk(
    MOD_ASSETS_PUT,
    commonInfoApi.modAssets
);

export const patStart = createPromiseThunk(
    HOMELESS_START_DATE_PATCH,
    commonInfoApi.patchStartDate
);

export const addChung = createPromiseThunk(
    ADD_CHUNGYAK_POST,
    commonInfoApi.addChungyak
);

export const modChung = createPromiseThunk(
    MOD_CHUNGYAK_PUT,
    commonInfoApi.modChungyak
);

export const addRestr = createPromiseThunk(
    ADD_CHUNGYAK_RESTR_POST,
    commonInfoApi.addRestriction
);

export const modRestr = createPromiseThunk(
    MOD_CHUNGYAK_RESTR_PUT,
    commonInfoApi.modRestriction
);
