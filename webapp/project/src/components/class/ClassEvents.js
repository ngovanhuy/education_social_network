import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import EventInfo from "../commons/views/EventProfileInfo";
import CreateEventModal from "../event/views/CreateEventModal";
import EventsAgenda from "../event/views/EventsAgenda";
import ClassEventsCalendarHeadline from "./views/ClassEventsCalendarHeadline";
import {eventActions} from "../../actions";
import {connect} from "react-redux";

class ClassEvents extends Component {
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

    handleCreateEvent = (imageUpload, title, location, content, start, end) => {
        this.setState({modalCreateEventIsOpen: false});
        const {user, classDetail} = this.props
        this.props.dispatch(eventActions.insert(classDetail.id, user.id, imageUpload, title, location, content, start, end));
    }

    render() {
        const {events, className, classDetail} = this.props
        return (
            <div className="class-events clearfix">
                <CreateEventModal classDetail={classDetail} closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen}
                                  onSubmit={this.handleCreateEvent}/>
                <ClassEventsCalendarHeadline classDetail={classDetail} className={className} currentPage="events" openModal={this.openModal}/>
                <EventsAgenda events={events}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state.authentication;
    return {
        user,
    };
}


export default connect(mapStateToProps)(ClassEvents);
