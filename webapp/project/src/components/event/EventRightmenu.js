import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class EventRightmenu extends Component {
    render() {
        return (
            <div className="find-event">
                <div className="find-event-title">
                    <span>Find events</span>
                </div>
                <div className="find-event-filter-group">
                    <ul>
                        <li className="find-event-filter">
                            <Link to="/events/discovery"><span>Today</span></Link>
                        </li>
                        <li className="find-event-filter">
                            <Link to="/events/discovery"><span>Tomorrow</span></Link>
                        </li>
                        <li className="find-event-filter">
                            <Link to="/events/discovery"><span>This weekend</span></Link>
                        </li>
                        <li className="find-event-filter">
                            <Link to="/events/discovery"><span>Choose date</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default EventRightmenu;