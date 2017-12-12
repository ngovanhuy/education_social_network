import React, {Component} from 'react'
import CreateEventModal from "../event/views/CreateEventModal";
import EventsAgenda from "../event/views/EventsAgenda";
import ClassEventsCalendarHeadline from "./views/ClassEventsCalendarHeadline";
import {eventActions} from "../../actions";
import {connect} from "react-redux";
import {dateUtils} from "../../utils";
import {eventConstants} from "../../constants";

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
    const {currentUser} = state.authentication;
    return {
        currentUser,
    };
}

export default connect(mapStateToProps)(ClassEvents);
