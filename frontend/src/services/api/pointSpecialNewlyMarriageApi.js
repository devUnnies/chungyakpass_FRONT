import axios from 'axios';
import { get, post } from './instance';

// 신혼부부 가점 api
// 아파트 공고번호, 주택형 보내기
export const postNewlyMarriagePointAptNum = (info) =>
    post('point/special/newMarried', {
        notificationNumber: info.notificationNumber,
    });

export const getNewlyMarriagePoint = () =>
    get('point/special/newlyMarried', {});
