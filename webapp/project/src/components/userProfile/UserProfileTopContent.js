import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import FileInput from '@ranyefet/react-file-input'
import './userProfile.css'
import {defaultConstants} from "../../constants";
import {fileUtils, userUtils} from "../../utils";

class UserProfileTopContent extends Component {
    render() {
        const {user, currentUser, currentLink, onUploadProfilePicture, onUploadCoverPhoto} = this.props;
        const isCurrentUser = user && currentUser && user.id == currentUser.id
        return (
            <div>
                {
                    user &&
                    (
                        <div>
                            <div className="top-content-user-profile clearfix">
                                <div className="cover-photo clearfix">
                                    <img src={user && fileUtils.renderFileSource(user.coverImageID, defaultConstants.USER_COVER_PHOTO_URL)}/>
                                    {
                                        isCurrentUser &&
                                        (
                                            <div className="cover-cover-photo">
                                                <FileInput name="coverPhoto"
                                                           onChange={(event) => onUploadCoverPhoto(event.target.files[0])}>
                                                    <button>
                                                        <i className="fa fa-camera"></i>
                                                    </button>
                                                </FileInput>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="profile-picture img-circle">
                                    <img className="img-circle"
                                         src={user && userUtils.renderProfileImageOfUser(user.id)}/>
                                    {
                                        isCurrentUser &&
                                        <div className="cover-profile-picture">
                                            <FileInput name="profilePicture"
                                                       onChange={(event) => onUploadProfilePicture(event.target.files[0])}>
                                                <i className="fa fa-camera"></i>
                                                Update profile picture
                                            </FileInput>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="timeline-headline">
                                <ul className="timeline-nav-top nav">
                                    <li className={currentLink=="timeline" && "current"}><Link to={`/users/${user.id}`}>Timeline</Link></li>
                                    {
                                        isCurrentUser &&
                                        <li className={currentLink=="about" && "current"}><Link to={`/users/${user.id}/about`}>About</Link></li>
                                    }
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {currentUser} = state.authentication
    return {
        currentUser
    }
}

export default connect(mapStateToProps)(UserProfileTopContent);
