import axios from 'axios';
import { post } from './instance';

// 신혼부부 국민 공특법 적용 api
//아파트 공고번호, 주택형 보내기
export const postNewlyMarriedKookminSpecialAptNum = (info) =>
    post('verification/special/kookmin/public/newlyMarried', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });
