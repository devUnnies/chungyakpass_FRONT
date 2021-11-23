import axios from 'axios';
import { post } from './instance';

// 노부모 민영 api
//아파트 공고번호, 주택형 보내기
export const postOldParentMinyeongAptNum = (info) =>
    post('verification/special/minyeong/oldParent', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });
