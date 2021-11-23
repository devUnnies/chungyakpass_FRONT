import axios from 'axios';
import { patch, get } from './instance';

// 생애최초 민영 순위 api
export const patchFirstLifeMinyeongRank = (info) =>
    patch(
        `verification/special/minyeong/firstLife/${info.verificationRecordSpecialMinyeongFirstLifeId}`,
        {
            firstRankHistoryYn: info.firstRankHistoryYn,
            ranking: info.firstLifeMinyeongRank,
            sibilingSupportYn: info.supportYn,
            taxOver5yearsYn: info.taxOver5yearsYn,
        }
    );

//   생애최초 국민 순위 get
export const getFirstLifeMinyeongRank = () =>
    get(`verification/special/minyeong/firstLife`);
