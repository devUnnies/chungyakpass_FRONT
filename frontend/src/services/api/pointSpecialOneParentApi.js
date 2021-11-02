import axios from 'axios';
import { post } from './instance';

// 한부모 가점 api
// 아파트 공고번호, 주택형 보내기
export const postOneParentPointAptNum = (info) =>
    post('point/special/singleParents', {
        notificationNumber: info.notificationNumber,
    });
