import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import '../../components/class/class.css'
import Feed from "../../components/commons/Feed";
import {classActions, postActions} from "../../actions";
import {appUtils, userUtils} from "../../utils";
import {postConstants} from "../../constants";
import PageNotFound from "../../components/commons/PageNotFound";

class ClassTopicPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {classId, topicName, currentUser} = this.props;
        var currentUserId = 0
        if (currentUser) {
            currentUserId = currentUser.id
        } else {
            currentUserId = userUtils.getCurrentUserId();
        }
        this.props.dispatch(postActions.getPostsByClassIdUserId(classId, currentUserId, topicName));
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getTopics(classId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId ||
            nextProps.topicName !== this.props.topicName) {
            const {classId, topicName, currentUser} = nextProps;
            this.props.dispatch(postActions.getPostsByClassIdUserId(classId, currentUser.id, topicName));
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getTopics(classId));
        }
    }

    render() {
        const {classDetail, classId, currentUser, topicName, postsByUser, topics, eventsByUser, loading} = this.props
        const isTeacher = userUtils.checkIsTeacher(currentUser)

        var posts = (postsByUser) ? postsByUser : []
        posts = (posts && posts.length > 0) && posts.sort(function (a, b) {
            return new Date(b.timeCreate) - new Date(a.timeCreate);
        });

        var eventsUpcomming = []
        eventsUpcomming = (eventsByUser) ? eventsByUser.slice(0, 3) : []
        return (
            <div>
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
                                    {/*<div className="row">*/}
                                    {/*<NewPost classDetail={classDetail} isTeacher={isTeacher}/>*/}
                                    {/*</div>*/}
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <div className="class-feed clearfix">
                                                <Feed feed={posts}
                                                      contextView={postConstants.CONTEXT_VIEW.IN_CLASS_PAGE}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <PageNotFound loading={loading}/>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classId = ownProps.match.params.classId
    const topicName = ownProps.match.params.topicName
    const {classDetail, postsByUser, topics, eventsByUser} = state.classes
    const {currentUser} = state.authentication
    var loading = appUtils.checkLoading(state)
    return {
        classId,
        topicName,
        topics,
        classDetail,
        postsByUser,
        eventsByUser,
        currentUser,
        loading
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassTopicPage));