import { alertAuthenConstants } from '../constants';

export function alertAuthen(state = {}, action) {
  switch (action.type) {
    case alertAuthenConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertAuthenConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertAuthenConstants.CLEAR:
      return {};
    default:
      return state
  }
}