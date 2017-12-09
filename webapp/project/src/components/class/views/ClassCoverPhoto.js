import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import FileInput from '@ranyefet/react-file-input'
import * as fileUtil from '../../../utils/fileUtils'
import {connect} from 'react-redux'
import {classService} from "../../../services";
import {classActions} from "../../../actions";
import {userService} from "../../../services/userService";
import {userActions} from "../../../actions/userActions";
import {userUtils} from "../../../utils";
import LeaveClassWarningModal from "./LeaveClassWarningModal";
import {Redirect} from 'react-router'

class CoverPhotoClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalLeaveClassWarningIsOpen: false,
            fireRedirect: false,
            linkRedirect: ''
        }
        this.openModalLeaveClass = this.openModalLeaveClass.bind(this);
        this.closeModalLeaveClass = this.closeModalLeaveClass.bind(this);
    }

    openModalLeaveClass() {
        this.setState({modalLeaveClassWarningIsOpen: true});
    }

    closeModalLeaveClass() {
        this.setState({modalLeaveClassWarningIsOpen: false});
    }

    handleProfilePictureChanged = function (classId, file) {
        classService.updateProfilePicture(classId, file)
            .then(
                this.props.dispatch(classActions.getById(classId))
            )
    }

    handleLeaveClass = (classDetail, userId) => {
        var linkRedirect = '/classes'
        this.setState({
            fireRedirect: true,
            linkRedirect: linkRedirect
        })
        this.props.dispatch(classActions.deleteMember(classDetail.id, userId))
        this.props.dispatch(userActions.getClassJoined(userId))
        if (classDetail.memberCount > 1) {
            this.props.dispatch(classActions.getMembers(classDetail.id))
        } else {
            this.props.dispatch(classActions.deleteClass(classDetail.id, userId))
        }
    }

    render() {
        const {profilePictureUrl, classDetail, currentUser} = this.props
        const isTeacher = userUtils.checkIsTeacher(currentUser)
        return (
            <div className="has-border-radius">
                <div className="class-profile-picture">
                    <img src={profilePictureUrl}></img>
                    {
                        isTeacher &&
                        <div className="cover-profile-picture">
                            <FileInput name="profilePicture"
                                       onChange={(event) => this.handleProfilePictureChanged(classDetail.id, event.target.files[0])}>
                                <i className="fa fa-camera"></i>
                                Update profile picture
                            </FileInput>
                        </div>
                    }
                </div>
                <div className="action-with-class clearfix">
                    <div className="dropdown">
                        <button data-toggle="dropdown" className="btn btn-white dropdown-toggle" type="button">
                            <span>Joined</span>
                            <span className="caret"></span>
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul role="menu" className="dropdown-menu">
                            <li><a href="javascript:;" onClick={this.openModalLeaveClass}>Leave Class</a></li>
                            <LeaveClassWarningModal modalIsOpen={this.state.modalLeaveClassWarningIsOpen}
                                                    closeModal={this.closeModalLeaveClass}
                                                    onSubmit={() => this.handleLeaveClass(classDetail, currentUser.id)}
                                                    classDetail={classDetail}/>
                        </ul>
                    </div>
                    {
                        isTeacher &&
                        <div className="dropdown pull-right">
                            {/*<button className="btn btn-white btn-share-class" type="button">*/}
                            {/*<span className="fa fa-share"></span>*/}
                            {/*<span>Share</span>*/}
                            {/*</button>*/}
                            <button data-toggle="dropdown" className="btn btn-white dropdown-toggle btn-manage-class"
                                    type="button">
                                <span className="fa fa-ellipsis-h"></span>
                                <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul role="menu" className="dropdown-menu pull-right-xs">
                                <li><Link to={`/classes/${classDetail.id}/members`}>Add member</Link></li>
                                <li><Link to={`/classes/${classDetail.id}/mamageClass?currentViewLink=memberRequests`}>Manage
                                    Requests</Link></li>
                                {/*<li className="divider"></li>*/}
                                {/*<li><a href="javascript:;">Report Class</a></li>*/}
                                {/*<li className="divider"></li>*/}
                                {/*<li><a href="javascript:;">Create New Class</a></li>*/}
                            </ul>
                        </div>
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

export default connect(mapStateToProps)(CoverPhotoClass);
