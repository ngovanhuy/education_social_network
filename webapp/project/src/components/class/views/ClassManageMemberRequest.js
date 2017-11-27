import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserProfileInfo from "../../commons/views/UserProfileInfo";
import {classActions} from "../../../actions";
import {defaultConstants} from "../../../constants/defaultConstant";
import {fileUtils} from "../../../utils/fileUtils";
import {userService} from "../../../services/userService";
import {userActions} from "../../../actions/userActions";

class ClassManageMemberRequest extends Component {

    componentWillMount() {
        const {classId} = this.props;
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getRequests(classId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId) {
            const {classId} = nextProps;
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getRequests(classId));
        }
    }

    renderMemberRequest = (memberRequest, classId, index) => {
        var user = {
            id: memberRequest._id.toString(),
            firstName: memberRequest.firstName,
            lastName: memberRequest.lastName,
        }
        return (
            <div key={index} className="member-request clearfix">
                <div className="member-info">
                    <img
                        src={memberRequest.profileImageID ? fileUtils.renderFileSource(memberRequest.profileImageID) : defaultConstants.USER_PROFILE_PICTURE_URL}/>
                    <div className="member-info-content">
                        <UserProfileInfo user={user}/>
                        <div>
                            <span>Request enter class at {memberRequest.timeCreate}</span>
                        </div>
                    </div>
                </div>
                <div className="btn-group pull-right">
                    <a className="btn btn-white" onClick={() => this.handleApproveRequestJoinClass(user.id, classId)}>
                        <i className="fa fa-check"></i>
                        Approve
                    </a>
                    <a className="btn btn-white" onClick={() => this.handleDeleteRequestJoinClass(user.id, classId)}>
                        <i className="fa fa-times"></i>
                        Decline
                    </a>
                </div>
            </div>
        )
    }

    handleDeleteRequestJoinClass = (userId, classId) => {
        userService.deleteRequestJoinClass(userId, classId)
            .then(
                this.props.dispatch(userActions.getClassRequest(userId)),
                this.props.dispatch(classActions.getRequests(classId))
            )
    }

    handleApproveRequestJoinClass = (userId, classId) => {
        userService.approveRequestJoinClass(userId, classId)
            .then(
                this.props.dispatch(userActions.getClassJoined(userId)),
                this.props.dispatch(classActions.getRequests(classId)),
                this.props.dispatch(classActions.getMembers(classId))
            )
    }

    render() {
        const {classDetail} = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="ui-box">
                            <div className="ui-box-title">
                                <span>Member Request</span>
                            </div>
                            <div className="ui-box-content">
                                {
                                    (classDetail.requests && classDetail.requests.length > 0) ?
                                        (
                                            classDetail.requests.map((memberRequest, index) => this.renderMemberRequest(memberRequest, classDetail.id, index))
                                        ) : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {classDetail} = state.classes
    return {
        classDetail
    }
}

export default connect(mapStateToProps, null)(ClassManageMemberRequest);