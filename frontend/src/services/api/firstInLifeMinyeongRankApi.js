import axios from 'axios';
import { patch } from './instance';

// 생애최초 민영 순위 api
export const patchFirstLifeMinyeongRank = (info) =>
    patch(
        `verification/special/minyeong/firstLife/${info.verificationRecordSpecialMinyeongFirstLifeId}`,
        {
            firstRankHistoryYn: info.firstRankHistoryYn,
            firstLifeMinyeongRank: info.firstLifeMinyeongRank,
            supportYn: info.supportYn,
            taxOver5yearsYn: info.taxOver5yearsYn,
        }
    );
