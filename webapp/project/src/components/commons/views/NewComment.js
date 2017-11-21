import React from 'react'
import FileInput from '@ranyefet/react-file-input'

import '../common.css'

const handChange = (event) => {
    // console.log('Selected file:', event.target.files[0]);
}

const NewComment = ({post}) => {
    return (
        <div className="new-comment clearfix">
            <img src={post.from.user.profilePictureUrl}/>
            <form className="navbar-form">
                <div className="navbar-search">
                    <input type="text" placeholder="Write somthing …" className="form-control"/>
                    <button className="btn" type="submit">
                        <FileInput name="newCommentUploadPhoto" onChange={() => handChange()}>
                            <i className="fa fa-file"></i>
                        </FileInput>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewComment