import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const AnnouncementInfo = ({announcement}) => {
    const {id, title} = announcement

    return(
        <span className="announcement-info">
            <Link to={`/announcements/${id}`}>
                <span className="announcement-title">{title}</span>
            </Link>
        </span>
    )
}

export default AnnouncementInfo