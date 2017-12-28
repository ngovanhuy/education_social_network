import React, {Component} from 'react'
import {connect} from 'react-redux'
import PostAddAttachment from "./PostAddAttachment";
import NewPostFooter from "./NewPostFooter";
import {defaultConstants} from "../../../constants/defaultConstant";
import {fileUtils, userUtils} from "../../../utils";
import {classConstants, postConstants} from "../../../constants";
import {postActions, classActions} from "../../../actions";
import Select from 'react-select'
import 'react-select/dist/react-select.css'

const fillTopicsInfoForSelectTag = (topics) => {
    if (!topics || topics.length <= 0) {
        return []
    }
    const newTopics = topics.slice()
    var newTopicFor = []
    newTopicFor = newTopics.map((topic) =>
        ({
            value: topic,
            label: topic
        })
    )
    if (topics.indexOf(classConstants.DEFAULT_ALL_TOPIC) < 0) {
        newTopicFor.unshift({value: classConstants.DEFAULT_ALL_TOPIC, label: 'All topic'});
    }
    return newTopicFor;
}

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
        this.handleChangePostTopicFor = this.handleChangePostTopicFor.bind(this);
    }

    componentWillMount() {
        const {classDetail} = this.props
        this.props.dispatch(classActions.getTopics(classDetail.id))
    }

    handleChangePostTopicFor = (topic) => {
        this.setState({
            topic: topic ? topic.value : classConstants.DEFAULT_ALL_TOPIC
        })
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
            topic: classActions.DEFAULT_ALL_TOPIC,
            fileUpload: []
        })
    }

    render() {
        const {classDetail, currentUser, topics} = this.props
        const topicsOfClass = (topics) ? topics : []
        var newPostTopicFor = fillTopicsInfoForSelectTag(topicsOfClass)
        return (
            <form>
                <div className="new-post-content clearfix">
                    <div className="user-create-post">
                        <img
                            src={currentUser && userUtils.renderProfileImageOfUser(currentUser.id)}/>
                    </div>
                    <div className="new-post-message controls">
                        <textarea className="form-control" rows="1" placeholder="Title" name="title"
                                  value={this.state.title}
                                  onChange={this.handleChange}></textarea>
                        <textarea className="form-control content" rows="4" name="content"
                                  placeholder="Write something"
                                  value={this.state.content}
                                  onChange={this.handleChange}></textarea>
                        <Select
                            name="new-post-topic-for"
                            value={this.state.topic}
                            options={newPostTopicFor}
                            onChange={this.handleChangePostTopicFor}
                        />
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
    const {classDetail, topics} = state.classes
    const {currentUser} = state.authentication
    return {
        currentUser,
        classDetail,
        topics,
    }
}

export default connect(mapStateToProps)(PostCreateAnnouncement);
