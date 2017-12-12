import React, {Component} from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import CreateEventModal from "../event/views/CreateEventModal";
import ClassEventsCalendarHeadline from "./views/ClassEventsCalendarHeadline";
import {history} from "../../helpers/history";
import {eventActions} from "../../actions";
import {connect} from "react-redux";
import {dateUtils} from "../../utils";
import {eventConstants} from "../../constants";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class ClassCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {modalIsOpen: false}
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleClickEvent = (event) => {
        var url = `/events/${event.id}`
        history.push(url)
    }

    handleCreateEvent = (imageUpload, title, location, content, start, end, frequencyValue, frequencies) => {
        this.setState({modalCreateEventIsOpen: false});
        const {currentUser, classDetail} = this.props
        if(frequencyValue == eventConstants.FREQUENCY.ONCE){
            this.props.dispatch(eventActions.insert(classDetail.id, currentUser.id, imageUpload, title, location,
                content, dateUtils.convertDateTimeToISO(start), dateUtils.convertDateTimeToISO(end)));
        } else {
            var periods = dateUtils.convertFrequencyInfoToEventTimes(frequencyValue, frequencies)
            // console.log(periods)
            var eventStartRequest = {}, eventEndRequest = {}
            if(frequencyValue == eventConstants.FREQUENCY.DAILY){
                eventStartRequest = frequencies.daily.startDate
                eventEndRequest = frequencies.daily.endDate
            } else if(frequencyValue == eventConstants.FREQUENCY.WEEKLY){
                eventStartRequest = frequencies.weekly.startDate
                eventEndRequest = frequencies.weekly.endDate
            }
            this.props.dispatch(eventActions.insertMulti(classDetail.id, currentUser.id, imageUpload, title, location, content,
                dateUtils.convertDateTimeToISO(eventStartRequest), dateUtils.convertDateTimeToISO(eventEndRequest), periods));
        }
    }

    render() {
        const {events, classDetail} = this.props
        return (
            <div className="class-calendar">
                <CreateEventModal classDetail={classDetail} closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen}
                                  onSubmit={this.handleCreateEvent}/>
                <ClassEventsCalendarHeadline classDetail={classDetail} currentPage="calendar" openModal={this.openModal}
                                             onSubmit={this.handleCreateEvent}/>
                <BigCalendar
                    selectable
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

export default connect(mapStateToProps)(ClassCalendar);
