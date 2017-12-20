import React, {Component} from 'react'
import './event.css'
import ClassProfileInfo from "../commons/views/ClassProfileInfo";
import UserProfileInfo from "../commons/views/UserProfileInfo";
import {dateUtils, fileUtils} from "../../utils";
import {defaultConstants, eventConstants} from "../../constants";

class EventTopContent extends Component {
    render() {
        const {eventDetail} = this.props;
        return (
            <div>
                <div className="event-detail-top-content clearfix">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="cover-photo clearfix">
                                <img src={fileUtils.renderFileSource(eventDetail.eventImageID, defaultConstants.EVENT_PROFILE_PICTURE_URL)}/>
                            </div>
                        </div>
                    </div>
                    <div className="event-detail-info has-border-radius clearfix">
                        <div className="event-detail-info-row row">
                            <div className="col-sm-12">
                                <div className="event-detail-info-content">
                                    <div className="event-start">
                                        {/*{dateUtils.convertISOToLocaleString(eventDetail.startTime)}*/}
                                    </div>
                                </div>
                                <div className="event-detail-info-content">
                                    <div className="event-title">
                                        {eventDetail.title}
                                    </div>
                                    {
                                        (eventDetail.context == eventConstants.EVENT_CONTEXT.GROUP && eventDetail.contextData) ?
                                            (
                                                <span className="event-for-class">
                                                    Event for <ClassProfileInfo classDetail={eventDetail.contextData}/>
                                                </span>
                                            ) : ''
                                    }
                                    {
                                        (eventDetail.context == eventConstants.EVENT_CONTEXT.GROUP && eventDetail.contextData && eventDetail.userCreate) &&
                                            <span role="presentation" aria-hidden="true"> · </span>
                                    }
                                    {
                                        eventDetail.userCreate ?
                                            (
                                                <span className="event-from-user">
                                                    Hosted by  <UserProfileInfo user={eventDetail.userCreate}/>
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
                                        {/*<div className="btn-group">*/}
                                            {/*<a data-toggle="dropdown" className="btn btn-white dropdown-toggle"*/}
                                               {/*href="#">*/}
                                                {/*<i className="fa fa-share"></i>*/}
                                                {/*<span className="share-text">Share</span>*/}
                                                {/*<i className="fa fa-caret-down"></i>*/}
                                            {/*</a>*/}
                                            {/*<ul role="menu" className="dropdown-menu">*/}
                                                {/*<li><a href="javascript:;">Invite Friends</a></li>*/}
                                                {/*<li><a href="javascript:;">Share in message</a></li>*/}
                                                {/*<li><a href="javascript:;">Share in new feed</a></li>*/}
                                            {/*</ul>*/}
                                        {/*</div>*/}
                                        {/*<div className="btn-group">*/}
                                            {/*<a data-toggle="dropdown" className="btn btn-white dropdown-toggle"*/}
                                               {/*href="#">*/}
                                                {/*<i className="fa fa-ellipsis-h"></i>*/}
                                            {/*</a>*/}
                                            {/*<ul role="menu" className="dropdown-menu pull-right">*/}
                                                {/*<li><a href="javascript:;">Export event</a></li>*/}
                                            {/*</ul>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="event-detail-extra event-start">
                                    <i className="fa fa-clock-o"></i>
                                    {dateUtils.convertISOToLocaleString(eventDetail.startTime)}
                                    <b>
                                        <span role="presentation" aria-hidden="true"> - </span>
                                    </b>
                                    {dateUtils.convertISOToLocaleString(eventDetail.endTime)}
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

export default EventTopContent