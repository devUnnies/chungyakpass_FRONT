import axios from 'axios';
import { post } from './instance';

// 일반 민영 가점 api
export const postGeneralMinyeongAptNum = (info) =>
    post('point/genereal/minyeoung', {
        houseMemberId: info.houseMemberId,
        parentsDeathYn: info.parentsDeathYn,
        divorceYn: info.divorceYn,
        sameResidentRegistrationYn: info.sameResidentRegistrationYn,
        stayOverYn: info.stayOverYn,
        nowStayOverYn: info.nowStayOverYn,
    });
