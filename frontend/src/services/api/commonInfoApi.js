import axios from 'axios';

//공통정보입력 API
//  - 세대등록 API
export const addHouseHolder = (info) => {
    axios.post('user/house', info, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });
};
