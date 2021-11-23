import axios from 'axios';
import { post } from './instance';

// 노부모 국민 api
//아파트 공고번호, 주택형 보내기
export const postOldParentKookminAptNum = (info) =>
    post('verification/special/kookmin/public/oldParent', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });
