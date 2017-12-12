import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ClassProfileInfo from "../commons/views/ClassProfileInfo";
import {defaultConstants} from "../../constants/defaultConstant";
import {fileUtils} from "../../utils/fileUtils";
import {classConstants} from "../../constants";
import {connect} from 'react-redux'
import {userActions, classActions} from "../../actions";
import LeaveClassWarningModal from "./views/LeaveClassWarningModal";
import {Redirect} from 'react-router'

class Classes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalLeaveClassWarningIsOpen: false,
            fireRedirect: false,
            linkRedirect: ''
        }
        this.openModalLeaveClass = this.openModalLeaveClass.bind(this);
        this.closeModalLeaveClass = this.closeModalLeaveClass.bind(this);
    }

    openModalLeaveClass() {
        this.setState({modalLeaveClassWarningIsOpen: true});
    }

    closeModalLeaveClass() {
        this.setState({modalLeaveClassWarningIsOpen: false});
    }

    handleCreateRequestJoinClass = (userId, classId) => {
        this.props.dispatch(userActions.createClassRequest(userId, classId))
    }

    handleDeleteRequestJoinClass = (userId, classId) => {
        this.props.dispatch(userActions.deleteClassRequest(userId, classId))
    }

    // handleLeaveClass = (classDetail, userId) => {
    //     const {currentUser} = this.props
    //     this.props.dispatch(classActions.deleteMember(classDetail.id, userId, currentUser.id))
    //     this.props.dispatch(userActions.getClassJoined(currentUser.id))
    //     var linkRedirect = '/'
    //     this.setState({
    //         modalLeaveClassWarningIsOpen: false,
    //         fireRedirect: true,
    //         linkRedirect: linkRedirect
    //     })
    // }

    renderButtonOfUserWithClass(classDetail) {
        const {currentUser} = this.props
        if (classDetail.statusOfCurrentUser == classConstants.STATUS_OF_USER_IN_CLASS.NOT_RELATE) {
            return (
                <div className="button-join">
                    <a className="btn btn-white"
                       onClick={() => this.handleCreateRequestJoinClass(currentUser.id, classDetail.id)}>
                        <i className="fa fa-plus"></i>
                        Join
                    </a>
                </div>
            )
        } else if (classDetail.statusOfCurrentUser == classConstants.STATUS_OF_USER_IN_CLASS.SEND_REQUEST_JOIN) {
            return (
                <div className="button-cancel-request">
                    <a className="btn btn-white"
                       onClick={() => this.handleDeleteRequestJoinClass(currentUser.id, classDetail.id)}>
                        <i className="fa fa-times"></i>
                        Cancel Request
                    </a>
                </div>
            )
        } else if (classDetail.statusOfCurrentUser == classConstants.STATUS_OF_USER_IN_CLASS.JOINED) {
            return (
                <div>
                    <a className="btn btn-white">
                        Joined
                    </a>
                    {/*<LeaveClassWarningModal modalIsOpen={this.state.modalLeaveClassWarningIsOpen}*/}
                                            {/*closeModal={this.closeModalLeaveClass}*/}
                                            {/*onSubmit={() => this.handleLeaveClass(classDetail, currentUser.id)}*/}
                                            {/*classDetail={classDetail}/>*/}
                </div>
            )
        }
        return '';
    }

    renderClassDetail = (classDetail, index) => {
        return (
            <div key={index} className="col-sm-6">
                <div className="class-detail has-border-radius clearfix">
                    <div className="class-detail-left">
                        <div className="class-profile-picture">
                            {
                                classDetail.statusOfCurrentUser === classConstants.STATUS_OF_USER_IN_CLASS.JOINED ?
                                    (
                                        <Link to={`/classes/${classDetail.id}`}>
                                            <img
                                                src={classDetail && fileUtils.renderFileSource(classDetail.profileImageID, defaultConstants.CLASS_PROFILE_PICTURE_URL)}/>
                                        </Link>
                                    ) :
                                    (
                                        <img
                                            src={classDetail && fileUtils.renderFileSource(classDetail.profileImageID, defaultConstants.CLASS_PROFILE_PICTURE_URL)}/>
                                    )
                            }
                        </div>
                        <div className="class-info">
                            {
                                classDetail.statusOfCurrentUser === classConstants.STATUS_OF_USER_IN_CLASS.JOINED ?
                                    (
                                        <ClassProfileInfo classDetail={classDetail}/>
                                    ) :
                                    (
                                        <span className="class-full-name">{classDetail.name}</span>
                                    )
                            }

                        </div>
                    </div>
                    <div className="buttons clearfix">
                        {
                            this.renderButtonOfUserWithClass(classDetail)
                        }
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {classes} = this.props
        return (
            <div className="classes-content clearfix">
                {
                    (classes && classes.length > 0) ?
                        (
                            classes.map((classDetail, index) => this.renderClassDetail(classDetail, index))
                        ) :
                        (
                            <div className="no-class">
                                No Class
                            </div>
                        )
                }
                {this.state.fireRedirect && (
                    <Redirect to={this.state.linkRedirect}/>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {currentUser} = state.authentication
    return {
        currentUser,
    }
}

export default connect(mapStateToProps)(Classes);