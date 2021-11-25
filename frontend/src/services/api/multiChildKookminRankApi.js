import axios from 'axios';
import { get, patch } from './instance';

// 다자녀 국민 순위 api
export const patchMultiChildKookminRank = (info) =>
    patch(`verification/special/kookmin/public/multi-child/${info.id}`, {
        kookminType: info.multiChildType,
        ranking: info.multiChildKookminRank,
        sibilingSupportYn: info.supportYn,
    });

//  다자녀 국민 순위 get
export const getMultiChildKookminRank = () =>
    get(`verification/special/kookmin/public/multi-child`);
