import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../../components/class/class.css'
import EventLeftmenu from "../../components/event/EventLeftmenu";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import {eventActions} from "../../actions";
import {dateUtils, eventUtils} from "../../utils";
import {history} from "../../helpers/history";
import {eventConstants} from "../../constants";
import CreateEventModal from "../../components/event/views/CreateEventModal";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class CalendarPage extends Component {
    constructor() {
        super()
        this.state = {
            modalCreateEventIsOpen: false,
            startTimeSelected: {},
            endTimeSelected: {}
        }
        this.closeModalCreateEvent = this.closeModalCreateEvent.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(eventActions.getAll());
    }

    closeModalCreateEvent() {
        this.setState({modalCreateEventIsOpen: false});
    }

    handleCreateEvent = (imageUpload, title, location, content, start, end, frequencyValue, frequencies) => {
        this.setState({modalCreateEventIsOpen: false});
        const {currentUser} = this.props
        if (frequencyValue == eventConstants.FREQUENCY.ONCE) {
            this.props.dispatch(eventActions.insert(null, currentUser.id, imageUpload, title, location,
                content, dateUtils.convertDateTimeToISO(start), dateUtils.convertDateTimeToISO(end)));
        } else {
            var periods = dateUtils.convertFrequencyInfoToEventTimes(frequencyValue, frequencies)
            // console.log(periods)
            var eventStartRequest = {}, eventEndRequest = {}
            if (frequencyValue == eventConstants.FREQUENCY.DAILY) {
                eventStartRequest = frequencies.daily.startDate
                eventEndRequest = frequencies.daily.endDate
            } else if (frequencyValue == eventConstants.FREQUENCY.WEEKLY) {
                eventStartRequest = frequencies.weekly.startDate
                eventEndRequest = frequencies.weekly.endDate
            }
            this.props.dispatch(eventActions.insertMulti(null, currentUser.id, imageUpload, title, location, content,
                dateUtils.convertDateTimeToISO(eventStartRequest), dateUtils.convertDateTimeToISO(eventEndRequest), periods));
        }
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
                                        onSelectSlot={(slotInfo) => {
                                            this.setState({
                                                startTimeSelected: new Date(slotInfo.start.toLocaleString()),
                                                endTimeSelected: new Date(slotInfo.end.toLocaleString()),
                                                modalCreateEventIsOpen: true
                                            })
                                        }}
                                    />
                                }
                                <CreateEventModal modalIsOpen={this.state.modalCreateEventIsOpen}
                                                  closeModal={this.closeModalCreateEvent}
                                                  onSubmit={this.handleCreateEvent}
                                                  startTimeSelected={this.state.startTimeSelected}
                                                  endTimeSelected={this.state.endTimeSelected}/>
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