import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { users } from './usersReducer';
import { alertAuthen } from './alertAuthenReducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alertAuthen
});

export default rootReducer;