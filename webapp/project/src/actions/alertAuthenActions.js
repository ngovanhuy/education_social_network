import { alertAuthenConstants } from '../constants';

export const alertAuthenActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertAuthenConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertAuthenConstants.ERROR, message };
}

function clear() {
    return { type: alertAuthenConstants.CLEAR };
}