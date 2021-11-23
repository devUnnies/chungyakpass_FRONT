import axios from 'axios';
import { patch } from './instance';

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
