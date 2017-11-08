import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import UserProfileInfo from "./UserProfileInfo";

const ReactComment = ({comment, favouritedComment}) => {
    const {from, createTime, favourites, message} = comment


    return (
        <div className="comment-reacts clearfix">
            <div className="comment-react favourite">
                {
                    favouritedComment ? (
                        <a href="javascript:;" className="favourited">
                            <span>Unfavourite</span>
                        </a>
                    ) : (
                        <a href="javascript:;">
                            <span>Favourite</span>
                        </a>
                    )
                }
            </div>

            <div className="comment-react">
                <a href="javascript:;" className="reply">
                    <span>Reply</span>
                </a>
            </div>

            <div className="comment-react">
                <a href="javascript:;">
                    <i className="fa fa-heart-o"></i>
                    <span className="favourite-count">{favourites.favouriteCount}</span>
                </a>
            </div>

            <div className="comment-react">
                <span className="comment-create-time">{createTime.toLocaleString()}</span>
            </div>
        </div>
    )
}

ReactComment.propTypes = {}

export default ReactComment