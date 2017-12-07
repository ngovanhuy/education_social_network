import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import '../../components/event/event.css'
import ClassEvents from "../../components/class/ClassEvents";
import {classActions, eventActions} from "../../actions";
import {eventUtils} from "../../utils";

class ClassEventPage extends Component {
    componentWillMount() {
        const {classId, user} = this.props;
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getTopics(classId));
        this.props.dispatch(eventActions.getEventsByClassId(classId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId) {
            const {classId, user} = nextProps;
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getTopics(classId));
            this.props.dispatch(eventActions.getEventsByClassId(classId));
        }
    }

    render() {
        const {classDetail, classId} = this.props
        const topics = classDetail.topics
        var {eventsByClass} = this.props
        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <ClassLeftmenu classDetail={classDetail} topics={topics}
                                           classId={classId} currentPage="events"/>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="row">
                            <ClassEvents events={eventsByClass} classId={classId} classDetail={classDetail}/>
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
    const {eventsByClass} = state.events
    return {
        classId,
        classDetail,
        user,
        eventsByClass
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassEventPage));