import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const EventProfileInfo = ({event}) => {
    const {id, title} = event

    return(
        <span className="event-profile-info">
            <Link to={`/events/${id}`}>
                <span className="event-name">{title}</span>
            </Link>
        </span>
    )
}

export default EventProfileInfo