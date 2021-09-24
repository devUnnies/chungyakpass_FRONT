import axios from 'axios';

// 일반 민영 api
//  - 일반 민영 로직 결과값 API
export const getNormalPrivate = (info) => {
    axios.get('general/minyeoung', info, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });
};
