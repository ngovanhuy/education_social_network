import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const ClassProfileInfo = ({classDetail}) => {
    const {id, name} = classDetail

    return(
        <span className="class-profile-info">
            <Link to={`/classes/${id}`}>
                <span className="class-full-name">{name}</span>
            </Link>
        </span>
    )
}

export default ClassProfileInfo