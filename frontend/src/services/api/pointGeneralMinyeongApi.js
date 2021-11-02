import axios from 'axios';
import { post, get } from './instance';

// export const postGeneralMinyeongPoint = (info) =>
//     get('point/genereal/minyeoung', {
//         houseMemberId: info.houseMemberId,
//         parentsDeathYn: info.parentsDeathYn,
//         divorceYn: info.divorceYn,
//         sameResidentRegistrationYn: info.sameResidentRegistrationYn,
//         stayOverYn: info.stayOverYn,
//         nowStayOverYn: info.nowStayOverYn,
//     });

// 일반 민영 가점 api
export const postGeneralMinyeongPoint = (info) =>
    post('point/genereal/minyeoung', {
        houseMemberId: info.houseMemberId,
        parentsDeathYn: info.parentsDeathYn,
        divorceYn: info.divorceYn,
        sameResidentRegistrationYn: info.sameResidentRegistrationYn,
        stayOverYn: info.stayOverYn,
        nowStayOverYn: info.nowStayOverYn,
    });
