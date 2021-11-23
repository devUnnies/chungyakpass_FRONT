import axios from 'axios';
import { patch, get } from './instance';

// 일반 국민 순위 api
export const patchGeneralKookminRank = (info) =>
    patch(
        `verification/general/kookmin/${info.verificationRecordGeneralKookminId}`,
        {
            sibilingSupportYn: info.supportYn,
            twentiesSoleHouseHolderYn: info.lifeYn,
            ranking: info.generalKookminRank,
        }
    );

//   일반 국민 순위 get
export const getGeneralKookminRank = () => get(`verification/general/kookmin`);
