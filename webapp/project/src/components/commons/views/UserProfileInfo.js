import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const UserProfileInfo = ({user}) => {
    if(user){
        var {id, firstName, lastName} = user
        return(
            <div className="user-profile-info">
                <Link to={`/users/${id}`} className="black-none-under">
                    <span className="user-fullname">{firstName} {lastName}</span>
                </Link>
            </div>
        )
    }
    return <div></div>;
}

export default UserProfileInfo