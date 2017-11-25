import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import FileInput from '@ranyefet/react-file-input'
import './userProfile.css'
import {defaultConstants} from "../../constants";

class UserProfileTopContent extends Component {
    render() {
        const {user, currentLink, onUploadProfilePicture, onUploadCoverPhoto} = this.props;
        return (
            <div>
                {
                    user &&
                    (
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
                                    <li className={currentLink=="timeline" && "current"}><Link to={`/users/${user.id}`}>Timeline</Link></li>
                                    <li className={currentLink=="about" && "current"}><Link to={`/users/${user.id}/about`}>About</Link></li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default UserProfileTopContent;