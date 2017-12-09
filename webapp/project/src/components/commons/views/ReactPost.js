import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {classActions, eventActions, postActions} from "../../../actions";
import {postConstants} from "../../../constants";

class ReactPost extends Component {
    constructor(props){
        super(props)
        this.handleFavouritePost = this.handleFavouritePost.bind(this)
        this.handleUnFavouritePost = this.handleUnFavouritePost.bind(this)
        this.loadAllComments = this.loadAllComments.bind(this)
    }

    componentWillMount() {
        const {post, contextView} = this.props;
        this.props.dispatch(postActions.getFavourites(post.id, contextView))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.post.id !== this.props.post.id) {
            const {post, contextView} = nextProps;
            this.props.dispatch(postActions.getFavourites(post.id, contextView))
        }
    }

    loadAllComments(postId){
        const {contextView} = this.props
        this.props.dispatch(postActions.getComments(postId, contextView))
    }

    handleFavouritePost(postId, userId){
        const {contextView} = this.props
        this.props.dispatch(postActions.insertFavourite(postId, userId, contextView))
    }

    handleUnFavouritePost(postId, userId){
        const {contextView} = this.props
        this.props.dispatch(postActions.deleteFavourite(postId, userId, contextView))
    }

    checkUserFavouritePost = (post, user) => {
        var favourited = false;
        if (post.favourites && post.favourites && post.favourites.length > 0 && post.favourites.indexOf(user.id)) {
            favourited = true;
        }
        return favourited;
    }

    render() {
        const {post, currentUser, contextView} = this.props
        var favouritedPost = this.checkUserFavouritePost(post, currentUser);
        return (
            <div className="post-reacts clearfix">
                <div className="post-react favourite">
                    {
                        favouritedPost ? (
                            <a href="javascript:;" className="favourited" onClick={() => this.handleUnFavouritePost(post.id, currentUser.id)}>
                                <i className="fa fa-heart-o"></i>
                                <span>Unfavourite</span>
                            </a>
                        ) : (
                            <a href="javascript:;" onClick={() => this.handleFavouritePost(post.id, currentUser.id)}>
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

const mapStateToProps = (state, ownProps) => {
    const {currentUser} = state.authentication
    return {
        currentUser,
    }
}

export default connect(mapStateToProps)(ReactPost)