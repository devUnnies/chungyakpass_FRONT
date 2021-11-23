import axios from 'axios';
import { patch } from './instance';

// 생애최초 국민 순위 api
export const patchFirstLifeKookminRank = (info) =>
    patch(
        `verification/special/kookmin/public/firstLife/${info.verificationRecordSpecialKookminFirstLifeId}`,
        {
            firstRankHistoryYn: info.firstRankHistoryYn,
            firstLifeKookminType: info.firstLifeKookminType,
            firstLifeKookminRank: info.firstLifeKookminRank,
            supportYn: info.supportYn,
            taxOver5yearsYn: info.taxOver5yearsYn,
        }
    );
