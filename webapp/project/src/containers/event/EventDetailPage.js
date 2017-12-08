import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../../components/class/class.css'
import EventLeftmenu from "../../components/event/EventLeftmenu";
import EventTopContent from "../../components/event/EventTopContent";
import UserProfileInfo from "../../components/commons/views/UserProfileInfo";
import {classActions, eventActions} from "../../actions";
import {fileUtils, userUtils} from "../../utils";
import {defaultConstants} from "../../constants";
import PageNotFound from "../../components/commons/PageNotFound";

class EventDetailPage extends Component {
    componentWillMount() {
        const {eventId} = this.props;
        this.props.dispatch(eventActions.getById(eventId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.eventId !== this.props.eventId) {
            const {eventId} = nextProps;
            this.props.dispatch(eventActions.getById(eventId));
        }
    }

    render() {
        const {eventDetail, eventId, error} = this.props
        return (
            <div className="container">
                {
                    (eventDetail.id || !error) ?
                        <div>
                            <div className="col-sm-2">
                                <div className="row">
                                    <EventLeftmenu currentPage="eventDetail" eventDetailTitle={eventDetail.title}/>
                                </div>
                            </div>
                            <div className="col-sm-7 event-main-content">
                                <EventTopContent eventDetail={eventDetail}/>
                                <div className="ui-box has-border-radius event-description clearfix">
                                    <div className="ui-box-title">
                                        <span>Details</span>
                                    </div>
                                    <div className="ui-box-content">
                                        {eventDetail.content}
                                    </div>
                                </div>
                                {
                                    eventDetail.userCreate ?
                                        (
                                            <div className="ui-box has-border-radius event-about-user clearfix">
                                                <div className="ui-box-title">
                                                    <span>About {userUtils.renderFullName(eventDetail.userCreate.firstName, eventDetail.userCreate.lastName)}</span>
                                                </div>
                                                <div className="ui-box-content clearfix">
                                                    <div className="user-profile-picture img-circle">
                                                        <img className="img-circle"
                                                             src={eventDetail.userCreate && fileUtils.renderFileSource(eventDetail.userCreate.profileImageID, userUtils.renderSourceProfilePictureDefault(eventDetail.userCreate.gender))}/>
                                                    </div>
                                                    <div className="user-detail">
                                                        <UserProfileInfo user={eventDetail.userCreate}/>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : ''
                                }

                            </div>
                        </div>
                        : <PageNotFound/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.eventId
    const {eventDetail, error} = state.events
    return {
        eventId,
        eventDetail,
        error
    }
}

export default withRouter(connect(mapStateToProps, null)(EventDetailPage));