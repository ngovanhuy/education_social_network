import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ClassInfo from "../commons/views/ClassProfileInfo";
import {defaultConstants} from "../../constants/defaultConstant";
import {fileUtils} from "../../utils/fileUtils";
import {classConstants} from "../../constants/classConstants";
import {userService} from "../../services/userService";
import {connect} from 'react-redux'
import {userActions} from "../../actions/userActions";
import {classActions} from "../../actions/classActions";

class Classes extends Component {
    renderButtonOfUserWithClass(classDetail, userId) {
        if (classDetail.statusOfCurrentUser == classConstants.STATUS_OF_USER_IN_CLASS.NOT_RELATE) {
            return (
                <div className="button-join">
                    <a className="btn btn-white"
                       onClick={() => this.handleCreateRequestJoinClass(userId, classDetail.id)}>
                        <i className="fa fa-plus"></i>
                        Join
                    </a>
                </div>
            )
        } else if (classDetail.statusOfCurrentUser == classConstants.STATUS_OF_USER_IN_CLASS.SEND_REQUEST_JOIN) {
            return (
                <div className="button-cancel-request">
                    <a className="btn btn-white"
                       onClick={() => this.handleDeleteRequestJoinClass(userId, classDetail.id)}>
                        <i className="fa fa-times"></i>
                        Cancel Request
                    </a>
                </div>
            )
        } else if (classDetail.statusOfCurrentUser == classConstants.STATUS_OF_USER_IN_CLASS.JOINED) {
            return (
                <div className="button-cancel-request">
                    <a className="btn btn-white" onClick={() => this.handleLeaveClass(userId, classDetail.id)}>
                        <i className="fa fa-times"></i>
                        Leave class
                    </a>
                </div>
            )
        }
        return;
    }

    renderClassDetail = (classDetail, userId, index) => {
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
                                        <ClassInfo classDetail={classDetail}/>
                                    ) :
                                    (
                                        <span className="class-full-name">{classDetail.name}</span>
                                    )
                            }

                        </div>
                    </div>
                    <div className="buttons clearfix">
                        {
                            this.renderButtonOfUserWithClass(classDetail, userId)
                        }
                    </div>
                </div>
            </div>
        )
    }

    handleCreateRequestJoinClass = (userId, classId) => {
        userService.createRequestJoinClass(userId, classId)
            .then(
                this.props.dispatch(userActions.getClassRequest(userId)),
                this.props.dispatch(classActions.getRequests(classId))
            )
    }

    handleDeleteRequestJoinClass = (userId, classId) => {
        userService.deleteRequestJoinClass(userId, classId)
            .then(
                this.props.dispatch(userActions.getClassRequest(userId)),
                this.props.dispatch(classActions.getRequests(classId))
            )
    }

    handleLeaveClass = (userId, classId) => {
        userService.leaveClass(userId, classId)
            .then(
                this.props.dispatch(userActions.getClassJoined(userId)),
                this.props.dispatch(classActions.getMembers(classId))
            )
    }

    render() {
        const {classes, userId} = this.props
        return (
            <div className="classes-content clearfix">
                {
                    (classes && classes.length > 0) ?
                        (
                            classes.map((classDetail, index) => this.renderClassDetail(classDetail, userId, index))
                        ) :
                        (
                            <div className="no-class">
                                No Class
                            </div>
                        )
                }
            </div>
        )
    }
}

export default connect(null, null)(Classes);