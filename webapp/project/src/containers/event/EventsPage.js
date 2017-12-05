import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../../components/class/class.css'
import EventRightmenu from "../../components/event/EventRightmenu";
import EventLeftmenu from "../../components/event/EventLeftmenu";
import EventsAgenda from "../../components/event/views/EventsAgenda";
import {eventActions} from "../../actions";

class EventsPage extends Component {
    static defaultProps = {
        // events: [
        //     {
        //         'id': 1,
        //         'title': 'All Day Event very long title',
        //         'allDay': true,
        //         'start': new Date(2015, 3, 0),
        //         'end': new Date(2015, 3, 1),
        //         'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
        //     },
        //     {
        //         'id': 2,
        //         'title': 'Long Event',
        //         'start': new Date(2015, 3, 7),
        //         'end': new Date(2015, 3, 10),
        //         'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
        //     },
        //     {
        //         'id': 3,
        //         'title': 'DTS STARTS',
        //         'start': new Date(2016, 2, 13, 0, 0, 0),
        //         'end': new Date(2016, 2, 20, 0, 0, 0),
        //         'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
        //     },
        //
        //     {
        //         'id': 4,
        //         'title': 'DTS ENDS',
        //         'start': new Date(2016, 10, 6, 0, 0, 0),
        //         'end': new Date(2016, 10, 13, 0, 0, 0),
        //         'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
        //     },
        //     {
        //         'id': 5,
        //         'title': 'Some Event',
        //         'start': new Date(2015, 3, 9, 0, 0, 0),
        //         'end': new Date(2015, 3, 9, 0, 0, 0),
        //         'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
        //     },
        //     {
        //         'id': 1,
        //         'title': 'Conference',
        //         'start': new Date(2015, 3, 11),
        //         'end': new Date(2015, 3, 13),
        //         desc: 'Big conference for important people',
        //         'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
        //     }
        // ]
    }

    componentWillMount() {
        this.props.dispatch(eventActions.getAll());
    }

    render() {
        const {events} = this.props
        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <EventLeftmenu currentPage="events"/>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="row">
                            <div className="events clearfix">
                                <div className="events-header">
                                    <span>Upcomming events</span>
                                </div>
                                <EventsAgenda events={events}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <EventRightmenu/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const events = state.events.items
    const {user} = state.authentication
    return {
        events,
        user
    }
}

export default withRouter(connect(mapStateToProps)(EventsPage));