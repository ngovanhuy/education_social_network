import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import CreateClassModal from "../class/views/CreateClassModal";
import CreateEventModal from "../event/views/CreateEventModal";
import UserProfileInfo from "../commons/views/UserProfileInfo";
import {defaultConstants, eventConstants} from "../../constants";
import {announcementActions, classActions, eventActions} from "../../actions";
import {connect} from 'react-redux';
import {userUtils, dateUtils, fileUtils} from "../../utils";
import CreateAnnouncementModal from "../announcement/views/CreateAnnouncementModal";
import {notificationService} from "../../services";

class HomeLeftmenu extends Component {
    constructor() {
        super()
        this.state = {
            modalCreateEventIsOpen: false,
            modalCreateClassIsOpen: false,
            modalCreateAnnouncementIsOpen: false
        }
        this.openModalCreateAnnouncement = this.openModalCreateAnnouncement.bind(this);
        this.closeModalCreateAnnouncement = this.closeModalCreateAnnouncement.bind(this);
        this.openModalCreateEvent = this.openModalCreateEvent.bind(this);
        this.closeModalCreateEvent = this.closeModalCreateEvent.bind(this);
        this.openModalCreateClass = this.openModalCreateClass.bind(this);
        this.closeModalCreateClass = this.closeModalCreateClass.bind(this);
        this.handleCreateAnnouncement = this.handleCreateAnnouncement.bind(this);
        this.handleCreateClass = this.handleCreateClass.bind(this);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
    }

    openModalCreateClass() {
        this.setState({modalCreateClassIsOpen: true});
    }

    closeModalCreateClass() {
        this.setState({modalCreateClassIsOpen: false});
    }

    openModalCreateEvent() {
        this.setState({modalCreateEventIsOpen: true});
    }

    closeModalCreateEvent() {
        this.setState({modalCreateEventIsOpen: false});
    }

    openModalCreateAnnouncement() {
        this.setState({modalCreateAnnouncementIsOpen: true});
    }

    closeModalCreateAnnouncement() {
        this.setState({modalCreateAnnouncementIsOpen: false});
    }

    renderListItem = (index, linkTo, linkLabel) => {
        return (
            <li key={index}>
                <Link to={linkTo}>
                    <i className="group-icon"></i>
                    <span className="group-label">{linkLabel}</span>
                </Link>
            </li>
        )
    }

    handleCreateClass = (className, membersInvited) => {
        const {currentUser} = this.props
        this.setState({modalCreateClassIsOpen: false});
        this.props.dispatch(classActions.insert(currentUser.id, className, membersInvited));
    }

    handleCreateAnnouncement = (title, content) => {
        const {currentUser} = this.props
        this.setState({modalCreateAnnouncementIsOpen: false});
        this.props.dispatch(announcementActions.insert(currentUser.id, title, content));
        const fbNotification = {
            template: 'Has new annoucement with title is ' + title
        }
        const {users, fbAppAccessToken} = this.props
        for (var i = 0; i < users.length; i++) {
            var user = users[i]
            if (user && user.fbAccount && user.fbAccount.id) {
                notificationService.createNotificationToFacebook(user.fbAccount.id, fbAppAccessToken, fbNotification)
            }
        }
    }

    handleCreateEvent = (imageUpload, title, location, content, start, end, frequencyValue, frequencies) => {
        this.setState({modalCreateEventIsOpen: false});
        const {currentUser} = this.props
        if (frequencyValue == eventConstants.FREQUENCY.ONCE) {
            this.props.dispatch(eventActions.insert(null, currentUser.id, imageUpload, title, location,
                content, dateUtils.convertDateTimeToISO(start), dateUtils.convertDateTimeToISO(end)));
        } else {
            var periods = dateUtils.convertFrequencyInfoToEventTimes(frequencyValue, frequencies)
            // console.log(periods)
            var eventStartRequest = {}, eventEndRequest = {}
            if (frequencyValue == eventConstants.FREQUENCY.DAILY) {
                eventStartRequest = frequencies.daily.startDate
                eventEndRequest = frequencies.daily.endDate
            } else if (frequencyValue == eventConstants.FREQUENCY.WEEKLY) {
                eventStartRequest = frequencies.weekly.startDate
                eventEndRequest = frequencies.weekly.endDate
            }
            this.props.dispatch(eventActions.insertMulti(null, currentUser.id, imageUpload, title, location, content,
                dateUtils.convertDateTimeToISO(eventStartRequest), dateUtils.convertDateTimeToISO(eventEndRequest), periods));
        }
    }

    render() {
        const {schoolDetail, currentUser, classes} = this.props
        const isTeacher = userUtils.checkIsTeacher(currentUser)
        return (
            <div className="home-leftmenu clearfix">
                <div className="row">
                    <div className="hidden-xs col-sm-12">
                        <div className="school-logo">
                            <img src={schoolDetail.schoolLogoUrl}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="user-info clearfix">
                            <ul className="home-leftmenu-list">
                                <li>
                                    {
                                        currentUser &&
                                        <span>
                                            <Link to={`/users/${currentUser.id}`}>
                                                <img src={currentUser &&
                                                userUtils.renderProfileImageOfUser(currentUser.id)}/>
                                            </Link>
                                            <UserProfileInfo user={currentUser}/>
                                        </span>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="home-leftmenu-title">
                            Shortcuts
                        </div>
                        <ul className="home-leftmenu-list">
                            {
                                classes && classes.length > 0 ?
                                    (
                                        classes.map((classDetail, index) =>
                                            this.renderListItem(index, `/classes/${classDetail.id}`, classDetail.name))
                                    ) : ''
                            }
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="home-leftmenu-title">
                            Explore
                        </div>
                        <ul className="home-leftmenu-list">
                            <li>
                                <Link to={`/announcements`}>
                                    <i className="fa fa-bullhorn"></i>
                                    <span>Announcements</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={`/events`}>
                                    <i className="fa fa-calendar"></i>
                                    <span>Events</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={`/classes`}>
                                    <i className="fa fa-users"></i>
                                    <span>Classes</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="home-leftmenu-title">
                            Create
                        </div>
                        <div className="link-create">
                            <a href="#" onClick={this.openModalCreateEvent}>
                                Event
                            </a>
                            <CreateEventModal modalIsOpen={this.state.modalCreateEventIsOpen}
                                              closeModal={this.closeModalCreateEvent}
                                              onSubmit={this.handleCreateEvent}/>
                            {
                                isTeacher &&
                                (
                                    <span>
                                        <span role="presentation" aria-hidden="true"> · </span>
                                        <a href="#" onClick={this.openModalCreateClass}>
                                            Class
                                        </a>
                                                <CreateClassModal modalIsOpen={this.state.modalCreateClassIsOpen}
                                                                  closeModal={this.closeModalCreateClass}
                                                                  onSubmit={this.handleCreateClass}/>
                                        <span role="presentation" aria-hidden="true"> · </span>
                                        <a href="#" onClick={this.openModalCreateAnnouncement}>
                                            Announcement
                                        </a>
                                                <CreateAnnouncementModal
                                                    modalIsOpen={this.state.modalCreateAnnouncementIsOpen}
                                                    closeModal={this.closeModalCreateAnnouncement}
                                                    onSubmit={this.handleCreateAnnouncement}/>
                                    </span>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {currentUser} = state.authentication;
    const {fbAppAccessToken} = state.settings
    const users = state.users.items
    return {
        currentUser,
        users,
        fbAppAccessToken
    };
}


export default connect(mapStateToProps)(HomeLeftmenu);