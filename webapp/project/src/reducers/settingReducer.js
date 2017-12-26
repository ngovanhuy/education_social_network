import {settingConstants} from "../constants";

export function settings(state = {loading: false}, action) {
    switch (action.type) {
        case settingConstants.LOGIN_FACEBOOK_SUCCESS:
            return {
                ...state,
                fbAccount: action.responseFacebook
            };
        case settingConstants.GET_FB_APP_ACCESS_TOKEN:
            return {
                ...state,
                fbAppAccessToken: action.response.access_token
            }
        default:
            return state
    }
}