import React, {Component} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import PostAddAttachment from "./PostAddAttachment";
import NewPostFooter from "./NewPostFooter";
import {classActions} from "../../../actions/classActions";

const fillInfoForSelectTag = (members) => {
    const newMembers = members.slice()
    var newPostUserFor = []
    newPostUserFor = newMembers.map((member) =>
        ({
            value: member._id,
            label: member.firstName + " " + member.lastName
        })
    )
    newPostUserFor.unshift({value: 'all_student', label: 'All student'});
    return newPostUserFor;
}

class PostCreateAssignment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            classDetail: {},
            title: '',
            content: '',
            topic: '',
            members: [],
            memberSelected: '',
            isSchedule: true,
            scopeType: '100',
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
        const {classDetail, user} = this.props
        this.props.dispatch(classActions.getMembers(classDetail.id))
        this.setState({
            classDetail: classDetail,
            user: user
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

    handleChangePostUserFor = (member) => {
        this.setState({
            members: [member.value],
            memberSelected: member.value
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
        console.log(this.state)
        // const {classDetail, user, title, content, topic, members, isSchedule, scopeType, startTime, endTime } = this.state;
        // this.setState({submitted: true});
        // classService.insertPost(classDetail.id, user.id, title, content, topic, members, isSchedule, scopeType, startTime, endTime)
        //     .then(
        //         this.props.dispatch(classActions.getPosts(classDetail.id))
        //     );
        //
        // const { history } = this.props
        // history.push(`/classes/${classDetail.id}`);
    }

    render() {
        const {classDetail} = this.props
        // const membersOfClass = (classDetail && classDetail.members) ? classDetail.members.filter(function (member) {
        //     return member.isAdmin == false
        // }) : []
        const membersOfClass = (classDetail && classDetail.members) ? classDetail.members : []
        var newPostUserFor = fillInfoForSelectTag(membersOfClass)
        var newPostTopicFor = [
            {value: 'no_topic', label: 'No topic'},
            {value: 'topic_1', label: 'Topic 1'},
            {value: 'topic_2', label: 'Topic 2'},
            {value: 'topic_3', label: 'Topic 3'}
        ];
        return (
            <div>
                <div className="new-post-content clearfix">
                    <form className="form-horizontal">
                        <div className="new-post-message">
                            <div className="form-group">
                                <label className="col-sm-1 control-label">For</label>
                                <div className="col-sm-11">
                                    <Select
                                        name="new-post-user-for"
                                        value={this.state.memberSelected}
                                        options={newPostUserFor}
                                        onChange={this.handleChangePostUserFor}
                                    />
                                </div>
                            </div>
                            <div className="form-group controls">
                                <div className="col-sm-12">
                                    <textarea className="form-control" rows="1" placeholder="Title"
                                              name="title" onChange={this.handleChange}></textarea>
                                </div>
                            </div>
                            <div className="form-group controls">
                                <div className="col-sm-12">
                                <textarea className="form-control" rows="1"
                                          placeholder="Instructions (optional)" name="content"
                                          onChange={this.handleChange}></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-1">Due</label>
                                <div className='post-end-date col-sm-4'>
                                    <Datetime timeFormat={false} inputFormat="DD/MM/YYYY" value={this.state.endTime}
                                              onChange={this.handleChangeEndTime}/>
                                </div>
                                <div className='post-end-time col-sm-3'>
                                    <Datetime dateFormat={false} value={this.state.endTime}
                                              onChange={this.handleChangeEndTime}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-1">Topic</label>
                                <div className="col-sm-11">
                                    <Select
                                        name="new-post-topic-for"
                                        value="no_topic"
                                        options={newPostTopicFor}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <PostAddAttachment files={this.state.files} onUploadFile={this.handleUploadFile}
                                   onRemoveUploadFile={this.handleRemoveUploadFile}/>
                <NewPostFooter className={classDetail.name} onSubmit={this.handleSubmit}/>
            </div>
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

export default connect(mapStateToProps)(PostCreateAssignment);