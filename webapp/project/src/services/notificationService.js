import {DOMAIN_FB_SERVICE, DOMAIN_SERVICE, FB_APP_ID, FB_APP_SECRET} from "../constants";
import axios from "axios/index";
import {authHeader} from "../helpers";

export const notificationService = {
    createNotificationToFacebook,
    getAppAccessTokenFacebook,
}

function createNotificationToFacebook(fbUserId, fbAppAccessToken, fbNotification) {
    const url = DOMAIN_FB_SERVICE + `/${fbUserId}/notifications?template=${fbNotification.template}`
    const data = new FormData();
    data.append("access_token", fbAppAccessToken)
    return axios.post(url, data);
}

function getAppAccessTokenFacebook() {
    const url = DOMAIN_FB_SERVICE + `/oauth/access_token?client_id=${FB_APP_ID}&client_secret=${FB_APP_SECRET}&grant_type=client_credentials`
    return axios.get(url)
        .then(
            response => {
                if(response){
                    localStorage.setItem('fbAppAccessToken', JSON.stringify(response.data.access_token));
                    return response
                }
            }
        );
}