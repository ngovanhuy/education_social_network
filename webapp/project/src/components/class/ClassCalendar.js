import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import CreateEventModal from "../event/views/CreateEventModal";
import ClassEventsCalendarHeadline from "./views/ClassEventsCalendarHeadline";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class ClassCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {modalIsOpen: false}
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        const {events, className, classDetail} = this.props
        return (
            <div className="class-calendar">
                <CreateEventModal classDetail={classDetail} closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen}/>
                <ClassEventsCalendarHeadline className={className} currentPage="calendar" openModal={this.openModal}/>
                <BigCalendar
                    selectable
                    {...this.props}
                    events={events}
                    views={allViews}
                    step={60}
                    defaultDate={new Date(2015, 3, 1)}
                    onSelectEvent={event => alert(event.title)}
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

export default ClassCalendar;