import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import UserProfileInfo from "../../commons/views/UserProfileInfo";
import {dateUtils} from "../../../utils";
import Announcement from "../../announcement/Announcement";

class HomeNotificationsNewest extends Component{
    renderAnnouncement = (announcementDetail, index) => {
        return(
            <div key={index} className="announcement-detail">
                <div className="announcement-title">
                    <b>{announcementDetail.title}</b>
                </div>
                <div className="announcement-time-user">
                    <span>{dateUtils.convertISOToLocaleDateString(announcementDetail.timeCreate)}</span>
                    <span role="presentation" aria-hidden="true"> · </span>
                    <UserProfileInfo user={announcementDetail.userCreate}/>
                </div>
            </div>
        )
    }
    render(){
        const {announcements} = this.props
        return(
            <div className="home-announcements">
                <div className="ui-box has-border-radius">
                    <div className="ui-box-title">
                        <span>Notifications newest</span>
                        <Link to={`/announcements`} className="pull-right">See all</Link>
                    </div>
                    <div className="ui-box-content">
                        {
                            (announcements && announcements.length > 0) ?
                                (
                                    announcements.map((announcementDetail, index) =>
                                        <Announcement announcementDetail={announcementDetail}/>)
                                ) : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeNotificationsNewest;