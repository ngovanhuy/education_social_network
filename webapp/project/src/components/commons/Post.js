import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import UserProfileInfo from './views/UserProfileInfo'
import {dateUtils} from '../../utils'

import './common.css'
import Attachment from "./views/Attachment";
import ReactPost from "./views/ReactPost";
import Comment from "./views/Comment";

class Post extends Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
    }

    checkUserFavouritePost = (post, user) => {
        var favourited = false;
        if (post.favourites && post.favourites.usersFavourite && post.favourites.usersFavourite.length > 0) {
            for (var i = 0; i < post.favourites.usersFavourite.length; i++) {
                if (post.favourites.usersFavourite[i].id == post.id) {
                    favourited = true;
                    break;
                }
            }
        }

        return favourited;
    }

    render() {
        const {post} = this.props
        var favouritedPost = this.checkUserFavouritePost(post, post.from.user);
        return (
            <div className="post-detail">
                <div className="post-user clearfix">
                    <img className="post-user-profile-picture img-circle" src={post.from.user.profilePictureUrl}></img>
                    <div className="post-user-content">
                        <UserProfileInfo user={post.from.user}/>
                        <div className="post-create-time">{dateUtils.formatDate(post.createTime)}</div>
                    </div>
                    <div className="pull-right">
                        <div className="dropdown">
                            <a data-toggle="dropdown" className="dropdown-toggle" href="javascript:;">
                                <i className="fa fa-angle-down fa-2x"></i>
                            </a>
                            <ul className="dropdown-menu pull-right">
                                <li className="arrow"></li>
                                <li>
                                    <a href="javascript:;">Edit</a>
                                </li>
                                <li><a href="javascript:;">Delete</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="post-content">
                    {post.message}
                    {/*<div className="post-picture">*/}
                        {/*<img src={post.pictureLink}/>*/}
                    {/*</div>*/}
                    <div className="files">
                        {
                            post.attachments && post.attachments.length > 0 &&
                            post.attachments.map(function (attachment, index) {
                                return <Attachment key={index} attachment={attachment}/>
                            })
                        }
                    </div>
                </div>
                <ReactPost post={post} favouritedPost={favouritedPost}/>
            </div>
        )
    }
}

export default Post;