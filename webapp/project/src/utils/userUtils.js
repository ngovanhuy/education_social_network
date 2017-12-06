import {userConstants} from "../constants/userConstants";

export const userUtils = {
    checkIsTeacher,
    renderFullName,
}

function checkIsTeacher(user) {
    if(user && user.typeuser && user.typeuser.enum_id == userConstants.TYPE_USER_IS_TEACHER){
        return true;
    }
    return false;
}

function renderFullName(firstName, lastName) {
    return firstName + " " + lastName;
}