import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import ClassRightMenu from "../../components/class/ClassRightMenu";
import '../../components/class/class.css'
import NewPost from "../../components/commons/views/NewPost";
import Feed from "../../components/commons/Feed";
import {classActions, eventActions, postActions} from "../../actions";
import {userUtils} from "../../utils";
import {postConstants} from "../../constants";
import PageNotFound from "../../components/commons/PageNotFound";

class ClassTimelinePage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {classId, user} = this.props;
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getTopics(classId));
        this.props.dispatch(classActions.getFiles(classId));
        this.props.dispatch(eventActions.getEventsUpcommingOfClass(classId));
        if (user) {
            this.props.dispatch(postActions.getPostsByClassIdUserId(classId, user.id));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId) {
            const {classId, user} = nextProps;
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getTopics(classId));
            this.props.dispatch(classActions.getFiles(classId));
            this.props.dispatch(eventActions.getEventsUpcommingOfClass(classId));
            if (user) {
                this.props.dispatch(postActions.getPostsByClassIdUserId(classId, user.id));
            }
        }
    }

    render() {
        const {classDetail, classId, user, error, eventsUpcommingOfClass} = this.props
        const topics = classDetail.topics
        const recentFiles = (classDetail && classDetail.files) ? classDetail.files.slice(0, 3) : []
        const isTeacher = userUtils.checkIsTeacher(user)

        var posts = []
        posts = (classDetail && classDetail.postsByUser) ? classDetail.postsByUser : []
        posts = posts.sort(function (a, b) {
            return new Date(b.timeCreate) - new Date(a.timeCreate);
        });

        var eventsUpcomming = eventsUpcommingOfClass ? [
            ...eventsUpcommingOfClass
        ] : []
        eventsUpcomming = eventsUpcomming.sort(function (a, b) {
            return new Date(b.startTime) - new Date(a.startTime);
        });
        eventsUpcomming = (eventsUpcomming) ? eventsUpcomming.slice(0, 3) : []

        var topicName = ""

        return (
            <div className="container">
                {
                    (classDetail.id || !error) ?
                        <div>
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
                                        <Feed feed={posts} user={user} contextView={postConstants.CONTEXT_VIEW.IN_CLASS_PAGE}/>
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
                        : <PageNotFound/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classId = ownProps.match.params.classId
    const {classDetail, error} = state.classes
    const {user} = state.authentication
    const {eventsUpcommingOfClass} = state.events
    return {
        classId,
        classDetail,
        user,
        eventsUpcommingOfClass,
        error
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassTimelinePage));