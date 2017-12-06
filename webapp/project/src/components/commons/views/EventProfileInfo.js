import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const EventProfileInfo = ({event}) => {
    const {id, title, coverPhotoUrl, start, location} = event

    return(
        <span className="event-profile-info">
            <Link to={`/events/${id}`} className="black-none-under">
                <span className="event-name">{title}</span>
            </Link>
        </span>
    )
}

export default EventProfileInfo