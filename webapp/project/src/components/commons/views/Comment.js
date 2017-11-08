import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import UserProfileInfo from "./UserProfileInfo";
import ReactComment from "./ReactComment";
import NewComment from "./NewComment";

class Comment extends Component{
    render(){
        const {comment, post} = this.props
        var favouritedComment = false, hasReply = true
        return(
            <div className="comment clearfix">
                <div className="comment-user-profile-picture">
                    <img className="img-circle" src={comment.from.user.profilePictureUrl}></img>
                </div>
                <div className="comment-content">
                    <div className="comment-user">
                        <UserProfileInfo user={comment.from.user}/>
                    </div>
                    <span>{comment.message}</span>
                    <ReactComment comment={comment} favouritedComment={favouritedComment}/>
                    {
                        hasReply &&
                        <div className="reply-new-comment">
                            <NewComment post={post}/>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Comment