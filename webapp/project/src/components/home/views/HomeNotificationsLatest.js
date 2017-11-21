import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import UserProfileInfo from "../../commons/views/UserProfileInfo";

class HomeNotificationsLatest extends Component{
    renderNotification = (notificationDetail, index) => {
        return(
            <div key={index} className="notification-detail">
                <div className="notification-title">
                    <span>{notificationDetail.title}</span>
                </div>
                <div className="notification-time-user">
                    <span>{notificationDetail.createTime.toLocaleDateString()}</span>
                    <span role="presentation" aria-hidden="true"> · </span>
                    <UserProfileInfo user={notificationDetail.from.user}/>
                </div>
            </div>
        )
    }
    render(){
        const {notifcationsLatest} = this.props
        return(
            <div className="home-notifications">
                <div className="ui-box">
                    <div className="ui-box-title">
                        <span>Notifications latest</span>
                    </div>
                    <div className="ui-box-content">
                        {
                            (notifcationsLatest && notifcationsLatest.length > 0) ?
                                (
                                    notifcationsLatest.map((notificationDetail, index) => this.renderNotification(notificationDetail, index))
                                ) : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeNotificationsLatest;