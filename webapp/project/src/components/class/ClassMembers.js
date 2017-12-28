import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {defaultConstants} from "../../constants";
import {userUtils, fileUtils} from "../../utils";
import LeaveClassWarningModal from "./views/LeaveClassWarningModal";
import {classActions, postActions} from "../../actions";

class ClassMembers extends Component {
    constructor(props) {
        super(props)
        this.renderMember = this.renderMember.bind(this);
    }

    renderMember = (member, index) => {
        const {membersIsTeacher} = this.props
        const {currentUser, classDetail} = this.props
        const isTeacher = userUtils.checkIsTeacher(currentUser)
        var userFullNameLeave = userUtils.renderFullName(member.firstName, member.lastName);
        if (member.id == currentUser.id) {
            userFullNameLeave = ""
        }
        return (
            <div key={index} className={membersIsTeacher ? "col-xs-6 col-sm-6 col-md-4 col-lg-3" : "col-xs-6 col-sm-4 col-lg-3"}>
                <div className="class-member">
                    <Link to={`/users/${member.id}`}>
                        <div className="text-center panel-member-col">
                            <img
                                src={member && userUtils.renderProfileImageOfUser(member.id)}
                                className="img-circle" alt="No Image"/>
                            <div className="member-info">
                                {userUtils.renderFullName(member.firstName, member.lastName)}
                            </div>
                        </div>
                    </Link>
                    {
                        (isTeacher || member.id == currentUser.id) &&
                        (
                            <div className="dropdown panel-member-col">
                                <button data-toggle="dropdown" className="btn btn-white dropdown-toggle"
                                        type="button">
                                    <span className="fa fa-cog"></span>
                                    <span className="sr-only">Toggle Dropdown</span>
                                </button>
                                <ul role="menu" className="dropdown-menu pull-right-xs">
                                    <li>
                                        <a href="javascript:;" onClick={() => this.props.openModalLeaveClass(member.id, userFullNameLeave)}>
                                            {
                                                (member.id == currentUser.id) ? "Leave This Class" : "Remove from Class"
                                            }
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

    render() {
        const {members, membersIsTeacher} = this.props
        var classMemberTitle = "Students"
        if (membersIsTeacher) {
            classMemberTitle = "Teachers"
        }
        return (
            <div className="class-members clearfix">
                {/*<ClassMembersHeadline currentHeadline="members" className={className}/>*/}
                <h3 className='title'>{classMemberTitle}</h3>
                {
                    members && members.length > 0 ?
                        (
                            members.map((member, index) => this.renderMember(member, index))
                        ) :
                        (
                            <p className="class-no-member">No members</p>
                        )
                }
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

export default connect(mapStateToProps)(ClassMembers);