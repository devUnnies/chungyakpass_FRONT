import axios from 'axios';
import { patch } from './instance';

// 신혼부부 국민 순위 api
export const patchNewlyMarriedKookminRank = (info) =>
    patch(
        `verification/special/kookmin/newlyMarried/${info.verificationRecordSpecialKookminNewlyMarriedId}`,
        {
            newlyMarriedKookminType: info.newlyMarriedKookminType,
            newlyMarriedKookminRank: info.newlyMarriedKookminRank,
            supportYn: info.supportYn,
        }
    );
