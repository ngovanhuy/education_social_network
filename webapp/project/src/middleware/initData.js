import {authHeader} from "../helpers";
import {classConstants, DOMAIN_SERVICE, userConstants} from "../constants";
import {classService, userService} from "../services";
import axios from 'axios';
import {userUtils} from "../utils";

export const initData = {
    initAdmin,
    initDataClass,
    initDataUserStudent,
    initDataUserTeacher,
    initDataUserEnterClass,
}

function initAdmin() {
    var user = {
        username: 'admin',
        password: 'admin',
        email: 'ngovanhuy.cntt2@gmail.com',
        phone: '01634677923',
        birthday: '03-09-1995',
        gender: 1,
        about: 'Admin',
        location: 'VietNam',
        firstName: 'Admin',
        lastName: 'Admin',
        typeuser: 10
    }
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };
    const url = DOMAIN_SERVICE + '/users';
    return fetch(url, requestOptions).then(handleResponse);
}

async function initDataClass(adminId) {
    var classes = require('../initData/Class.json')
    let promises = [];
    if (classes && classes.length > 0) {
        const url = DOMAIN_SERVICE + '/groups/create/' + adminId;
        for (var i = 0; i < classes.length; i++) {
            var classInfo = {
                ...classes[i],
                typegroup: "0"
            }
            const requestOptions = {
                method: 'POST',
                headers: authHeader(),
                body: JSON.stringify(classInfo)
            };
            await new Promise(resolve => setTimeout(resolve, 100));
            promises.push(fetch(url, requestOptions));
        }
    }
    return Promise.all(promises).then(data => {
        console.log("Completed init class");
    });
}

async function initDataUserStudent() {
    var students = require('../initData/Student.json')
    const url = DOMAIN_SERVICE + '/users';
    let promises = [];
    if (students && students.length > 0) {
        for (var i = 0; i < students.length; i++) {
            var studentInfo = {
                ...students[i],
                typeuser: userConstants.TYPE_USER_IS_NORMAL
            }
            const requestOptions = {
                method: 'POST',
                headers: authHeader(),
                body: JSON.stringify(studentInfo)
            };
            await new Promise(resolve => setTimeout(resolve, 100));
            promises.push(fetch(url, requestOptions));
        }
    }
    return Promise.all(promises).then(data => {
        console.log("Completed init student");
    });
}

async function initDataUserTeacher() {
    var teachers = require('../initData/Teacher.json')
    let promises = [];
    const url = DOMAIN_SERVICE + '/users';
    if (teachers && teachers.length > 0) {
        for (var i = 0; i < teachers.length; i++) {
            var teacherInfo = {
                ...teachers[i],
                typeuser: userConstants.TYPE_USER_IS_TEACHER,
                firstName: userUtils.getFirstName(teachers[i].lastName),
                lastName: userUtils.getLastName(teachers[i].lastName)
            }
            const requestOptions = {
                method: 'POST',
                headers: authHeader(),
                body: JSON.stringify(teacherInfo)
            };
            await new Promise(resolve => setTimeout(resolve, 100));
            promises.push(fetch(url, requestOptions));
        }
    }
    return Promise.all(promises).then(data => {
        console.log("Completed init teacher");
    });
}

async function initDataUserEnterClass() {
    var classes = [], users = []
    classService.getAll()
        .then(
            response => {
                classes = response.data;
                insertUserEnterClass(classes, users)
            }
        );
    userService.getAll()
        .then(
            response => {
                users = response.data;
                insertUserEnterClass(classes, users)
            }
        );

}

async function insertUserEnterClass(classes, users) {
    if(classes && classes.length > 0 &&
        users && users.length > 0){
        users = users.filter(function(user) {
            return user.isTeacher == false
        })
        const numberUserInAClass = Math.floor(users.length / classes.length)
        let promises = [];
        for (var i = 0; i < classes.length; i ++){
            var index = i * numberUserInAClass
            const requestOptions = {
                method: 'POST',
                headers: authHeader(),
                body: JSON.stringify({
                    typeMember: classConstants.MEMBER_TYPE_IS_MEMBER
                })
            };
            if(i == classes.length - 1){
                var usersInAClass = users.slice(index)
                // console.log(usersInAClass)
                for(var j = 0; j < usersInAClass.length; j++){
                    const url = DOMAIN_SERVICE + '/groups/members/' + classes[i].id + "/" + usersInAClass[j].id;
                    await new Promise(resolve => setTimeout(resolve, 100));
                    promises.push(fetch(url, requestOptions));
                }
            } else {
                var usersInAClass = users.slice(index, index + numberUserInAClass)
                // console.log(usersInAClass)
                for(var j = 0; j < usersInAClass.length; j++){
                    const url = DOMAIN_SERVICE + '/groups/members/' + classes[i].id + "/" + usersInAClass[j].id;
                    await new Promise(resolve => setTimeout(resolve, 100));
                    promises.push(fetch(url, requestOptions));
                }
            }
        }
        return Promise.all(promises).then(data => {
            console.log("Completed init user enter class");
        });
    }
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}