import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import FileInput from '@ranyefet/react-file-input'
import * as fileUtil from '../../../utils/fileUtils'
import {connect} from 'react-redux'
import {classService} from "../../../services";
import {classActions} from "../../../actions";

class CoverPhotoClass extends Component {
    handleProfilePictureChanged = function (classId, file) {
        classService.updateProfilePicture(classId, file)
            .then(
                this.props.dispatch(classActions.getById(classId))
            )
    }
    render() {
        const {profilePictureUrl, classId} = this.props
        return (
            <div>
                <div className="class-profile-picture">
                    <img src={profilePictureUrl}></img>
                    <div className="cover-profile-picture">
                        <FileInput name="profilePicture"
                                   onChange={(event) => this.handleProfilePictureChanged(classId, event.target.files[0])}>
                            <i className="fa fa-camera"></i>
                            Update profile picture
                        </FileInput>
                    </div>
                </div>
                <div className="action-with-class clearfix">
                    <div className="dropdown">
                        <button data-toggle="dropdown" className="btn btn-white dropdown-toggle" type="button">
                            <span>Joined</span>
                            <span className="caret"></span>
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul role="menu" className="dropdown-menu">
                            <li><a href="javascript:;">Leave Class</a></li>
                        </ul>
                    </div>
                    <div className="dropdown pull-right">
                        <button className="btn btn-white btn-share-class" type="button">
                            <span className="fa fa-share"></span>
                            <span>Share</span>
                        </button>
                        <button data-toggle="dropdown" className="btn btn-white dropdown-toggle btn-manage-class" type="button">
                            <span className="fa fa-ellipsis-h"></span>
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul role="menu" className="dropdown-menu pull-right-xs">
                            <li><a href="javascript:;">Add member</a></li>
                            <li><a href="javascript:;">Manage Requests</a></li>
                            <li className="divider"></li>
                            <li><a href="javascript:;">Report Class</a></li>
                            <li className="divider"></li>
                            <li><a href="javascript:;">Create New Class</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(CoverPhotoClass);
