import React, {Component} from 'react'
import {connect} from 'react-redux'
import FileInput from '@ranyefet/react-file-input'
import '../common.css'
import {fileUtils, userUtils} from "../../../utils";
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
            const {post, currentUser, contextView} = this.props
            this.setState({submitted: true});

            this.props.dispatch(postActions.insertComment(post.id, currentUser.id, content, fileUpload, contextView))

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
        const {post, currentUser, contextView} = this.props
        return (
            <div className="new-comment clearfix">
                <img className="img-circle"
                    src={currentUser && fileUtils.renderFileSource(currentUser.profileImageID, defaultConstants.USER_PROFILE_PICTURE_URL_NONE)}/>
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

const mapStateToProps = (state, ownProps) => {
    const {currentUser} = state.authentication
    return {
        currentUser,
    }
}

export default connect(mapStateToProps)(NewComment)