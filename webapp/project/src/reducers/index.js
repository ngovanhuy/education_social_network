import {combineReducers} from 'redux';

import {authentication} from './authenticationReducer';
import {registration} from './registrationReducer';
import {alertAuthen} from './alertAuthenReducer';
import {classes} from './classReducer';
import {events} from './eventReducer';
import {users} from './userReducer';
import {announcements} from './announcementReducer';
import {settings} from './settingReducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    alertAuthen,
    classes,
    events,
    users,
    announcements,
    settings
});

export default rootReducer;