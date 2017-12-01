import React, {Component} from 'react'
import {connect} from 'react-redux'
import PostAddAttachment from "./PostAddAttachment";
import NewPostFooter from "./NewPostFooter";
import {defaultConstants} from "../../../constants/defaultConstant";
import {fileUtils} from "../../../utils/fileUtils";
import {classActions} from "../../../actions/classActions";

class PostCreateAnnouncement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            classDetail: {},
            title: '',
            content: '',
            topic: '',
            scopeType: '10',
            isSchedule: false,
            files: []
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
            files: [
                ...this.state.files,
                file
            ]
        })
    }

    handleRemoveUploadFile(index) {
        this.setState({
            ...this.state,
            files: this.state.files.filter((_, i) => i !== index)
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)

        // const {classDetail, user, title, content, topic, isSchedule, scopeType} = this.state;
        // this.setState({submitted: true});
        // classActions.insertPost(classDetail.id, user.id, title, content, topic, null, isSchedule, scopeType)
        //     .then(
        //         this.props.dispatch(classActions.getPosts(classDetail.id))
        //     );
        //
        // const { history } = this.props
        // history.push(`/classes/${classDetail.id}`);
    }

    render() {
        const {classDetail, user} = this.props
        return (
            <form>
                <div className="new-post-content clearfix">
                    <div className="user-create-post">
                        <img
                            src={(user && user.profileImageID) ? fileUtils.renderFileSource(user.profileImageID) : defaultConstants.USER_PROFILE_PICTURE_URL}/>
                    </div>
                    <div className="new-post-message controls">
                        <textarea className="form-control" rows="1" placeholder="Title" name="title"
                                  onChange={this.handleChange}></textarea>
                        <textarea className="form-control announcement" rows="4" name="content"
                                  placeholder="Write something"
                                  onChange={this.handleChange}></textarea>
                    </div>
                </div>
                <PostAddAttachment files={this.state.files} onUploadFile={this.handleUploadFile}
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
