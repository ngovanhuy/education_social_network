import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import CreateEventModal from "../event/views/CreateEventModal";

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
                <div className="class-calendar-headline clearfix">
                    <ul className="clearfix">
                        <li>
                            <Link to={`/classes/${className}/events`}>
                                <span>Events</span>
                            </Link>
                        </li>
                        <li>
                            <span className="current">Calendar</span>
                        </li>

                        <li className="pull-right">
                            <button className="btn btn-default">
                                <i className="fa fa-plus"></i>
                                Import Calendar
                            </button>
                            <button className="btn btn-default" onClick={this.openModal}>
                                <i className="fa fa-plus"></i>
                                Create event
                            </button>
                        </li>
                    </ul>
                </div>
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