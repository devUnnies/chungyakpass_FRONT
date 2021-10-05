import axios from 'axios';

// 일반 민영 api
//  - 일반 민영 로직 결과값 API
export const getGeneralMinyeong = (data) => {
    // header 에 토큰이 필요하면 넣어야 함
    axios.get('verification/general/minyeong', {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credential': true,
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        },
    });
};

//아파트 공고번호, 주택형 보내기
export const postGeneralMinyeongAptNum = (info) =>
    axios.post('verification/general/minyeong', info, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });
