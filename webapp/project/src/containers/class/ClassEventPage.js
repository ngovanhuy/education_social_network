import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import '../../components/event/event.css'
import ClassEvents from "../../components/class/ClassEvents";
import {classActions} from "../../actions";

class ClassEventPage extends Component {
    componentWillMount() {
        const {classId, user} = this.props;
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getTopics(classId));
        this.props.dispatch(classActions.getEvents(classId));
        if(user){
            this.props.dispatch(classActions.getEventsByUser(classId, user.id));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId) {
            const {classId, user} = nextProps;
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getTopics(classId));
            this.props.dispatch(classActions.getEvents(classId));
            if(user){
                this.props.dispatch(classActions.getEventsByUser(classId, user.id));
            }
        }
    }

    static defaultProps = {
        events: [
            {
                id: "1",
                'title': 'All Day Event very long title',
                'allDay': true,
                'start': new Date(2015, 3, 0),
                'end': new Date(2015, 3, 1),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                id: "1",
                'title': 'Long Event',
                'start': new Date(2015, 3, 7),
                'end': new Date(2015, 3, 10),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },

            {
                id: "1",
                'title': 'DTS STARTS',
                'start': new Date(2016, 2, 13, 0, 0, 0),
                'end': new Date(2016, 2, 20, 0, 0, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },

            {
                id: "1",
                'title': 'DTS ENDS',
                'start': new Date(2016, 10, 6, 0, 0, 0),
                'end': new Date(2016, 10, 13, 0, 0, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },

            {
                id: "1",
                'title': 'Some Event',
                'start': new Date(2015, 3, 9, 0, 0, 0),
                'end': new Date(2015, 3, 9, 0, 0, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                id: "1",
                'title': 'Conference',
                'start': new Date(2015, 3, 11),
                'end': new Date(2015, 3, 13),
                desc: 'Big conference for important people',
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                id: "1",
                'title': 'Meeting',
                'start': new Date(2015, 3, 12, 10, 30, 0, 0),
                'end': new Date(2015, 3, 12, 12, 30, 0, 0),
                desc: 'Pre-meeting meeting, to prepare for the meeting',
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                id: "1",
                'title': 'Lunch',
                'start': new Date(2015, 3, 12, 12, 0, 0, 0),
                'end': new Date(2015, 3, 12, 13, 0, 0, 0),
                desc: 'Power lunch',
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                id: "1",
                'title': 'Meeting',
                'start': new Date(2015, 3, 12, 14, 0, 0, 0),
                'end': new Date(2015, 3, 12, 15, 0, 0, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                id: "1",
                'title': 'Happy Hour',
                'start': new Date(2015, 3, 12, 17, 0, 0, 0),
                'end': new Date(2015, 3, 12, 17, 30, 0, 0),
                desc: 'Most important meal of the day',
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                id: "1",
                'title': 'Dinner',
                'start': new Date(2015, 3, 12, 20, 0, 0, 0),
                'end': new Date(2015, 3, 12, 21, 0, 0, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                id: "1",
                'title': 'Birthday Party',
                'start': new Date(2015, 3, 13, 7, 0, 0),
                'end': new Date(2015, 3, 13, 10, 30, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                id: "1",
                'title': 'Birthday Party 2',
                'start': new Date(2015, 3, 13, 7, 0, 0),
                'end': new Date(2015, 3, 13, 10, 30, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                id: "1",
                'title': 'Birthday Party 3',
                'start': new Date(2015, 3, 13, 7, 0, 0),
                'end': new Date(2015, 3, 13, 10, 30, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                id: "1",
                'title': 'Late Night Event',
                'start': new Date(2015, 3, 17, 19, 30, 0),
                'end': new Date(2015, 3, 18, 2, 0, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                id: "1",
                'title': 'Multi-day Event',
                'start': new Date(2015, 3, 20, 19, 30, 0),
                'end': new Date(2015, 3, 22, 2, 0, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            }
        ]
    }

    render() {
        const {classDetail, classId, events} = this.props
        const topics = classDetail.topics
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
                            <ClassEvents events={events} classId={classId} classDetail={classDetail}/>
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

export default withRouter(connect(mapStateToProps, null)(ClassEventPage));