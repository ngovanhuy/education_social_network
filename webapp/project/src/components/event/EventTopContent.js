import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './event.css'
import ClassInfo from "../commons/views/ClassInfo";
import UserProfileInfo from "../commons/views/UserProfileInfo";

class TopContent extends Component {
    static propTypes = {
        eventDetail: PropTypes.object
    }

    render() {
        const {eventDetail} = this.props;
        return (
            <div>
                <div className="event-detail-top-content clearfix">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="cover-photo clearfix">
                                <img src={eventDetail.source}/>
                            </div>
                        </div>
                    </div>
                    <div className="event-detail-info clearfix">
                        <div className="event-detail-info-row row">
                            <div className="col-sm-12">
                                <div className="event-detail-info-content">
                                    <div className="event-start">
                                        {eventDetail.start.toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="event-detail-info-content">
                                    <div className="event-title">
                                        {eventDetail.title}
                                    </div>
                                    {
                                        eventDetail.forClass ?
                                            (
                                                <span className="event-for-class">
                                        Event for <ClassInfo classDetail={eventDetail.forClass}/>
                                    </span>
                                            ) : ''
                                    }
                                    {
                                        eventDetail.from ?
                                            (
                                                <span className="event-from-user">
                                        Hosted by  <UserProfileInfo user={eventDetail.from.user}/>
                                    </span>
                                            ) : ''
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="buttons clearfix">
                                    <div className="btn-group pull-right">
                                        {/*<div className="btn-group">*/}
                                        {/*<a className="btn btn-white" href="#">*/}
                                        {/*<i className="fa fa-check"></i>*/}
                                        {/*<span>Going</span>*/}
                                        {/*</a>*/}
                                        {/*</div>*/}
                                        <div className="btn-group">
                                            <a data-toggle="dropdown" className="btn btn-white dropdown-toggle"
                                               href="#">
                                                <i className="fa fa-share"></i>
                                                <span className="share-text">Share</span>
                                                <i className="fa fa-caret-down"></i>
                                            </a>
                                            <ul role="menu" className="dropdown-menu">
                                                <li><a href="javascript:;">Invite Friends</a></li>
                                                <li><a href="javascript:;">Share in message</a></li>
                                                <li><a href="javascript:;">Share in new feed</a></li>
                                            </ul>
                                        </div>
                                        <div className="btn-group">
                                            <a data-toggle="dropdown" className="btn btn-white dropdown-toggle"
                                               href="#">
                                                <i className="fa fa-ellipsis-h"></i>
                                            </a>
                                            <ul role="menu" className="dropdown-menu pull-right">
                                                <li><a href="javascript:;">Export event</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="event-detail-extra event-start">
                                    <i className="fa fa-clock-o"></i>
                                    {eventDetail.start.toLocaleString()}
                                </div>
                                <div className="event-detail-extra event-location">
                                    <i className="fa fa-map-marker"></i>
                                    {eventDetail.location}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopContent