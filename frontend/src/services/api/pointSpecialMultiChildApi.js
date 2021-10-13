import axios from 'axios';
import { post } from './instance';

// 다자녀 가점 api
//아파트 공고번호, 주택형 보내기
export const postMultiChildPointAptNum = (info) =>
    post('point/special/multiChild', {
        notificationNumber: info.notificationNumber,
    });
