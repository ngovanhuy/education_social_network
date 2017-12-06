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
import {postConstants} from "../../constants";

class ClassTopicPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {classId, topicName} = this.props;
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getTopics(classId));
        this.props.dispatch(postActions.getPostsByClassIdTopicName(classId, topicName));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId ||
            nextProps.topicName !== this.props.topicName) {
            const {classId, topicName} = nextProps;
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getTopics(classId));
            this.props.dispatch(postActions.getPostsByClassIdTopicName(classId, topicName));
        }
    }

    render() {
        const {classDetail, classId, user, topicName} = this.props
        const topics = classDetail.topics
        const isTeacher = userUtils.checkIsTeacher(user)

        var posts = (classDetail && classDetail.postsByTopic) ? classDetail.postsByTopic : []
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
                                <Feed feed={posts} user={user} context={postConstants.CONTEXT_VIEW.IN_CLASS_PAGE}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classId = ownProps.match.params.classId
    const topicName = ownProps.match.params.topicName
    const {classDetail} = state.classes
    const {user} = state.authentication
    return {
        classId,
        topicName,
        classDetail,
        user
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassTopicPage));