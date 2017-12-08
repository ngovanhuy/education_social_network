import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import UserProfileInfo from "../commons/views/UserProfileInfo";
import FileInput from '@ranyefet/react-file-input'
import * as FileUtil from '../../utils/fileUtils'
import ClassMembersHeadline from "./views/ClassMembersHeadline";
import {defaultConstants} from "../../constants/defaultConstant";
import {fileUtils} from "../../utils/fileUtils";
import {userUtils} from "../../utils";
import LeaveClassWarningModal from "./views/LeaveClassWarningModal";

class ClassMembers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalLeaveClassWarningIsOpen: false,
        }
        this.openModalLeaveClass = this.openModalLeaveClass.bind(this);
        this.closeModalLeaveClass = this.closeModalLeaveClass.bind(this);
        this.renderMember = this.renderMember.bind(this);
    }

    openModalLeaveClass() {
        this.setState({modalLeaveClassWarningIsOpen: true});
    }

    closeModalLeaveClass() {
        this.setState({modalLeaveClassWarningIsOpen: false});
    }

    renderMember = (member, index, isTeacher, classDetail, user) => {
        var userFullNameLeave = userUtils.renderFullName(member.firstName, member.lastName);
        if (member.id == user.id) {
            userFullNameLeave = ""
        }
        return (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                <div className="panel panel-default panel-member">
                    <div className="panel-body">
                        <Link to={`/users/${member._id}`}>
                            <div className="text-center panel-member-col">
                                <img
                                    src={member && fileUtils.renderFileSource(member.profileImageID, userUtils.renderSourceProfilePictureDefault(member.gender))}
                                    className="img-circle" alt="No Image"/>

                                <h4 className="thin">
                                    {userUtils.renderFullName(member.firstName, member.lastName)}
                                </h4>
                            </div>
                        </Link>
                        {
                            (isTeacher || member.id == user.id) &&
                            (
                                <div className="dropdown panel-member-col">
                                    <button data-toggle="dropdown" className="btn btn-white dropdown-toggle"
                                            type="button">
                                        <span className="fa fa-cog"></span>
                                        <span className="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <ul role="menu" className="dropdown-menu pull-right-xs">
                                        <li>
                                            <a href="javascript:;" onClick={this.openModalLeaveClass}>
                                                {
                                                    (member.id == user.id) ? "Leave This Class" : "Remove from Class"
                                                }
                                            </a>
                                            <LeaveClassWarningModal
                                                modalIsOpen={this.state.modalLeaveClassWarningIsOpen}
                                                closeModal={this.closeModalLeaveClass}
                                                onSubmit={
                                                    () => this.props.onDeleteMember(classDetail, member.id)
                                                }
                                                classDetail={classDetail} user={user}
                                                userFullNameLeave={userFullNameLeave}/>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {isTeacher, members, classDetail, user, classMemberTitle} = this.props
        return (
            <div className="class-members">
                {/*<ClassMembersHeadline currentHeadline="members" className={className}/>*/}
                <div className="class-members-headline container-fluid-md clearfix">
                    <div className="clearfix col-sm-12">
                        <ul className="clearfix">
                            <li>
                                <span className='current'>{classMemberTitle}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="class-members-content container-fluid-md clearfix">
                    {
                        members && members.length > 0 ?
                            (
                                members.map((member, index) => this.renderMember(member, index, isTeacher, classDetail, user))
                            ) :
                            (
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <div className="panel panel-default panel-member">
                                        <div className="panel-body">
                                            <p>No members</p>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}

export default ClassMembers;