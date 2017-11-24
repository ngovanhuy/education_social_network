import React, {Component} from 'react'
import FileInput from '@ranyefet/react-file-input'

import './userProfile.css'
import {defaultConstants} from "../../constants";


class UserProfileTopContent extends Component {
    render() {
        const {user, onUploadProfilePicture, onUploadCoverPhoto} = this.props;
        return (
            <div>
                <div className="top-content-user-profile clearfix">
                    <div className="cover-photo clearfix">
                        <img src={user.coverPhotoUrl ? user.coverPhotoUrl : defaultConstants.USER_COVER_PHOTO_URL}/>
                        <div className="cover-cover-photo">
                            <FileInput name="coverPhoto"
                                       onChange={(event) => onUploadCoverPhoto(event.target.files[0])}>
                                <button>
                                    <i className="fa fa-camera"></i>
                                </button>
                            </FileInput>
                        </div>
                    </div>
                    <div className="profile-picture">
                        <img className="img-circle"
                             src={user.profilePictureUrl ? user.profilePictureUrl : defaultConstants.USER_PROFILE_PICTURE_URL}/>
                        <div className="cover-profile-picture">
                            <FileInput name="profilePicture"
                                       onChange={(event) => onUploadProfilePicture(event.target.files[0])}>
                                <i className="fa fa-camera"></i>
                                Update profile picture
                            </FileInput>
                        </div>
                    </div>
                </div>
                <div className="timeline-headline">
                    <ul className="timeline-nav-top nav navbar-nav">
                        <li><a href="javascript:;">Timeline</a></li>
                        <li><a href="javascript:;">About</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default UserProfileTopContent;