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
import {classActions} from "../../actions";
import {Redirect} from 'react-router'


class ClassMembers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalLeaveClassWarningIsOpen: false,
            fireRedirect: false,
            linkRedirect: ''
        }
        this.openModalLeaveClass = this.openModalLeaveClass.bind(this);
        this.closeModalLeaveClass = this.closeModalLeaveClass.bind(this);
        this.renderMember = this.renderMember.bind(this);
        this.handleDeleteMember = this.handleDeleteMember.bind(this);
    }

    openModalLeaveClass() {
        this.setState({modalLeaveClassWarningIsOpen: true});
    }

    closeModalLeaveClass() {
        this.setState({modalLeaveClassWarningIsOpen: false});
    }

    handleDeleteMember(classDetail, memberId) {
        const {currentUser} = this.props
        var linkRedirect = '/classes'
        if (classDetail.memberCount == 1 || memberId == currentUser.id) {
            this.setState({
                modalLeaveClassWarningIsOpen: false,
                fireRedirect: true,
                linkRedirect: linkRedirect
            })
        } else {
            this.setState({
                modalLeaveClassWarningIsOpen: false,
            })
        }
        this.props.dispatch(classActions.deleteMember(classDetail.id, memberId))
        this.props.dispatch(classActions.getById(classDetail.id))
        if (classDetail.memberCount > 1) {
            this.props.dispatch(classActions.getMembers(classDetail.id))
        } else {
            this.props.dispatch(classActions.deleteClass(classDetail.id, currentUser.id))
        }
    }

    renderMember = (member, index) => {
        const {currentUser, classDetail} = this.props
        const isTeacher = userUtils.checkIsTeacher(currentUser)
        var userFullNameLeave = userUtils.renderFullName(member.firstName, member.lastName);
        if (member.id == currentUser.id) {
            userFullNameLeave = ""
        }
        return (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                <div className="panel panel-default panel-member">
                    <div className="panel-body">
                        <Link to={`/users/${member.id}`}>
                            <div className="text-center panel-member-col">
                                <img
                                    src={member && fileUtils.renderFileSource(member.profileImageID, defaultConstants.USER_PROFILE_PICTURE_URL_NONE)}
                                    className="img-circle" alt="No Image"/>
                                <h4 className="thin">
                                    {userUtils.renderFullName(member.firstName, member.lastName)}
                                </h4>
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
                                            <a href="javascript:;" onClick={this.openModalLeaveClass}>
                                                {
                                                    (member.id == currentUser.id) ? "Leave This Class" : "Remove from Class"
                                                }
                                            </a>
                                            <LeaveClassWarningModal
                                                modalIsOpen={this.state.modalLeaveClassWarningIsOpen}
                                                closeModal={this.closeModalLeaveClass}
                                                onSubmit={
                                                    () => this.handleDeleteMember(classDetail, member.id)
                                                }
                                                classDetail={classDetail}
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
        const {members, classMemberTitle} = this.props
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
                                members.map((member, index) => this.renderMember(member, index))
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

export default connect(mapStateToProps)(ClassMembers);