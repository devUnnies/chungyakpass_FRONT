import axios from 'axios';
import { post } from './instance';

// 신혼부부 민영 api
// 아파트 공고번호, 주택형 보내기
export const postNewlyMarriedMinyeongAptNum = (info) =>
    post('verification/special/minyeong/newlymarried', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
        exceptionHouseTf: info.exceptionHouseTf,
    });
