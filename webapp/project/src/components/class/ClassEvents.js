import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import EventInfo from "../commons/views/EventInfo";
import CreateEventModal from "../event/views/CreateEventModal";
import EventsAgenda from "../event/views/EventsAgenda";
import ClassEventsCalendarHeadline from "./views/ClassEventsCalendarHeadline";

class ClassEvents extends Component {
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
            <div className="class-events clearfix">
                <CreateEventModal classDetail={classDetail} closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen}/>
                <ClassEventsCalendarHeadline classDetail={classDetail} className={className} currentPage="events" openModal={this.openModal}/>
                <EventsAgenda events={events}/>
            </div>
        )
    }
}

export default ClassEvents;