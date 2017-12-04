import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import ClassRightMenu from "../../components/class/ClassRightMenu";
import '../../components/class/class.css'
import NewPost from "../../components/commons/views/NewPost";
import Feed from "../../components/commons/Feed";
import {classActions, postActions} from "../../actions";
import {userUtils} from "../../utils";
import queryString from "query-string"

class ClassTimelinePage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const queryStringParsed = queryString.parse(this.props.location.search)
        const topicName = (queryStringParsed && queryStringParsed.topicName) ? queryStringParsed.topicName : ''
        if(topicName){
            this.props.dispatch(postActions.getPostsByClassIdTopicName(classId, topicName))
        }

        const {classId, user} = this.props;
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getTopics(classId));
        this.props.dispatch(classActions.getFiles(classId));
        // this.props.dispatch(postActions.getPostsByClassId(classId));
        // this.props.dispatch(classActions.getEvents(classId));
        if (user) {
            this.props.dispatch(postActions.getPostsByClassIdUserId(classId, user.id));
            // this.props.dispatch(classActions.getEventsByUser(classId, user.id));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId) {
            const queryStringParsed = queryString.parse(this.props.location.search)
            const topicName = (queryStringParsed && queryStringParsed.topicName) ? queryStringParsed.topicName : ''
            if(topicName){
                this.props.dispatch(postActions.getPostsByClassIdTopicName(classId, topicName))
            }

            const {classId, user} = nextProps;
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getTopics(classId));
            this.props.dispatch(classActions.getFiles(classId));
            // this.props.dispatch(postActions.getPostsByClassId(classId));
            if (user) {
                this.props.dispatch(postActions.getPostsByClassIdUserId(classId, user.id));
                // this.props.dispatch(classActions.getEventsByUser(classId, user.id));
            }
        }
    }

    render() {
        const {classDetail, classId, user} = this.props
        const topics = classDetail.topics
        const recentFiles = (classDetail && classDetail.files) ? classDetail.files.slice(0, 3) : []
        const isTeacher = userUtils.checkIsTeacher(user)

        var posts = []
        posts = (classDetail && classDetail.postsByUser) ? classDetail.postsByUser : []

        const queryStringParsed = queryString.parse(this.props.location.search)
        const topicName = (queryStringParsed && queryStringParsed.topicName) ? queryStringParsed.topicName : ''
        if(topicName){
            posts = (classDetail && classDetail.postsByTopic) ? classDetail.postsByTopic : []
        }
        posts = posts.sort(function (a, b) {
            return new Date(b.timeCreate) - new Date(a.timeCreate);
        });

        var eventsUpcomming = []
        eventsUpcomming = (classDetail && classDetail.eventsByUser) ? classDetail.eventsByUser.slice(0, 3) : []
        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <ClassLeftmenu classDetail={classDetail} topics={topics}
                                           classId={classId} currentPage="discussion"
                                            currentTopic={topicName}/>
                        </div>
                    </div>
                    <div className="col-sm-7 class-main-content">
                        <div className="row">
                            <NewPost classDetail={classDetail} isTeacher={isTeacher}/>
                        </div>
                        <div className="row">
                            <div className="class-feed">
                                <Feed feed={posts} user={user}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="row">
                            <ClassRightMenu classDetail={classDetail} events={eventsUpcomming}
                                            recentFiles={recentFiles}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classId = ownProps.match.params.classId
    const {classDetail} = state.classes
    const {user} = state.authentication
    return {
        classId,
        classDetail,
        user
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassTimelinePage));