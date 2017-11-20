import React, {Component} from 'react'
import EventInfo from "../../commons/views/EventInfo";
import '../event.css'

class EventsAgenda extends Component{

    renderEventDetail = (event, index) => {
        return (
            <div key={index} className="col-sm-12">
                <div className="event-agenda clearfix">
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
                            <button type="button" data-toggle="dropdown" className="btn btn-white dropdown-toggle">
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
            </div>
        )
    }

    render(){
        const {events} = this.props
        return(
            <div>
                {
                    events && events.length > 0 &&
                    events.map((event, index) => this.renderEventDetail(event, index))
                }
            </div>
        )
    }
}

export default EventsAgenda;