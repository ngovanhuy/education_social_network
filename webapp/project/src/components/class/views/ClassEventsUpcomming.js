import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class ClassEventsUpcomming extends Component{
    renderEventDetail = (event, index) => {
        return(
            <div key={index} className="event-detail">
                <div className="event-start">{event.start.toLocaleString()}</div>
                <div className="event-title">{event.title}</div>
            </div>
        )
    }

    render(){
        const {events, classId} = this.props
        return(
            <div className="class-events-upcomming clearfix">
                <h3>
                    Events upcomming
                    <Link to={`/classes/${classId}/events`}>
                        <span className="pull-right">See all</span>
                    </Link>
                </h3>
                {
                    events && events.length > 0 ?
                        (
                            events.map((event, index) =>
                                this.renderEventDetail(event, index))
                        ) :
                        (
                            <p>No events upcomming</p>
                        )
                }
            </div>
        )
    }
}

export default ClassEventsUpcomming;