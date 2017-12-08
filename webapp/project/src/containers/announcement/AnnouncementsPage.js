import React, {Component} from 'react'
import {connect} from 'react-redux'
import Announcement from "../../components/announcement/Announcement";
import {announcementActions} from "../../actions";
import '../../components/announcement/announcement.css'

class AnnouncementsPage extends Component{
    componentWillMount() {
        this.props.dispatch(announcementActions.getAll());
    }

    render(){
        const {announcements} = this.props
        return(
            <div className="container">
                <h1>Announcements</h1>
                <div className="announcements-page clearfix">
                    {
                        (announcements && announcements.length > 0) ?
                            (
                                announcements.map((announcementDetail, index) =>
                                <Announcement announcementDetail={announcementDetail}/>)
                            ) : ''
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