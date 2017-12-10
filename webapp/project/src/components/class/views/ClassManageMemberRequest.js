import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserProfileInfo from "../../commons/views/UserProfileInfo";
import {classActions} from "../../../actions";
import {userUtils, fileUtils} from "../../../utils";
import {userActions} from "../../../actions";
import {userConstants} from "../../../constants";

class ClassManageMemberRequest extends Component {

    componentWillMount() {
        const {classDetail} = this.props;
        this.props.dispatch(classActions.getById(classDetail.id));
        this.props.dispatch(classActions.getRequests(classDetail.id));
    }

    renderMemberRequest = (memberRequest, classId, index) => {
        var user = {
            id: memberRequest.id.toString(),
            firstName: memberRequest.firstName,
            lastName: memberRequest.lastName,
            gender: {
                enum_id: userConstants.GENDER.NONE
            },
        }
        return (
            <div key={index} className="member-request clearfix">
                <div className="member-info">
                    <img
                        src={memberRequest && fileUtils.renderFileSource(memberRequest.profileImageID, userUtils.renderSourceProfilePictureDefault(user.gender))}/>
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
        this.props.dispatch(userActions.deleteClassRequest(userId, classId))
    }

    handleApproveRequestJoinClass = (userId, classId) => {
        this.props.dispatch(userActions.approveRequestJoinClass(userId, classId))
    }

    render() {
        const {classDetail} = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="ui-box has-border-radius">
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