import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const EventInfo = ({event}) => {
    const {id, title, coverPhotoUrl, start, location} = event

    return(
        <div>
            <Link to={`/events/${id}`}>
                <span className="event-name">{title}</span>
            </Link>
        </div>
    )
}

export default EventInfo