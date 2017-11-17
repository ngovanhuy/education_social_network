import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import EventInfo from "../commons/views/EventInfo";
import CreateEventModal from "../event/views/CreateEventModal";

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

    renderEventDetail = (event, index) => {
        return (
            <div key={index} className="event clearfix">
                <div className="event-create-time">
                    <b>{event.start.toLocaleDateString()}</b>
                </div>
                <div className="event-detail">
                    <div className="event-name">
                        <EventInfo event={event}/>
                    </div>
                    <div className="event-location">
                        {event.start.toLocaleTimeString()}
                        <span role="presentation" aria-hidden="true"> · </span>
                        {event.location}
                    </div>
                    <div className="action-with-event dropdown">
                        <button type="button" data-toggle="dropdown" className="btn btn-default dropdown-toggle">
                            <i className="fa fa-share"></i>
                            <span className="share-text">Share</span>
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <ul role="menu" className="dropdown-menu">
                            <li><a href="javascript:;">Invite Friends</a></li>
                            <li><a href="javascript:;">Share in message</a></li>
                            <li><a href="javascript:;">Share in new feed</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {events, className, classDetail} = this.props
        return (
            <div className="class-events">
                <CreateEventModal classDetail={classDetail} closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen}/>
                <div className="class-events-calendar-headline clearfix">
                    <ul className="clearfix">
                        <li>
                            <span className="current">Events</span>
                        </li>
                        <li>
                            <Link to={`/classes/${className}/calendar`}>
                                <span>Calendar</span>
                            </Link>
                        </li>
                        <li className="pull-right">
                            <button className="btn btn-default" onClick={this.openModal}>
                                <i className="fa fa-plus"></i>
                                Create event
                            </button>
                        </li>
                    </ul>
                </div>
                {
                    events && events.length > 0 &&
                    events.map((event, index) => this.renderEventDetail(event, index))
                }
            </div>
        )
    }
}

export default ClassEvents;