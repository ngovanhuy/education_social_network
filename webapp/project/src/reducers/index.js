import {combineReducers} from 'redux';

import {authentication} from './authenticationReducer';
import {registration} from './registrationReducer';
import {alertAuthen} from './alertAuthenReducer';
import {classes} from './classReducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    alertAuthen,
    classes,
});

export default rootReducer;