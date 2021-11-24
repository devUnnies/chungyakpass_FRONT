import axios from 'axios';
import { post, get } from './instance';

// 일반 민영 가점 api
export const postGeneralMinyeongPoint = (info) =>
    post('point/genereal/minyeoung', {});

// 일반 민영 가점 순위 api
export const getGeneralMinyeongPoint = () =>
    get('point/genereal/minyeoung', {});
