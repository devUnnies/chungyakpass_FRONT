import axios from 'axios';
import { patch } from './instance';

// 신혼부부 민영 순위 api
export const patchNewlyMarriedMinyeongRank = (info) =>
    patch(
        `verification/special/minyeong/newlyMarried/${info.verificationRecordSpecialMinyeongNewlyMarriedId}`,
        {
            newlyMarriedMinyeongRank: info.newlyMarriedMinyeongRank,
            supportYn: info.supportYn,
        }
    );
