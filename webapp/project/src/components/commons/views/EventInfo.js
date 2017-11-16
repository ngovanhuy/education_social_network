import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const EventInfo = ({event}) => {
    const {eventId, title, coverPhotoUrl, start, location} = event

    return(
        <div>
            <Link to={`/events/${eventId}`}>
                <span className="event-name">{title}</span>
            </Link>
        </div>
    )
}

export default EventInfo