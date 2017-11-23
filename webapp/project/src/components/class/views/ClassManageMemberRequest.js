import React, {Component} from 'react'
import UserProfileInfo from "../../commons/views/UserProfileInfo";

class ClassManageMemberRequest extends Component {
    renderMemberRequest = (memberRequest, index) => {
        return(
            <div key={index} className="member-request clearfix">
                <div className="member-info">
                    <img src={memberRequest.user.profilePictureUrl}/>
                    <div className="member-info-content">
                        <UserProfileInfo user={memberRequest.user}/>
                        <div>
                            <span>Request enter class at {memberRequest.createTime.toLocaleDateString()}</span>
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

export default ClassManageMemberRequest;