import React, {Component} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import PostAddAttachment from "./PostAddAttachment";
import NewPostFooter from "./NewPostFooter";
import {postActions, classActions, userActions} from "../../../actions";
import {classConstants, defaultConstants} from "../../../constants";
import {dateUtils} from "../../../utils";
import {settingActions} from "../../../actions/settingActions";
import {notificationService} from "../../../services";

const fillMembersInfoForSelectTag = (members) => {
    if (!members || members.length <= 0) {
        return []
    }
    const newMembers = members.slice()
    var newPostUserFor = []
    newPostUserFor = newMembers.map((member) =>
        ({
            value: member.id,
            label: member.firstName + " " + member.lastName
        })
    )
    newPostUserFor.unshift({value: classConstants.DEFAULT_ALL_STUDENT, label: 'All student'});
    return newPostUserFor;
}

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

class PostCreateAssignment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            topic: classConstants.DEFAULT_ALL_TOPIC,
            members: [],
            memberSelected: classConstants.DEFAULT_ALL_STUDENT,
            isSchedule: true,
            scopeType: classConstants.POST_SCOPE_TYPE.PROTECTED,
            startTime: new Date(),
            endTime: new Date(),
            files: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangePostUserFor = this.handleChangePostUserFor.bind(this);
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleRemoveUploadFile = this.handleRemoveUploadFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const {classDetail} = this.props
        this.props.dispatch(userActions.getAll())
        this.props.dispatch(classActions.getMembers(classDetail.id))
        this.props.dispatch(classActions.getTopics(classDetail.id))
        this.props.dispatch(settingActions.getFbAppAccessToken())
    }

    handleChangePostUserFor = (member) => {
        if (!member || member.value === classConstants.DEFAULT_ALL_STUDENT) {
            this.setState({
                scopeType: classConstants.POST_SCOPE_TYPE.PROTECTED,
                memberSelected: classConstants.DEFAULT_ALL_STUDENT
            })
        } else {
            this.setState({
                members: [member.value],
                memberSelected: member.value,
                scopeType: classConstants.POST_SCOPE_TYPE.PRIVATE
            })
        }
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

    handleChangeEndTime(e) {
        this.setState({
            endTime: new Date(e.format("YYYY-MM-DD HH:mm:ss"))
        })
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

        const {classDetail, currentUser} = this.props
        const {title, content, topic, members, isSchedule, scopeType, startTime, endTime, files} = this.state;
        this.setState({submitted: true});

        this.props.dispatch(
            postActions.insert(classDetail.id, currentUser.id, title, content, files, scopeType,
                topic, isSchedule, members, dateUtils.convertDateTimeToISO(startTime), dateUtils.convertDateTimeToISO(endTime))
        )
        // const {fbAccount, fbAppAccessToken} = this.props
        const fbNotification = {
            template: 'Has new assignment with title is ' + title
        }
        // notificationService.createNotificationToFacebook(fbAccount.id, fbAppAccessToken, fbNotification)
        const {users, fbAppAccessToken} = this.props
        if (scopeType === classConstants.POST_SCOPE_TYPE.PROTECTED) {
            for(var i = 0; i < this.props.members.length; i++){
                members.push(this.props.members[i].id);
            }
        }

        if (members && members.length > 0) {
            for (var i = 0; i < members.length; i++) {
                var user = users.find(function (obj) {
                    return obj.id == members[i];
                });
                if (user && user.fbAccount && user.fbAccount.id) {
                    notificationService.createNotificationToFacebook(user.fbAccount.id, fbAppAccessToken, fbNotification)
                }
            }
        }

        this.props.dispatch(classActions.getTopics(classDetail.id))

        this.setState({
            title: '',
            content: '',
            topic: classConstants.DEFAULT_ALL_TOPIC,
            members: [],
            memberSelected: classConstants.DEFAULT_ALL_STUDENT,
            scopeType: classConstants.POST_SCOPE_TYPE.PROTECTED,
            startTime: new Date(),
            endTime: new Date(),
            files: []
        });
    }

    render() {
        const {classDetail, topics, members} = this.props
        const {memberSelected, title, content, endTime, topic, files} = this.state
        const membersOfClass = (members) ? members : []
        const topicsOfClass = (topics) ? topics : []
        var newPostUserFor = fillMembersInfoForSelectTag(membersOfClass)
        var newPostTopicFor = fillTopicsInfoForSelectTag(topicsOfClass)
        return (
            <form className="form-horizontal">
                <div>
                    <div className="new-post-content clearfix">
                        <div className="new-post-message">
                            <div className="form-group">
                                <label className="col-sm-1 control-label">For</label>
                                <div className="col-sm-11">
                                    <Select
                                        name="new-post-user-for"
                                        value={memberSelected}
                                        options={newPostUserFor}
                                        onChange={this.handleChangePostUserFor}
                                    />
                                </div>
                            </div>
                            <div className="form-group controls">
                                <div className="col-sm-11 col-sm-offset-1">
                                    <textarea className="form-control" rows="1" placeholder="Title"
                                              name="title" onChange={this.handleChange}
                                              value={title}></textarea>
                                </div>
                            </div>
                            <div className="form-group controls">
                                <div className="col-sm-11 col-sm-offset-1">
                                <textarea className="form-control content" rows="4"
                                          placeholder="Instructions (optional)" name="content"
                                          onChange={this.handleChange}
                                          value={content}></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-xs-12 col-sm-1">Due</label>
                                <div className='post-end-date col-xs-8 col-sm-4'>
                                    <Datetime inputProps={{readOnly: true}} timeFormat={false} inputFormat="DD/MM/YYYY"
                                              value={endTime}
                                              onChange={this.handleChangeEndTime}/>
                                </div>
                                <div className='post-end-time col-xs-4 col-sm-3'>
                                    <Datetime inputProps={{readOnly: true}} dateFormat={false} value={endTime}
                                              onChange={this.handleChangeEndTime}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-1">Topic</label>
                                <div className="col-sm-11">
                                    <Select
                                        name="new-post-topic-for"
                                        value={topic}
                                        options={newPostTopicFor}
                                        onChange={this.handleChangePostTopicFor}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <PostAddAttachment files={files} onUploadFile={this.handleUploadFile}
                                       onRemoveUploadFile={this.handleRemoveUploadFile}/>
                    {/*<div className="new-post-footer">*/}
                    {/*<a href="#" className="btn btn-primary" onClick={() => this.handleSubmit}>POST</a>*/}
                    {/*<span className="class-full-name">{classDetail.name}</span>*/}
                    {/*</div>*/}
                    <NewPostFooter className={classDetail.name} onSubmit={this.handleSubmit}/>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {classDetail, topics, members} = state.classes
    const {currentUser} = state.authentication
    const users = state.users.items
    const {fbAppAccessToken} = state.settings
    return {
        topics,
        members,
        classDetail,
        currentUser,
        users,
        fbAppAccessToken
    }
}

export default connect(mapStateToProps)(PostCreateAssignment);