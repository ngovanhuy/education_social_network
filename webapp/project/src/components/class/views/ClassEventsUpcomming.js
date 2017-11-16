import React, {Component} from 'react'

class ClassEventsUpcomming extends Component{
    renderEventDetail = (event, index) => {
        return(
            <div key={index} className="event-detail">
                <div className="event-start-time">{event.startTime.toLocaleString()}</div>
                <div className="event-name">{event.eventName}</div>
            </div>
        )
    }

    render(){
        const {events} = this.props
        return(
            <div className="class-events-upcomming clearfix">
                <h3>Events upcomming</h3>
                {
                    events && events.length > 0 ?
                        (
                            events.map((event, index) =>
                                this.renderEventDetail(event, index))
                        ) :
                        (
                            <p>No events</p>
                        )
                }
                <div>
                    <button className="btn btn-default pull-right">View all</button>
                </div>
            </div>
        )
    }
}

export default ClassEventsUpcomming;