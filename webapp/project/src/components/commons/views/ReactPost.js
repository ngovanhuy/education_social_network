import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const ReactPost = ({post, favouritedPost}) => {
    const defaultImageDocument = "/images/basic-document.png"

    return(

        <div className="post-reacts clearfix">
            <div className="post-react favourite">
                {
                    favouritedPost ? (
                        <a href="javascript:;" className="favourited">
                            <i className="fa fa-heart-o"></i>
                            <span>Unfavourite</span>
                        </a>
                    ) : (
                        <a href="javascript:;">
                            <i className="fa fa-heart-o"></i>
                            <span>Favourite</span>
                        </a>
                    )
                }
                <span className="badge badge-primary badge-small">{post.favourites.favouriteCount}</span>
            </div>
            <div className="post-react comment">
                <a href="javascript:;">
                    <i className="fa  fa-comment-o"></i>
                    Comment
                </a>
            </div>
            <div className="post-react share dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle" href="javascript:;">
                    <i className="fa fa-share"></i>
                    Share
                </a>
                <ul className="dropdown-menu pull-right-xs">
                    <li className="arrow"></li>
                    <li>
                        <a href="javascript:;">Share to class</a>
                    </li>
                    <li><a href="javascript:;">Send as message</a></li>
                </ul>
            </div>
        </div>
    )
}

ReactPost.propTypes = {
    post: PropTypes.object,
    favouritedPost: PropTypes.bool,
}

export default ReactPost