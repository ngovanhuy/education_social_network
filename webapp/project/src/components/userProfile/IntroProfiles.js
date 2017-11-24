import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

// const renderIntro = (intro, index) => {
//     var iconName = "";
//     if (intro.type == "education") {
//         iconName = "fa fa-graduation-cap";
//     } else if (intro.type == "home_place") {
//         iconName = "fa fa-home";
//     }
//     return <li key={index}>
//         <i className={iconName}></i><span className="message">{intro.message}</span>
//     </li>
// }

const renderInfo = (infoLabel, infoValue) => {
    if(infoValue){
        return(
            <li>
                <span className="message">{infoLabel}: {infoValue}</span>
            </li>
        )
    }
    return;
}

const IntroProfiles = ({user}) => {
    return (
        <div className="intros">
            <h2 className="user-fullname">{user.firstName} {user.lastName}</h2>
            <ul className="list-intro">
                {/*{*/}
                    {/*user.intros ? (*/}
                        {/*user.intros.map((intro, index) => renderIntro(intro, index))*/}
                    {/*) : ''*/}
                {/*}*/}
                {
                    renderInfo("About", user.about)
                }
                {
                    renderInfo("Quote", user.quote)
                }
                {
                    renderInfo("Location", user.location)
                }
                {
                    renderInfo("Birthday", user.birthday)
                }
            </ul>
        </div>
    )
}

export default IntroProfiles