import axios from 'axios';
import { patch } from './instance';

// 다자녀 민영 순위 api
export const patchMultiChildMinyeongRank = (info) =>
    patch(
        `verification/special/minyeong/multiChild/${info.verificationRecordSpecialMinyeongMultiChildId}`,
        {
            multiChildMinyeongRank: info.multiChildMinyeongRank,
            supportYn: info.supportYn,
        }
    );
