import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const UserProfileInfo = ({user}) => {
    const {id, firstName, lastName} = user
    return(
        <div className="user-profile-info">
            <Link to={`/users/${id}`} className="black-none-under">
                <span className="user-fullname">{firstName} {lastName}</span>
            </Link>
        </div>
    )
}

UserProfileInfo.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        // userName: PropTypes.string.isRequired,
        // fullName: PropTypes.string.isRequired,
        // profilePictureUrl: PropTypes.string.isRequired,
        // coverPhotoUrl: PropTypes.string.isRequired,
    }).isRequired
}

export default UserProfileInfo