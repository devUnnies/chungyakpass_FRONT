import axios from 'axios';
import { post } from './instance';

// 생애최초 민영 api
//아파트 공고번호, 주택형 보내기
export const postFirstInLifeMinyeongAptNum = (info) =>
    post('verification/special/minyeong/first-life', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });
