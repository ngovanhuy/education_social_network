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
import {defaultConstants, postConstants} from "../../constants";
import {postActions, userActions} from "../../actions";
import ClassInfo from "./views/ClassProfileInfo";

class Post extends Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
    }

    componentWillMount() {
        const {post} = this.props;
        if (post) {
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

    renderContextTopic(topic, index, classDetailOfPost) {
        return (
            <span key={index} className="topic">
                {
                    (classDetailOfPost && classDetailOfPost.id > 0) ?
                        <Link to={`/classes/${classDetailOfPost.id}/topics/${topic}`}>{topic}</Link>
                        : <span>{topic}</span>
                }
            </span>
        )
    }

    render() {
        const {post, user, context} = this.props
        var favouritedPost = this.checkUserFavouritePost(post, user);
        var classDetailOfPost = {
            id: post.group && post.group.id,
            name: post.group && post.group.name,
            profileImageID: post.group && post.group.profileImageID,
        }

        return (
            <div className="post-detail">
                <div className="post-context clearfix">
                    <img className="post-user-profile-picture img-circle"
                         src={(post && post.userCreate) && fileUtils.renderFileSource(post.userCreate.profileImageID, defaultConstants.USER_PROFILE_PICTURE_URL)}></img>
                    <div className="post-context-content">
                        <span className="post-context-user-group">
                            <span className="post-context-user">
                                <UserProfileInfo user={post.userCreate}/>
                            </span>
                            {
                                (
                                    (context == postConstants.CONTEXT_VIEW.IN_HOME_PAGE || context == postConstants.CONTEXT_VIEW.IN_USER_PAGE)
                                    && classDetailOfPost && classDetailOfPost !== {}
                                ) &&
                                <span className="post-context-class">
                                        <i className="post-context-image"><u>to</u></i>
                                        <ClassInfo classDetail={classDetailOfPost}/>
                                    </span>
                            }
                            {
                                post.topics && post.topics.length > 0 &&
                                <span className="post-context-topics">
                                    <i className="post-context-image"><u>to</u></i>
                                        <span>
                                            {
                                                post.topics.map((topic, index) => this.renderContextTopic(topic, index, classDetailOfPost))
                                            }
                                        </span>
                                </span>
                            }
                        </span>
                        <div className="post-create-time">{dateUtils.convertISOToLocaleString(post.timeCreate)}</div>
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