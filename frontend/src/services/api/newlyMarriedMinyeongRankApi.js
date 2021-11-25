import axios from 'axios';
import { get, patch } from './instance';

// 신혼부부 민영 순위 api
export const patchNewlyMarriedMinyeongRank = (info) =>
    patch(`verification/special/minyeong/newly-married/${info.id}`, {
        ranking: info.newlyMarriedMinyeongRank,
        sibilingSupportYn: info.supportYn,
    });

//   신혼부부 민영 순위 get
export const getNewlyMarriedMinyeongRank = () =>
    get(`verification/special/minyeong/newly-married`);
