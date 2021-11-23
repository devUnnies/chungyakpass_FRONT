import axios from 'axios';
import { patch } from './instance';

// 신혼부부 국민 순위 api
export const patchNewlyMarriedKookminSpecialRank = (info) =>
    patch(
        `verification/special/kookmin/public/newlyMarried/${info.verificationRecordSpecialKookminNewlyMarriedId}`,
        {
            preNewMarriedYn: info.preNewMarriedYn,
            kookminType: info.newlyMarriedKookminSpecialType,
            ranking: info.newlyMarriedKookminSpecialRank,
            sibilingSupportYn: info.supportYn,
        }
    );
