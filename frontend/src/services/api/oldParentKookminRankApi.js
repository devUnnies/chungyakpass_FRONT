import axios from 'axios';
import { get, patch } from './instance';

// 노부모 국민 순위 api
export const patchOldParentKookminRank = (info) =>
    patch(
        `verification/special/kookmin/public/oldParent/${info.verificationRecordSpecialKookminMultiChildId}`,
        {
            oldParentKookminType: info.oldParentKookminType,
            oldParentKookminRank: info.oldParentKookminRank,
            supportYn: info.supportYn,
        }
    );

//   노부모 국민 순위 get
export const getOldParentKookminRank = () =>
    get(`verification/special/kookmin/public/oldParent`);
