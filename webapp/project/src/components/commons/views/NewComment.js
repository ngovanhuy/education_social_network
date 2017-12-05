import React, {Component} from 'react'
import {connect} from 'react-redux'
import FileInput from '@ranyefet/react-file-input'
import '../common.css'
import {fileUtils} from "../../../utils";
import {defaultConstants, postConstants} from "../../../constants";
import {postActions} from "../../../actions";


class NewComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            fileUpload: {},
            submitted: false,
        }
        this.handChangeCommentPhoto = this.handChangeCommentPhoto.bind(this)
        this.onKeyPress = this.onKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onKeyPress(e) {
        if (e.key == 'Enter') {
            e.preventDefault();

            const {content, fileUpload} = this.state;
            const {post, user} = this.props
            this.setState({submitted: true});

            this.props.dispatch(postActions.insertComment(post.id, user.id, content, fileUpload))

            this.setState({
                ...this.state,
                content: '',
                fileUpload: {}
            })
        }
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handChangeCommentPhoto = (event) => {
        // console.log('Selected file:', event.target.files[0]);
    }

    render() {
        const {post} = this.props
        return (
            <div className="new-comment clearfix">
                <img
                    src={(post && post.userCreate) && fileUtils.renderFileSource(post.userCreate.profilePictureUrl, defaultConstants.USER_PROFILE_PICTURE_URL)}/>
                <form className="navbar-form">
                    <div className="navbar-search">
                        <input type="text" placeholder="Write somthing …" className="form-control" name="content"
                               value={this.state.content} onChange={this.handleChange}
                               onKeyPress={this.onKeyPress}/>
                        {/*<button className="btn" type="submit">*/}
                        {/*<FileInput name="newCommentUploadPhoto" onChange={() => handChangeCommentPhoto()}>*/}
                        {/*<i className="fa fa-file"></i>*/}
                        {/*</FileInput>*/}
                        {/*</button>*/}
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, null)(NewComment)