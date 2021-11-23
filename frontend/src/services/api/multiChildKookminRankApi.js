import axios from 'axios';
import { patch } from './instance';

// 다자녀 국민 순위 api
export const patchMultiChildKookminRank = (info) =>
    patch(
        `verification/special/kookmin/public/multiChild/${info.verificationRecordSpecialMinyeongMultiChildId}`,
        {
            multiChildKookminType: info.multiChildType,
            multiChildKookminRank: info.multiChildKookminRank,
            supportYn: info.supportYn,
        }
    );
