import React, {Component} from 'react'
import {connect} from 'react-redux'
import Announcement from "../../components/announcement/Announcement";
import {announcementActions} from "../../actions";
import '../../components/announcement/announcement.css'

class AnnouncementsPage extends Component {
    componentWillMount() {
        this.props.dispatch(announcementActions.getAll());
    }

    render() {
        var {announcements} = this.props

        announcements = (announcements && announcements.length > 0) ? announcements.sort(function (a, b) {
            return new Date(b.timeCreate) - new Date(a.timeCreate);
        }) : [];
        return (
            <div className="announcements-page clearfix">
                <div className="announcements-main">
                    <h1 className="title">Announcements</h1>
                    {
                        (announcements && announcements.length > 0) ?
                            (
                                announcements.map((announcementDetail, index) =>
                                    <Announcement key={index} announcementDetail={announcementDetail}/>)
                            ) :
                            <div className="no-announcement">No announcements</div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const announcements = state.announcements.items
    return {
        announcements
    }
}

export default connect(mapStateToProps)(AnnouncementsPage);