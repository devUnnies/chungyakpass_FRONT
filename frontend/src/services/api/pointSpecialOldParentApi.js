import axios from 'axios';
import { post, get } from './instance';

export const getSpecialOldParentPoint = (info) =>
    get('', {
        houseMemberId: info.houseMemberId,
    });

// 노부모 가점 api
export const postSpecialOldParentPoint = (info) =>
    post('point/special/oldParentsSupport', {
        houseMemberId: info.houseMemberId,
        parentsDeathYn: info.parentsDeathYn,
        divorceYn: info.divorceYn,
        sameResidentRegistrationYn: info.sameResidentRegistrationYn,
        stayOverYn: info.stayOverYn,
        nowStayOverYn: info.nowStayOverYn,
    });
