import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class ClassEventsCalendarHeadline extends Component {
    render() {
        const {id: classId, currentPage} = this.props

        return (
            <div className="class-events-calendar-headline clearfix">
                <ul className="clearfix">
                    <li>
                        <Link to={`/classes/${classId}/events`}>
                            <span className={currentPage=="events"&&"current"}>Events</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/classes/${classId}/calendar`}>
                            <span className={currentPage=="calendar"&&"current"}>Calendar</span>
                        </Link>
                    </li>

                    <li className="pull-right">
                        <button className="btn btn-white">
                            <i className="fa fa-plus"></i>
                            Import Calendar
                        </button>
                        <button className="btn btn-white" onClick={this.props.openModal}>
                            <i className="fa fa-plus"></i>
                            Create event
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ClassEventsCalendarHeadline;