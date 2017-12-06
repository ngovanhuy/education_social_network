import {combineReducers} from 'redux';

import {authentication} from './authenticationReducer';
import {registration} from './registrationReducer';
import {alertAuthen} from './alertAuthenReducer';
import {classes} from './classReducer';
import {events} from './eventReducer';
import {users} from './userReducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    alertAuthen,
    classes,
    events,
    users,
});

export default rootReducer;