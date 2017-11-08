import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const renderIntro = (intro, index) => {
    var iconName = "";
    if (intro.type == "education") {
        iconName = "fa fa-graduation-cap";
    } else if (intro.type == "home_place") {
        iconName = "fa fa-home";
    }
    return <li key={index}>
        <i className={iconName}></i><span className="message">{intro.message}</span>
    </li>
}

const IntroProfiles = ({user}) => {
    const {fullName, intros} = user

    return (
        <div className="intros">
            <h2 className="user-fullname">{user.fullName}</h2>
            <ul className="list-intro">
                {
                    user.intros ? (
                        user.intros.map((intro, index) => renderIntro(intro, index))
                    ) : ''
                }
            </ul>
        </div>
    )
}

IntroProfiles.propTypes = {
    user: PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        intros: PropTypes.array,
    }).isRequired
}

export default IntroProfiles