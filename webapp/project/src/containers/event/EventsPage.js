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
    componentWillMount() {
        this.props.dispatch(eventActions.getEventsUpcomming());
    }

    render() {
        const {eventsUpcomming} = this.props
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
                                    <span className="events-header-title">Upcomming events</span>
                                </div>
                                <EventsAgenda events={eventsUpcomming}/>
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
    const {eventsUpcomming} = state.events
    const {user} = state.authentication
    return {
        eventsUpcomming,
        user
    }
}

export default withRouter(connect(mapStateToProps)(EventsPage));