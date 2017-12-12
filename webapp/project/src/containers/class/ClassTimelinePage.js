import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import ClassRightMenu from "../../components/class/ClassRightMenu";
import '../../components/class/class.css'
import NewPost from "../../components/commons/views/NewPost";
import Feed from "../../components/commons/Feed";
import {classActions, eventActions, postActions} from "../../actions";
import {appUtils, userUtils} from "../../utils";
import {postConstants} from "../../constants";
import PageNotFound from "../../components/commons/PageNotFound";

class ClassTimelinePage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {classId, currentUser} = this.props;
        if (currentUser) {
            this.props.dispatch(postActions.getPostsByClassIdUserId(classId, currentUser.id));
        } else {
            var currentUserId = userUtils.getCurrentUserId();
            this.props.dispatch(postActions.getPostsByClassIdUserId(classId, currentUserId));
        }
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getTopics(classId));
        this.props.dispatch(classActions.getFiles(classId));
        this.props.dispatch(eventActions.getEventsUpcommingOfClass(classId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId) {
            const {classId, currentUser} = nextProps;
            if (currentUser) {
                this.props.dispatch(postActions.getPostsByClassIdUserId(classId, currentUser.id));
            }
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getTopics(classId));
            this.props.dispatch(classActions.getFiles(classId));
            this.props.dispatch(eventActions.getEventsUpcommingOfClass(classId));
        }
    }

    render() {
        const {classDetail, classId, currentUser, loading, eventsUpcommingOfClass, postsByUser, topics, files} = this.props
        var recentFiles = (files) ? files : []
        recentFiles = (recentFiles && recentFiles.length > 0) && recentFiles.sort(function (a, b) {
            return new Date(b.createDate) - new Date(a.createDate);
        });
        const isTeacher = userUtils.checkIsTeacher(currentUser)

        var posts = []
        posts = (postsByUser) ? postsByUser : []
        posts = (posts && posts.length > 0) && posts.sort(function (a, b) {
            return new Date(b.timeCreate) - new Date(a.timeCreate);
        });

        var eventsUpcomming = eventsUpcommingOfClass ? [
            ...eventsUpcommingOfClass
        ] : []
        eventsUpcomming = (eventsUpcomming && eventsUpcomming.length > 0) && eventsUpcomming.sort(function (a, b) {
            return new Date(b.startTime) - new Date(a.startTime);
        });
        eventsUpcomming = (eventsUpcomming) ? eventsUpcomming.slice(0, 3) : []

        var topicName = ""

        return (
            <div className="container">
                {
                    (classDetail && classDetail.id) ?
                        <div>
                            <div className="col-sm-4 col-md-3">
                                <ClassLeftmenu classDetail={classDetail} topics={topics}
                                               classId={classId} currentPage="discussion"
                                               currentTopic={topicName}/>
                            </div>
                            <div className="col-sm-8 col-md-6 class-main-content">
                                <div className="row">
                                    <div className="col-xs-12">
                                        <NewPost classDetail={classDetail}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <div className="class-feed clearfix">
                                            <Feed feed={posts} contextView={postConstants.CONTEXT_VIEW.IN_CLASS_PAGE}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8 col-sm-offset-4 col-md-3 col-md-offset-0">
                                <ClassRightMenu classDetail={classDetail} events={eventsUpcomming}
                                                recentFiles={recentFiles}/>
                            </div>
                        </div>
                        : <PageNotFound loading={loading}/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classId = ownProps.match.params.classId
    const {classDetail, postsByUser, topics, files} = state.classes
    const {currentUser} = state.authentication
    const {eventsUpcommingOfClass} = state.events
    var loading = appUtils.checkLoading(state)
    return {
        classId,
        classDetail,
        topics,
        postsByUser,
        currentUser,
        eventsUpcommingOfClass,
        files,
        loading
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassTimelinePage));