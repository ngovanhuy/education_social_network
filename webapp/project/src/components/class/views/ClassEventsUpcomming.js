import React, {Component} from 'react'

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
                    <button className="btn btn-white pull-right">View all</button>
                </div>
            </div>
        )
    }
}

export default ClassEventsUpcomming;