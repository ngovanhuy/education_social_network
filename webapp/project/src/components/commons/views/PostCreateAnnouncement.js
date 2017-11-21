import React, {Component} from 'react'

class PostCreateAnnouncement extends Component{
    render(){
        return(
            <div className="new-post-content clearfix">
                <div className="user-create-post">
                    <img src="/images/profile_picture.png"/>
                </div>
                <div className="new-post-message controls">
                    <textarea className="form-control announcement" rows="4" placeholder="Write something"></textarea>
                </div>
            </div>
        )
    }
}

export default PostCreateAnnouncement;