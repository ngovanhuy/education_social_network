import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import UserProfileInfo from "../../commons/views/UserProfileInfo";
import {dateUtils} from "../../../utils";
import Announcement from "../../announcement/Announcement";
import AnnouncementInfo from "../../commons/views/AnnouncementInfo";

class HomeAnnouncementsNewest extends Component{
    render(){
        const {announcements} = this.props
        return(
            <div className="home-announcements">
                <div className="ui-box has-border-radius">
                    <div className="ui-box-title">
                        <span>Notifications newest</span>
                        {
                            announcements && announcements.length > 0 &&
                            <Link to={`/announcements`} className="pull-right">See all</Link>
                        }
                    </div>
                    <div className="ui-box-content">
                        {
                            (announcements && announcements.length > 0) ?
                                (
                                    announcements.map((announcementDetail, index) =>
                                        <Announcement key={index} announcementDetail={announcementDetail}/>)
                                ) :
                                <div className="no-announcements">No announcements</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeAnnouncementsNewest;