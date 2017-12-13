import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Announcement from "../../announcement/Announcement";

class HomeAnnouncementsNewest extends Component {
    render() {
        const {announcements} = this.props
        return (
            <div className="home-announcements">
                <div className="ui-box has-border-radius">
                    <div className="ui-box-title">
                        <span>Announcements newest</span>
                        <Link to={`/announcements`} className="pull-right">See all</Link>
                    </div>
                    <div className="ui-box-content">
                        {
                            (announcements && announcements.length > 0) ?
                                (
                                    announcements.map((announcementDetail, index) =>
                                        <Announcement key={index} announcementDetail={announcementDetail}/>)
                                ) :
                                <div className="no-announcements">No announcements newest</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeAnnouncementsNewest;