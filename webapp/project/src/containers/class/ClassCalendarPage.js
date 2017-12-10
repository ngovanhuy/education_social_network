import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import '../../components/class/class.css'
import ClassCalendar from "../../components/class/ClassCalendar";
import {classActions, eventActions} from "../../actions";
import {eventUtils} from '../../utils'

class ClassCalendarPage extends Component {
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
        const {classDetail, classId, topics} = this.props
        var {eventsByClass} = this.props
        var eventsByClassAfterUpdateInfo = eventUtils.updateInfoEvents(eventsByClass)
        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <ClassLeftmenu classDetail={classDetail} topics={topics}
                                           classId={classId} currentPage="calendar"/>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="row">
                            <ClassCalendar events={eventsByClassAfterUpdateInfo} classDetail={classDetail}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classId = ownProps.match.params.classId
    const {classDetail, topics} = state.classes
    const {currentUser} = state.authentication
    const {eventsByClass} = state.events
    return {
        classId,
        classDetail,
        topics,
        currentUser,
        eventsByClass
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassCalendarPage));