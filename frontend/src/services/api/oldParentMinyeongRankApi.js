import axios from 'axios';
import { patch } from './instance';

// 노부모 민영 순위 api
export const patchOldParentMinyeongRank = (info) =>
    patch(
        `verification/special/minyeong/oldParent/${info.verificationRecordSpecialMinyeongMultiChildId}`,
        {
            oldParentMinyeongRank: info.oldParentMinyeongRank,
            supportYn: info.supportYn,
        }
    );
