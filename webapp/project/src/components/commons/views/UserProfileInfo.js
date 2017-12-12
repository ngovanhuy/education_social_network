import React from 'react'
import {Link} from 'react-router-dom'

const UserProfileInfo = ({user}) => {
    if(user){
        var {id, firstName, lastName} = user
        return(
            <span className="user-profile-info">
                <Link to={`/users/${id}`}>
                    <span className="user-fullname">{firstName} {lastName}</span>
                </Link>
            </span>
        )
    }
    return <div></div>;
}

export default UserProfileInfo