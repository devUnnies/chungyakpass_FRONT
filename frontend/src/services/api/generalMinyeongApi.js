import axios from 'axios';
import { post } from './instance';

// 일반 민영 api
//  - 일반 민영 로직 결과값 API
// export const getGeneralMinyeong = () => {
//     get('verification/general/minyeong');
// };

//아파트 공고번호, 주택형 보내기
export const postGeneralMinyeongAptNum = (info) =>
    post('verification/general/minyeong', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });
