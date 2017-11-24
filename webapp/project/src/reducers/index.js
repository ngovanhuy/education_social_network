import {combineReducers} from 'redux';

import {authentication} from './authenticationReducer';
import {registration} from './registrationReducer';
import {users} from './usersReducer';
import {alertAuthen} from './alertAuthenReducer';
import {classes} from './classReducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alertAuthen,
    classes,
});

export default rootReducer;