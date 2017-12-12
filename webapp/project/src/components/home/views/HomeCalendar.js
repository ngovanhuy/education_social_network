import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import {history} from "../../../helpers/history";
import {dateUtils} from "../../../utils";
import {eventConstants} from "../../../constants";
import {eventActions} from "../../../actions";
import {connect} from "react-redux";
import CreateEventModal from "../../event/views/CreateEventModal";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class HomeCalendar extends Component {
    constructor() {
        super()
        this.state = {
            modalCreateEventIsOpen: false,
            startTimeSelected: {},
            endTimeSelected: {}
        }
        this.closeModalCreateEvent = this.closeModalCreateEvent.bind(this);
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
        const {events} = this.props

        return (
            <div className="home-calendar">
                <div className="ui-box has-border-radius">
                    <div className="ui-box-title">
                        <span>Calendar</span>
                        <Link to={`/events/calendar`} className="pull-right">See all</Link>
                    </div>
                    <div className="ui-box-content">
                        {
                            events && events.length > 0 &&
                            <BigCalendar
                                selectable
                                popup
                                {...this.props}
                                events={events}
                                views={['month']}
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
        )
    }
}

function mapStateToProps(state) {
    const {currentUser} = state.authentication;
    return {
        currentUser,
    };
}


export default connect(mapStateToProps)(HomeCalendar);
