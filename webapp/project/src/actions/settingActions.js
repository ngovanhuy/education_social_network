import {settingConstants} from "../constants";
import {notificationService} from "../services";

export const settingActions = {
    loginFacebook,
    getFbAppAccessToken,
};

function loginFacebook(responseFacebook) {
    return dispatch => {
        localStorage.setItem('fbAccount', JSON.stringify(responseFacebook));
        dispatch(success(responseFacebook));
    };

    function success(responseFacebook) { return { type: settingConstants.LOGIN_FACEBOOK_SUCCESS, responseFacebook } }
}

function getFbAppAccessToken() {
    return dispatch => {
        notificationService.getAppAccessTokenFacebook()
            .then(
                response => dispatch(success(response.data))
            )

    };

    function success(response) { return { type: settingConstants.GET_FB_APP_ACCESS_TOKEN, response } }
}