import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {postActions} from "../../../actions";
import {postConstants} from "../../../constants";

class ReactPost extends Component {
    constructor(props){
        super(props)
        this.handleFavouritePost = this.handleFavouritePost.bind(this)
        this.handleUnFavouritePost = this.handleUnFavouritePost.bind(this)
        this.loadAllComments = this.loadAllComments.bind(this)
    }

    loadAllComments(postId){
        const {contextView} = this.props
        this.props.dispatch(postActions.getComments(postId, contextView))
    }

    handleFavouritePost(post, user){
        const {contextView} = this.props
        this.props.dispatch(postActions.insertFavourite(post, user.id, contextView))
    }

    handleUnFavouritePost(post, user){
        const {contextView} = this.props
        this.props.dispatch(postActions.deleteFavourite(post, user.id, contextView))
    }

    render() {
        const {post, user, favouritedPost, contextView} = this.props
        return (
            <div className="post-reacts clearfix">
                <div className="post-react favourite">
                    {
                        favouritedPost ? (
                            <a href="javascript:;" className="favourited" onClick={() => this.handleUnFavouritePost(post, user)}>
                                <i className="fa fa-heart-o"></i>
                                <span>Unfavourite</span>
                            </a>
                        ) : (
                            <a href="javascript:;" onClick={() => this.handleFavouritePost(post, user)}>
                                <i className="fa fa-heart-o"></i>
                                <span>Favourite</span>
                            </a>
                        )
                    }
                    <span className="badge badge-primary badge-small">{post.countLikes}</span>
                </div>
                <div className="post-react comment">
                    <a href="javascript:;" onClick={() => this.loadAllComments(post.id)}>
                        <i className="fa  fa-comment-o"></i>
                        Comment
                    </a>
                    <span className="badge badge-primary badge-small">{post.countComments}</span>
                </div>
                {/*<div className="post-react share dropdown">*/}
                {/*<a data-toggle="dropdown" className="dropdown-toggle" href="javascript:;">*/}
                {/*<i className="fa fa-share"></i>*/}
                {/*Share*/}
                {/*</a>*/}
                {/*<ul className="dropdown-menu pull-right-xs">*/}
                {/*<li className="arrow"></li>*/}
                {/*<li>*/}
                {/*<a href="javascript:;">Share to class</a>*/}
                {/*</li>*/}
                {/*<li><a href="javascript:;">Send as message</a></li>*/}
                {/*</ul>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default connect(null)(ReactPost)