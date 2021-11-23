import axios from 'axios';
import { patch } from './instance';

// 일반 국민 순위 api
export const patchGeneralKookminRank = (info) =>
    patch(
        `verification/general/kookmin/${info.verificationRecordGeneralKookminId}`,
        {
            supportYn: info.supportYn,
            lifeYn: info.lifeYn,
            generalKookminRank: info.generalKookminRank,
        }
    );
