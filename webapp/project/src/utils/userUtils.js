import {userConstants} from "../constants/userConstants";

export const userUtils = {
    checkIsTeacher
}

function checkIsTeacher(user) {
    if(user && user.typeuser && user.typeuser.enum_id == userConstants.TYPE_USER_IS_TEACHER){
        return true;
    }
    return false;
}