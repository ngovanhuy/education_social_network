import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import CreateClassModal from "../class/views/CreateClassModal";
import CreateEventModal from "../event/views/CreateEventModal";
import UserProfileInfo from "../commons/views/UserProfileInfo";

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
                    <span>{linkLabel}</span>
                </Link>
            </li>
        )
    }

    render() {
        const {schoolDetail, user, classes} = this.props
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
                        <div className="user-info">
                            <Link to={`/users/${user.id}`}>
                                <img src={user.profilePictureUrl}/>
                            </Link>
                            <UserProfileInfo user={user}/>
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
                                            this.renderListItem(index, `/classes/${classDetail.id}`, classDetail.fullName))
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
                                              closeModal={this.closeModalCreateEvent}/>
                            <span role="presentation" aria-hidden="true"> · </span>
                            <a href="#" onClick={this.openModalCreateClass}>
                                Class
                            </a>
                            <CreateClassModal modalIsOpen={this.state.modalCreateClassIsOpen}
                                              closeModal={this.closeModalCreateClass}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeLeftmenu;