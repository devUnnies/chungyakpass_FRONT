import axios from 'axios';

//아파트 공고번호, 주택형 보내기
export const postGeneralMinyeongAptNum = (info) =>
    axios.post('verification/general/minyeong', info, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });
