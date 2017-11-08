import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comment from "./views/Comment";

import './common.css';

class Comments extends Component {
    render(){
        const {comments, post} = this.props
        return(
            <div>
                <div className="comments">
                    <div>
                        <a href="javascript:;">
                            View all comments
                        </a>
                    </div>
                    {
                        comments && comments.length > 0 &&
                        comments.map((comment, index) =>
                            <Comment key={index} comment={comment} post={post}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Comments;

