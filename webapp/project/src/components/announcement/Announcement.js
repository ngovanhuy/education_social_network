import React, {Component} from 'react'
import {dateUtils} from "../../utils";
import UserProfileInfo from "../commons/views/UserProfileInfo";

class Announcement extends Component {
    render() {
        const {announcementDetail} = this.props
        return (
            <div key={announcementDetail.id} className="announcement-detail">
                <div className="announcement-detail-content">
                    <div className="announcement-title">
                        <span>{announcementDetail.title}</span>
                    </div>
                    <div className="announcement-time-user">
                        <span>{dateUtils.convertISOToLocaleDateString(announcementDetail.timeCreate)}</span>
                        <span role="presentation" aria-hidden="true"> · </span>
                        <UserProfileInfo user={announcementDetail.userCreate}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Announcement;