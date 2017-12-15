import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import '../../components/class/class.css'
import ClassMembers from "../../components/class/ClassMembers";
import AddMember from "../../components/class/views/AddMember";
import {classActions, postActions} from "../../actions";
import {userUtils} from "../../utils";
import LeaveClassWarningModal from "../../components/class/views/LeaveClassWarningModal";
import {Redirect} from 'react-router'

class ClassMembersPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalLeaveClassWarningIsOpen: false,
            fireRedirect: false,
            linkRedirect: '',
            memberIdLeave: ''
        }
        this.openModalLeaveClass = this.openModalLeaveClass.bind(this);
        this.closeModalLeaveClass = this.closeModalLeaveClass.bind(this);
        this.handleDeleteMember = this.handleDeleteMember.bind(this);
    }

    openModalLeaveClass(memberId, userFullNameLeave) {
        this.setState({
            modalLeaveClassWarningIsOpen: true,
            memberIdLeave: memberId,
            userFullNameLeave: userFullNameLeave
        });
    }

    closeModalLeaveClass() {
        this.setState({
            modalLeaveClassWarningIsOpen: false,
            memberIdLeave: '',
            userFullNameLeave: ''
        });
    }

    handleDeleteMember(classDetail, memberId) {
        const {currentUser} = this.props
        if (classDetail.memberCount == 1 || memberId == currentUser.id) {
            this.setState({
                modalLeaveClassWarningIsOpen: false,
                fireRedirect: true,
                linkRedirect: '/classes'
            })
        } else {
            this.setState({
                modalLeaveClassWarningIsOpen: false,
                fireRedirect: true,
                linkRedirect: `/classes/${classDetail.id}`
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

    componentWillMount() {
        const {classId, currentUser} = this.props;
        if (currentUser) {
            this.props.dispatch(postActions.getPostsByClassIdUserId(classId, currentUser.id));
        } else {
            var currentUserId = userUtils.getCurrentUserId();
            this.props.dispatch(postActions.getPostsByClassIdUserId(classId, currentUserId));
        }
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getTopics(classId));
        this.props.dispatch(classActions.getMembers(classId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId) {
            const {classId} = nextProps;
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getTopics(classId));
            this.props.dispatch(classActions.getMembers(classId));
        }
    }

    render() {
        const {currentUser, classId, classDetail, topics, members} = this.props
        const isTeacher = userUtils.checkIsTeacher(currentUser)
        const membersRoleIsMember = (members && members.length > 0) ? members.filter(function (member) {
            return member.isAdmin == false
        }) : [];
        const membersRoleIsTeacher = (members && members.length > 0) ? members.filter(function (member) {
            return member.isAdmin == true
        }) : [];
        return (
            <div className="class-member-page clearfix">
                <div className="container">
                    <div className="col-sm-4 col-md-3">
                        <ClassLeftmenu classDetail={classDetail} topics={topics}
                                       classId={classId} currentPage="members"/>
                    </div>
                    <div className="col-sm-8 col-md-9">
                        <div className="row">
                            <div className={isTeacher ? "col-sm-8" : "col-sm-12"}>
                                <ClassMembers members={membersRoleIsTeacher} classDetail={classDetail}
                                              membersIsTeacher={true} openModalLeaveClass={this.openModalLeaveClass}/>
                            </div>
                            {
                                isTeacher &&
                                (
                                    <div className="col-sm-4">
                                        <AddMember memberCount={classDetail.memberCount}
                                                   classDetail={classDetail}/>
                                    </div>
                                )
                            }
                            <div className="col-sm-12">
                                <ClassMembers members={membersRoleIsMember} classDetail={classDetail}
                                              membersIsTeacher={false} openModalLeaveClass={this.openModalLeaveClass}/>
                            </div>
                            <LeaveClassWarningModal
                                modalIsOpen={this.state.modalLeaveClassWarningIsOpen}
                                closeModal={this.closeModalLeaveClass}
                                onSubmit={
                                    () => this.handleDeleteMember(classDetail, this.state.memberIdLeave)
                                }
                                classDetail={classDetail}
                                userFullNameLeave={this.state.userFullNameLeave}/>
                        </div>
                    </div>
                </div>
                {this.state.fireRedirect && (
                    <Redirect to={this.state.linkRedirect}/>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classId = ownProps.match.params.classId
    const {classDetail, topics, members} = state.classes
    const {currentUser} = state.authentication
    return {
        classId,
        topics,
        classDetail,
        members,
        currentUser
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassMembersPage));