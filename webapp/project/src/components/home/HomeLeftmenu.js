import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import CreateClassModal from "../class/views/CreateClassModal";
import CreateEventModal from "../event/views/CreateEventModal";
import UserProfileInfo from "../commons/views/UserProfileInfo";
import {defaultConstants} from "../../constants";
import {classActions, eventActions} from "../../actions";
import {connect} from 'react-redux';
import {fileUtils} from "../../utils/fileUtils";
import {userUtils} from "../../utils/userUtils";
import {dateUtils} from "../../utils";

class HomeLeftmenu extends Component {
    constructor() {
        super()
        this.state = {
            modalCreateEventIsOpen: false,
            modalCreateClassIsOpen: false
        }
        this.openModalCreateClass = this.openModalCreateClass.bind(this);
        this.closeModalCreateClass = this.closeModalCreateClass.bind(this);
        this.openModalCreateEvent = this.openModalCreateEvent.bind(this);
        this.closeModalCreateEvent = this.closeModalCreateEvent.bind(this);
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

    handleCreateClass = (userId, className, membersInvited) => {
        this.setState({modalCreateClassIsOpen: false});
        this.props.dispatch(classActions.insert(userId, className, membersInvited));
    }

    handleCreateEvent = (imageUpload, title, location, content, start, end) => {
        this.setState({modalCreateEventIsOpen: false});
        const {user} = this.props
        this.props.dispatch(eventActions.insert(null, user.id, imageUpload, title, location,
            content, dateUtils.convertDateTimeToISO(start), dateUtils.convertDateTimeToISO(end)));
    }

    render() {
        const {schoolDetail, user, classes} = this.props
        const isTeacher = userUtils.checkIsTeacher(user)
        const defaultImage = user && userUtils.renderSourceProfilePictureDefault(user.gender)
        return (
            <div className="home-leftmenu clearfix">
                <div className="row">
                    <div className="col-sm-12">
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
                                        user &&
                                        (
                                            <span>
                                                <Link to={`/users/${user.id}`}>
                                                    <img src={user &&
                                                    fileUtils.renderFileSource(user.profileImageID, defaultImage)}/>
                                                </Link>
                                                <UserProfileInfo user={user}/>
                                            </span>
                                        )
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
                                        {
                                            user &&
                                            (
                                                <CreateClassModal modalIsOpen={this.state.modalCreateClassIsOpen}
                                                                  userId={user.id}
                                                                  closeModal={this.closeModalCreateClass}
                                                                  onSubmit={this.handleCreateClass}/>
                                            )
                                        }
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
    const {user} = state.authentication;
    return {
        user,
    };
}


export default connect(mapStateToProps)(HomeLeftmenu);