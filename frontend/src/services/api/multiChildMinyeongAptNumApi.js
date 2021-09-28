import axios from 'axios';

//아파트 공고번호, 주택형 보내기
export const postMultiChildMinyeongAptNum = (info) =>
    axios.post('verification/special/minyeong/multichild', info, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });
