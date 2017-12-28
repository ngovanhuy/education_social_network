import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import {announcementActions} from "../../../actions";
import {connect} from "react-redux";
import AnnouncementInfo from "../../commons/views/AnnouncementInfo";
import {userUtils} from "../../../utils";
import {notificationService} from "../../../services";

class AnnouncementLeftmenu extends Component {
    constructor(props) {
        super(props)
        this.state = {modalIsOpen: false}
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleCreateAnnouncement = this.handleCreateAnnouncement.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleCreateAnnouncement = (title, content) => {
        this.setState({modalIsOpen: false});
        const {currentUser} = this.props
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

    renderAnnouncement(announcementDetail, index) {
        const {announcementId} = this.props
        if (announcementDetail.id == announcementId) {
            return (
                <div key={index} className="announcements-headline-content current">
                    <span>{announcementDetail.title}</span>
                </div>
            )
        } else {
            return (
                <div key={index} className="announcements-headline-content">
                    <AnnouncementInfo announcement={announcementDetail}/>
                </div>
            )
        }
    }

    render() {
        const {currentUser} = this.props
        var {announcements} = this.props
        announcements = (announcements && announcements.length > 0) ? announcements.sort(function (a, b) {
            return new Date(b.timeCreate) - new Date(a.timeCreate);
        }) : [];

        const isTeacher = userUtils.checkIsTeacher(currentUser)
        return (
            <div className="announcements-left-menu">
                <CreateAnnouncementModal closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen}
                                         onSubmit={this.handleCreateAnnouncement}/>
                <div className="col-sm-12">
                    <div className="row">
                        <h2 className="title">
                            <Link to={`/announcements`}>Announcements</Link>
                        </h2>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="announcements-headline">
                            {
                                (announcements && announcements.length > 0) ?
                                    (
                                        announcements.map((announcementDetail, index) =>
                                            this.renderAnnouncement(announcementDetail, index))
                                    ) :
                                    <div className="no-announcements">No announcements</div>
                            }
                        </div>
                    </div>
                </div>
                {
                    isTeacher &&
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="buttons">
                                <a href="#" className="btn btn-white" onClick={this.openModal}>
                                    <i className="fa fa-plus"></i>
                                    Create announcement
                                </a>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {currentUser} = state.authentication;
    const announcements = state.announcements.items
    const {fbAppAccessToken} = state.settings
    const users = state.users.items
    return {
        currentUser,
        announcements,
        users,
        fbAppAccessToken
    };
}


export default connect(mapStateToProps)(AnnouncementLeftmenu);