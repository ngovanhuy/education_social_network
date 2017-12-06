import React, {Component} from 'react'
import EventInfo from "../../commons/views/EventInfo";
import '../event.css'

class EventsPinboard extends Component {

    renderEventDetail = (event, index) => {
        return (
            <div key={index} className="col-sm-3">
                <div className="event-pinboard clearfix">
                    <div className="event-photo">
                        <img src={event.source}/>
                    </div>
                    <div className="event-detail">
                        <div className="event-name">
                            <EventInfo event={event}/>
                        </div>
                        <div className="event-create-time">
                            <i className="fa fa-calendar"></i>
                            <b>{event.start}</b>
                        </div>
                        <div className="event-location">
                            <i className="fa fa-map-marker"></i>
                            {event.location}
                        </div>
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
        )
    }

    render() {
        const {events} = this.props
        return (
            <div className="events-content clearfix">
                {
                    (events && events.length > 0) ?
                        (
                            events.map((event, index) => this.renderEventDetail(event, index))
                        )
                        :
                        (
                            <div className="no-event">
                                No Events
                            </div>
                        )
                }
            </div>
        )
    }
}

export default EventsPinboard;