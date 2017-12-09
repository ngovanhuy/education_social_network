import React, {Component} from 'react'
import {dateUtils} from "../../utils";
import UserProfileInfo from "../commons/views/UserProfileInfo";
import AnnouncementInfo from "../commons/views/AnnouncementInfo";

class Announcement extends Component {
    render() {
        const {announcementDetail} = this.props
        return (
            <div className="announcement-detail">
                <div className="announcement-detail-content">
                    <div className="announcement-info">
                        <div className="announcement-title">
                            <AnnouncementInfo announcement={announcementDetail}/>
                        </div>
                        <div className="announcement-time-user">
                            <span>{dateUtils.convertISOToLocaleString(announcementDetail.timeCreate)}</span>
                            <span role="presentation" aria-hidden="true" className="presentation"> · </span>
                            <UserProfileInfo user={announcementDetail.userCreate}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Announcement;