import axios from 'axios';
import { get, patch } from './instance';

// 다자녀 민영 순위 api
export const patchMultiChildMinyeongRank = (info) =>
    patch(
        `verification/special/minyeong/multiChild/${info.verificationRecordSpecialMinyeongMultiChildId}`,
        {
            ranking: info.multiChildMinyeongRank,
            sibilingSupportYn: info.supportYn,
        }
    );

//  다자녀 민영 순위 get
export const getMultiChildMinyeongRank = () =>
    get(`verification/special/minyeong/multiChild`);
