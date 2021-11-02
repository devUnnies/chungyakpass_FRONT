import axios from 'axios';
import { post } from './instance';

// 생애최초 국민 api
//아파트 공고번호, 주택형 보내기
export const postFirstInLifeKookminAptNum = (info) =>
    post('verification/special/public/firstLife', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });
