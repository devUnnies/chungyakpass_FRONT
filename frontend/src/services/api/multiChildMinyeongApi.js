import axios from 'axios';

// 일반 민영 api
//  - 일반 민영 로직 결과값 API
export const getMultiChildMinyeong = () => {
    // header 에 토큰이 필요하면 넣어야 함
    axios.get('verification/special/minyeong/multichild ', {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });
};
