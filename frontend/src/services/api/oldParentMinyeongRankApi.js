import axios from 'axios';
import { get, patch } from './instance';

// 노부모 민영 순위 api
export const patchOldParentMinyeongRank = (info) =>
    patch(
        `verification/special/minyeong/oldParent/${info.verificationRecordSpecialMinyeongMultiChildId}`,
        {
            oldParentMinyeongRank: info.oldParentMinyeongRank,
            supportYn: info.supportYn,
        }
    );

//   노부모 민영 순위 get
export const getOldParentMinyeongRank = () =>
    get(`verification/special/minyeong/oldParent`);