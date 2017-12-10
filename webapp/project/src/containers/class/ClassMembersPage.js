import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Redirect} from 'react-router'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import '../../components/class/class.css'
import ClassMembers from "../../components/class/ClassMembers";
import AddMember from "../../components/class/views/AddMember";
import {classActions} from "../../actions";
import {userUtils} from "../../utils";

class ClassMembersPage extends Component {
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

    render() {
        const {currentUser, classId, classDetail, topics} = this.props
        const isTeacher = userUtils.checkIsTeacher(currentUser)
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
                                    <ClassMembers members={teachers} classDetail={classDetail}
                                                  classMemberTitle="Teachers"/>
                                </div>
                            </div>
                            {
                                isTeacher &&
                                (
                                    <div className="col-sm-3 add-member-and-description">
                                        <div className="row">
                                            <div className="container-fluid-md">
                                                <AddMember memberCount={classDetail.memberCount} classDetail={classDetail}/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="row">
                            <ClassMembers members={members} classDetail={classDetail}
                                          classMemberTitle="Members"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classId = ownProps.match.params.classId
    const {classDetail, topics} = state.classes
    const {currentUser} = state.authentication
    return {
        classId,
        topics,
        classDetail,
        currentUser
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassMembersPage));