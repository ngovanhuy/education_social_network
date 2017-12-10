import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../../components/class/class.css'
import EventLeftmenu from "../../components/event/EventLeftmenu";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import {eventActions} from "../../actions";
import {eventUtils} from "../../utils";
import {history} from "../../helpers/history";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class CalendarPage extends Component {
    componentWillMount() {
        this.props.dispatch(eventActions.getAll());
    }

    handleClickEvent = (event) => {
        var url = `/events/${event.id}`
        history.push(url)
    }

    render() {
        var {events} = this.props
        events = eventUtils.updateInfoEvents(events)
        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <EventLeftmenu currentPage="calendar"/>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="row">
                            <div className="calendar">
                                {
                                    (events && events.length > 0) &&
                                    <BigCalendar
                                        selectable
                                        popup
                                        {...this.props}
                                        events={events}
                                        views={allViews}
                                        step={60}
                                        defaultDate={new Date()}
                                        onSelectEvent={event => this.handleClickEvent(event)}
                                        onSelectSlot={(slotInfo) => alert(
                                            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                                            `\nend: ${slotInfo.end.toLocaleString()}` +
                                            `\naction: ${slotInfo.action}`
                                        )}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const events = state.events.items
    const {currentUser} = state.authentication
    return {
        events,
        currentUser
    }
}

export default withRouter(connect(mapStateToProps)(CalendarPage));