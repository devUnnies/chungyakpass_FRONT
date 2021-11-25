import axios from 'axios';
import { patch, get } from './instance';

// 생애최초 국민 순위 api patch
export const patchFirstLifeKookminRank = (info) =>
    patch(`verification/special/kookmin/public/first-life/${info.id}`, {
        firstRankHistoryYn: info.firstRankHistoryYn,
        kookminType: info.firstLifeKookminType,
        ranking: info.firstLifeKookminRank,
        sibilingSupportYn: info.supportYn,
        taxOver5yearsYn: info.taxOver5yearsYn,
    });

//   생애최초 국민 순위 get
export const getFirstLifeKookminRank = () =>
    get(`verification/special/kookmin/public/first-life`);
