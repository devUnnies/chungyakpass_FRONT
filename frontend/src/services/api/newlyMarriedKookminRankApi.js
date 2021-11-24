import axios from 'axios';
import { get, patch } from './instance';

// 신혼부부 국민 순위 api
export const patchNewlyMarriedKookminRank = (info) =>
    patch(`verification/special/kookmin/newly-married/${info.id}`, {
        kookminType: info.newlyMarriedKookminType,
        ranking: info.newlyMarriedKookminRank,
        sibilingSupportYn: info.supportYn,
    });

// 신혼부부 국민 순위 get(공특법 적용, 미적용 둘 다)
export const getNewlyMarriedKookminRank = () =>
    get(`verification/special/kookmin/newly-married`);
