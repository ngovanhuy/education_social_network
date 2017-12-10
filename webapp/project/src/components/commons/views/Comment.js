import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import UserProfileInfo from "./UserProfileInfo";
import ReactComment from "./ReactComment";
import NewComment from "./NewComment";
import {dateUtils, fileUtils, userUtils} from "../../../utils";
import {defaultConstants, userConstants} from "../../../constants";

class Comment extends Component {
    render() {
        const {comment, post} = this.props
        var favouritedComment = false, hasReply = false, showReactComment = false
        const user = {
            id: comment.userID,
            firstName: comment.firstName,
            lastName: comment.lastName
        }
        return (
            <div className="comment clearfix">
                <div className="comment-user-profile-picture">
                    <Link to={`/users/${user.id}`}>
                        <img className="img-circle"
                             src={comment && fileUtils.renderFileSource(comment.profileImageID, defaultConstants.USER_PROFILE_PICTURE_URL_NONE)}></img>
                    </Link>
                </div>
                <div className="comment-content-info">
                    <div className="comment-user">
                        <UserProfileInfo user={user}/>
                    </div>
                    <div className="comment-content">
                        <span>{comment.content}</span>
                    </div>
                    <div className="comment-time">
                        <span>{dateUtils.convertISOToLocaleString(comment.timeUpdate)}</span>
                    </div>
                    {
                        showReactComment &&
                        <ReactComment comment={comment} favouritedComment={favouritedComment}/>
                    }
                    {
                        hasReply &&
                        <div className="reply-new-comment">
                            <NewComment comment={comment} post={post}/>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Comment