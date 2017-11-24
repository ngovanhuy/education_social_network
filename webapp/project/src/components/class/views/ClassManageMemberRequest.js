import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserProfileInfo from "../../commons/views/UserProfileInfo";
import {classActions} from "../../../actions";
import {defaultConstants} from "../../../constants/defaultConstant";

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

    renderMemberRequest = (memberRequest, index) => {
        var user = {
            id: memberRequest._id.toString(),
            firstName: memberRequest.firstName,
            lastName: memberRequest.lastName,
        }
        return (
            <div key={index} className="member-request clearfix">
                <div className="member-info">
                    <img
                        src={memberRequest.profilePictureUrl ? memberRequest.profilePictureUrl : defaultConstants.USER_PROFILE_PICTURE_URL}/>
                    <div className="member-info-content">
                        <UserProfileInfo user={user}/>
                        <div>
                            <span>Request enter class at {memberRequest.timeCreate}</span>
                        </div>
                    </div>
                </div>
                <div className="btn-group pull-right">
                    <a href="#" className="btn btn-white">
                        <i className="fa fa-check"></i>
                        Approve
                    </a>
                    <a href="#" className="btn btn-white">
                        <i className="fa fa-times"></i>
                        Decline
                    </a>
                </div>
            </div>
        )
    }

    render() {
        const {memberRequests} = this.props
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
                                    (memberRequests && memberRequests.length > 0) ?
                                        (
                                            memberRequests.map((memberRequest, index) => this.renderMemberRequest(memberRequest, index))
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
    const memberRequests =
        (state.classes.classDetail && state.classes.classDetail.requests &&
            state.classes.classDetail.requests.length > 0) ?
            state.classes.classDetail.requests : []
    return {
        memberRequests
    }
}

export default connect(mapStateToProps, null)(ClassManageMemberRequest);