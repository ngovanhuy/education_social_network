import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import FileInput from '@ranyefet/react-file-input'
import * as fileUtil from '../../utils/fileUtil'

import './userProfile.css'

class UserProfileTopContent extends Component {
    static propTypes = {
        user: PropTypes.object
    }

    handleCoverPhotoChanged = function (event) {
        console.log('Selected file:', event.target.files[0]);
    }

    handleProfilePictureChanged = function (event) {
        console.log('Selected file:', event.target.files[0]);
    }

    render() {
        const {user} = this.props;
        return (
            <div>
                <div className="top-content-user-profile clearfix">
                    <div className="cover-photo clearfix">
                        <img src={user.coverPhotoUrl}/>
                        <div className="cover-cover-photo">
                            <FileInput name="coverPhoto" onChange={this.handleCoverPhotoChanged}>
                                <button>
                                    <i className="fa fa-camera"></i>
                                </button>
                            </FileInput>
                        </div>
                    </div>
                    <div className="profile-picture">
                        <img className="img-circle" src={user.profilePictureUrl}/>
                        <div className="cover-profile-picture">
                            <FileInput name="profilePicture" onChange={this.handleProfilePictureChanged}>
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
                        <li><a href="javascript:;">Friends</a></li>
                        <li><a href="javascript:;">Photos</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default UserProfileTopContent