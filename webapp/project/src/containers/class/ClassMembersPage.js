import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import '../../components/class/class.css'
import ClassMembers from "../../components/class/ClassMembers";
import AddMember from "../../components/class/views/AddMember";
import {classActions} from "../../actions";
import {classConstants} from "../../constants";
import {userUtils} from "../../utils/userUtils";
import {classService, userService} from "../../services";
import {history} from "../../helpers/history";

class ClassMembersPage extends Component {
    constructor(props) {
        super(props)
        this.handleDeleteMember = this.handleDeleteMember.bind(this);
    }

    componentWillMount() {
        const {classId} = this.props;
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

    handleDeleteMember(classId, memberId){
        classService.deleteMember(classId, memberId)
            .then(
                this.props.dispatch(classActions.getById(classId)),
                this.props.dispatch(classActions.getMembers(classId))
            )
    }

    render() {
        const {user, classId, classDetail} = this.props
        const topics = classDetail.topics
        const isTeacher = userUtils.checkIsTeacher(user)
        const members = (classDetail.members && classDetail.members.length > 0) ?
            classDetail.members.filter(function (member) {
                return member.isAdmin == false
            }) : [];
        const teachers = (classDetail.members && classDetail.members.length > 0) ?
            classDetail.members.filter(function (member) {
                return member.isAdmin == true
            }) : [];
        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <ClassLeftmenu classDetail={classDetail} topics={topics}
                                           classId={classId} currentPage="members"/>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="row">
                                    <ClassMembers members={teachers} classId={classId} classMemberTitle="Teachers"
                                                  isTeacher={isTeacher} onDeleteMember={this.handleDeleteMember}/>
                                </div>
                            </div>
                            {
                                isTeacher &&
                                (
                                    <div className="col-sm-3 add-member-and-description">
                                        <div className="row">
                                            <div className="container-fluid-md">
                                                <AddMember memberCount={classDetail.memberCount} classId={classId}/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="row">
                            <ClassMembers members={members} classId={classId} classMemberTitle="Members"
                                          isTeacher={isTeacher} onDeleteMember={this.handleDeleteMember}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classId = ownProps.match.params.classId
    const {classDetail} = state.classes
    const {user} = state.authentication
    return {
        classId,
        classDetail,
        user
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassMembersPage));