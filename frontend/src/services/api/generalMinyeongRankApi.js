import axios from 'axios';
import { patch } from './instance';

// 일반 민영 순위 api
export const patchGeneralMinyeongRank = (info) =>
    patch(
        `verification/general/minyeong/${info.verificationRecordGeneralMinyeongId}`,
        {
            supportYn: info.supportYn,
            generalMinyeongRank: info.generalMinyeongRank,
        }
    );
