import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Post from "./Post";
import NewComment from "./views/NewComment";
import Comments from "./Comments";

class Feed extends Component {
    renderFeedDetail(postDetail, index, contextView) {
        return (
            <div key={index} className="feed-content has-border-radius">
                <Post post={postDetail} contextView={contextView}/>
                <div className="post-new-comment">
                    <NewComment post={postDetail} contextView={contextView}/>
                </div>
                <Comments post={postDetail} contextView={contextView}/>
            </div>
        )
    }

    render() {
        const {feed, contextView} = this.props
        return (
            <div className="feed">
                {
                    (feed && feed.length > 0) ?
                        (
                            feed.map((postDetail, index) =>
                                this.renderFeedDetail(postDetail, index, contextView)
                            )
                        ) :
                        <div className="no-post">No post</div>
                }
            </div>
        )
    }
}

export default Feed;