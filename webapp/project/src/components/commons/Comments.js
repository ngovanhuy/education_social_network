import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Comment from "./views/Comment";
import './common.css';
import {postActions} from "../../actions";

class Comments extends Component {
    constructor(props){
        super(props)

        this.loadAllComments = this.loadAllComments.bind(this)
    }

    loadAllComments(postId){
        const {contextView} = this.props
        this.props.dispatch(postActions.getComments(postId, contextView))
    }

    render(){
        const {post} = this.props
        return(
            <div>
                <div className="comments">
                    {/*{*/}
                        {/*post.countComments > 0 &&*/}
                        {/*<div>*/}
                            {/*<a href="javascript:;" onClick={() => this.loadAllComments(post.id)}>*/}
                                {/*View all comments*/}
                            {/*</a>*/}
                        {/*</div>*/}
                    {/*}*/}
                    {
                        (post && post.comments && post.comments.length > 0) &&
                        post.comments.map((comment, index) =>
                            <Comment key={index} comment={comment} post={post}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default connect(null)(Comments);

