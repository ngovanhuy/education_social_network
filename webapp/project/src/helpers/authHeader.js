export function authHeader() {
    // return authorization header with jwt token
    // let user = JSON.parse(localStorage.getItem('user'));
    //
    // if (user && user.token) {
    //     return {
    //         'Authorization': 'Bearer ' + user.token,
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json',
    //     };
    // } else {
    //     return {
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json',
    //     };
    // }

    return {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    };
}