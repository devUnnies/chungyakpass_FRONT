import axios from 'axios';

// 다자녀 민영 api

// 아파트 공고번호, 주택형 보내기
export const postMultiChildMinyeongAptNum = (info) =>
    axios.post('/verification/special/minyeong/multichild', info, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });

// 다자녀 민영 로직 결과값 API
export const getMultiChildMinyeong = () => {
    // header 에 토큰이 필요하면 넣어야 함
    axios.get('/verification/special/minyeong/multichild ', {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });
};
