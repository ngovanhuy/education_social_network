import React, {Component} from 'react'
import {connect} from 'react-redux'
import PostAddAttachment from "./PostAddAttachment";
import NewPostFooter from "./NewPostFooter";
import {defaultConstants} from "../../../constants/defaultConstant";
import {fileUtils} from "../../../utils";
import {postConstants} from "../../../constants";
import {postActions, classActions} from "../../../actions";

class PostCreateAnnouncement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            topic: classActions.DEFAULT_ALL_TOPIC,
            fileUpload: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleRemoveUploadFile = this.handleRemoveUploadFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleUploadFile(file) {
        this.setState({
            ...this.state,
            fileUpload: [
                ...this.state.fileUpload,
                file
            ]
        })
    }

    handleRemoveUploadFile(index) {
        this.setState({
            ...this.state,
            fileUpload: this.state.fileUpload.filter((_, i) => i !== index)
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const {classDetail, currentUser} = this.props
        const {title, content, topic, fileUpload} = this.state;
        this.setState({submitted: true});

        this.props.dispatch(
            postActions.insert(
                classDetail.id, currentUser.id, title, content,
                fileUpload, postConstants.SCOPETYPE.IS_PROTECTED,
                topic, false, []
            )
        )
        this.props.dispatch(classActions.getTopics(classDetail.id))

        this.setState({
            ...this.state,
            title: '',
            content: '',
            fileUpload: []
        })
    }

    render() {
        const {classDetail, currentUser} = this.props
        return (
            <form>
                <div className="new-post-content clearfix">
                    <div className="user-create-post">
                        <img
                            src={currentUser && fileUtils.renderFileSource(currentUser.profileImageID, defaultConstants.USER_PROFILE_PICTURE_URL_NONE)}/>
                    </div>
                    <div className="new-post-message controls">
                        <textarea className="form-control" rows="1" placeholder="Title" name="title"
                                  value={this.state.title}
                                  onChange={this.handleChange}></textarea>
                        <textarea className="form-control announcement" rows="4" name="content"
                                  placeholder="Write something"
                                  value={this.state.content}
                                  onChange={this.handleChange}></textarea>
                    </div>
                </div>
                <PostAddAttachment files={this.state.fileUpload} onUploadFile={this.handleUploadFile}
                                   onRemoveUploadFile={this.handleRemoveUploadFile}/>
                {/*<div className="new-post-footer">*/}
                    {/*<a href="#" className="btn btn-primary" onClick={() => this.handleSubmit}>POST</a>*/}
                    {/*<span className="class-full-name">{classDetail.name}</span>*/}
                {/*</div>*/}
                <NewPostFooter className={classDetail.name} onSubmit={this.handleSubmit}/>
            </form>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const {classDetail} = state.classes
    const {currentUser} = state.authentication
    return {
        currentUser,
        classDetail
    }
}

export default connect(mapStateToProps)(PostCreateAnnouncement);
