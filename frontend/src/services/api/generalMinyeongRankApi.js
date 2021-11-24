import axios from 'axios';
import { get, patch } from './instance';

// 일반 민영 순위 api
export const patchGeneralMinyeongRank = (info) =>
    patch(`verification/general/minyeong/${info.id}`, {
        sibilingSupportYn: info.supportYn,
        ranking: info.generalMinyeongRank,
    });

//   일반 민영 순위 get
export const getGeneralMinyeongRank = () =>
    get(`verification/general/minyeong`);
