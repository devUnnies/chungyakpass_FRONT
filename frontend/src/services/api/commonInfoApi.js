import { post, put, del, patch } from './instance';

//공통정보입력 API
//  - 세대등록 API
export const addHouse = (info) => post('user/house', info);

//  - 세대수정 API
export const modHouse = (info) => put(`user/house/${0}`, info);

//  - 세대삭제 API
export const delHouse = (houseId) => del(`user/house/${houseId}`);

// ----------------------------------------------------------------------------

//  - 통장정보등록 API
export const addBankBook = (info) => post('user/bankbook', info);

//  - 통장정보수정 API
export const modBankBook = (info) =>
    put(`user/bankbook/${info.bankBookId}`, {
        bank: info.bank,
        bankbook: info.bankbook,
        joinDate: info.joinDate,
        deposit: info.deposit,
        paymentsCount: info.paymentsCount,
        validYn: info.validYn,
    });

//  - 통장정보삭제 API
export const delBankBook = (bankBookId) => del(`user/bankbook/${bankBookId}`);

// ----------------------------------------------------------------------------

//  - 세대구성원등록 API
export const addMember = (info) => post('user/house/member', info);

//  - 세대구성원수정 API
export const modMember = (info) =>
    put(`user/house/member/${info.memberId}`, {
        relation: info.relationship,
        name: info.name,
        birthDay: info.birthDate,
        foreignerYn: info.foreignerYn,
        soldierYn: info.soldierYn,
        marriageDate: info.marriageDate,
        homelessStartDate: info.homelessStartDate,
        transferDate: info.transferDate,
        income: info.income,
    });

//  - 세대구성원삭제 API
export const delMember = (memberId) => del(`user/house/member/${memberId}`);

// ----------------------------------------------------------------------------

//  - 세대주 지정 API
export const patchHolder = (info) =>
    patch(`user/house/holder/${info.houseId}`, info.memberId);

// ----------------------------------------------------------------------------

//  - 세대구성원자산등록 API
export const addAssets = (info) => post(`user/house/member/property`, info);

//  - 세대구성원자산수정 API

//  - 세대구성원자산삭제 API

// ----------------------------------------------------------------------------

//  - 세대구성원청약신청이력등록 API
