import axios from 'axios';
import { post } from './instance';

// 순위 결과 post
export const postGeneralRank = (info) =>
    post('verification/general/rank', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });
