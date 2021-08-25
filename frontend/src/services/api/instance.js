import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://3.37.166.82:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
