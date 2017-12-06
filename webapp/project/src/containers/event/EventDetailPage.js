import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../../components/class/class.css'
import EventLeftmenu from "../../components/event/EventLeftmenu";
import EventTopContent from "../../components/event/EventTopContent";
import UserProfileInfo from "../../components/commons/views/UserProfileInfo";

class EventDetailPage extends Component {

    render() {
        const {eventDetail, eventId} = this.props
        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <EventLeftmenu currentPage="eventDetail" eventDetailTitle={eventDetail.title}/>
                        </div>
                    </div>
                    <div className="col-sm-7 event-main-content">
                        <EventTopContent eventDetail={eventDetail}/>
                        <div className="ui-box event-description clearfix">
                            <div className="ui-box-title">
                                <span>Details</span>
                            </div>
                            <div className="ui-box-content">
                                {eventDetail.description}
                            </div>
                        </div>
                        {
                            eventDetail.from.user ?
                                (
                                    <div className="ui-box event-about-user clearfix">
                                        <div className="ui-box-title">
                                            <span>About {eventDetail.from.user.firstName} {eventDetail.from.user.lastName}</span>
                                        </div>
                                        <div className="ui-box-content clearfix">
                                            <div className="user-profile-picture">
                                                <img src={eventDetail.from.user.profilePictureUrl}/>
                                            </div>
                                            <div className="user-detail">
                                                <UserProfileInfo user={eventDetail.from.user}/>
                                            </div>
                                        </div>
                                    </div>
                                ) : ''
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id
    
    return {
        eventId
    }
}

export default withRouter(connect(mapStateToProps, null)(EventDetailPage));