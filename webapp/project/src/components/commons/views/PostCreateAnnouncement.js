import React, {Component} from 'react'
import {connect} from 'react-redux'
import PostAddAttachment from "./PostAddAttachment";
import NewPostFooter from "./NewPostFooter";
import {defaultConstants} from "../../../constants/defaultConstant";
import {fileUtils} from "../../../utils/fileUtils";
import {classActions} from "../../../actions/classActions";
import {postConstants} from "../../../constants";
import {postActions} from "../../../actions";
import {userUtils} from "../../../utils";

class PostCreateAnnouncement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            classDetail: {},
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

    componentWillMount() {
        this.setState({
            classDetail: this.props.classDetail,
            user: this.props.user
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classDetail !== this.props.classDetail ||
            nextProps.user !== this.props.user) {
            this.setState({
                classDetail: nextProps.classDetail,
                user: nextProps.user
            });
        }
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

        const {classDetail, user, title, content, topic, fileUpload} = this.state;
        this.setState({submitted: true});

        this.props.dispatch(
            postActions.insert(
                classDetail.id, user.id, title, content,
                fileUpload, postConstants.SCOPETYPE.IS_PROTECTED,
                topic, false, []
            )
        )
        this.props.dispatch(postActions.getPostsByUserId(user.id))
        this.props.dispatch(postActions.getPostsByClassIdUserId(classDetail.id, user.id))

        this.setState({
            ...this.state,
            title: '',
            content: '',
            fileUpload: []
        })
    }

    render() {
        const {classDetail, user} = this.props
        return (
            <form>
                <div className="new-post-content clearfix">
                    <div className="user-create-post">
                        <img
                            src={user && fileUtils.renderFileSource(user.profileImageID, userUtils.renderSourceProfilePictureDefault(user.gender))}/>
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
                <NewPostFooter className={classDetail.name} onSubmit={this.handleSubmit}/>
            </form>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const {classDetail} = state.classes
    const {user} = state.authentication
    return {
        classDetail,
        user
    }
}

export default connect(mapStateToProps)(PostCreateAnnouncement);
