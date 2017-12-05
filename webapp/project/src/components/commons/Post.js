import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import UserProfileInfo from './views/UserProfileInfo'
import {dateUtils, fileUtils} from '../../utils'
import './common.css'
import Attachment from "./views/Attachment";
import ReactPost from "./views/ReactPost";
import Comment from "./views/Comment";
import {defaultConstants} from "../../constants";
import {postActions, userActions} from "../../actions";

class Post extends Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
    }

    componentWillMount() {
        const {post} = this.props;
        if(post) {
            this.props.dispatch(postActions.getFavourites(post.id));
        }
    }

    checkUserFavouritePost = (post, user) => {
        var favourited = false;
        if (post.favourites && post.favourites && post.favourites.length > 0 && post.favourites.indexOf(user.id)) {
            favourited = true;
        }
        return favourited;
    }

    render() {
        const {post, user} = this.props
        var favouritedPost = this.checkUserFavouritePost(post, user);
        return (
            <div className="post-detail">
                <div className="post-user clearfix">
                    <img className="post-user-profile-picture img-circle" src={(post && post.userCreate) && fileUtils.renderFileSource(post.userCreate.profileImageID, defaultConstants.USER_PROFILE_PICTURE_URL)}></img>
                    <div className="post-user-content">
                        <UserProfileInfo user={post.userCreate}/>
                        <div className="post-create-time">{post.timeCreate}</div>
                    </div>
                    {/*<div className="pull-right">*/}
                        {/*<div className="dropdown">*/}
                            {/*<a data-toggle="dropdown" className="dropdown-toggle" href="javascript:;">*/}
                                {/*<i className="fa fa-angle-down fa-2x"></i>*/}
                            {/*</a>*/}
                            {/*<ul className="dropdown-menu pull-right">*/}
                                {/*<li className="arrow"></li>*/}
                                {/*<li>*/}
                                    {/*<a href="javascript:;">Edit</a>*/}
                                {/*</li>*/}
                                {/*<li><a href="javascript:;">Delete</a></li>*/}
                            {/*</ul>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
                <div className="post-content-info">
                    <div className="post-title">
                        {post.title}
                    </div>
                    <div className="post-content">
                        {post.content}
                    </div>
                    <div className="files">
                        {
                            post.files && post.files.length > 0 &&
                            post.files.map(function (attachment, index) {
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

const mapStateToProps = (state, ownProps) => {
    const {user} = state.authentication
    return {
        user
    }
}

export default connect(mapStateToProps)(Post);