import { combineReducers } from 'redux';
import auth from './authReducer';
import token from './tokenReducer';
const rootReducer = combineReducers({
    auth,
    token,
});

export default rootReducer;
