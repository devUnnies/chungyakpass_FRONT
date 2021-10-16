import axios from 'axios';
import { post } from './instance';

// 다자녀 민영 api
//아파트 공고번호, 주택형 보내기
export const postMultiChildKookminAptNum = (info) =>
    post('verification/special/kookmin/public/multichild', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });
