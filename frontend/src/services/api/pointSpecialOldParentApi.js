import axios from 'axios';
import { post, get } from './instance';

// 노부모 가점 api
export const postSpecialOldParentPoint = (info) =>
    post('point/special/oldParentsSupport', {});

// 노부모 가점 순위 api
export const getOldParentPoint = () =>
    get('point/special/oldParentsSupport', {});
