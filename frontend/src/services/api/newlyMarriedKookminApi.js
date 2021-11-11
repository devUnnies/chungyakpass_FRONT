import axios from 'axios';
import { post } from './instance';

// 신혼부부 국민 api
//아파트 공고번호, 주택형 보내기
export const postNewlyMarriedKookminAptNum = (info) =>
    post('verification/special/kookmin/newlymarried', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });
