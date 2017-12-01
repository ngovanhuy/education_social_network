import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import {history} from "../../../helpers/history";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class HomeCalendar extends Component {
    handleClickEvent = (event) => {
        var url = `/events/${event.id}`
        history.push(url)
    }

    render() {
        const {events} = this.props
        return (
            <div className="home-calendar">
                <div className="ui-box">
                    <div className="ui-box-title">
                        <span>Calendar</span>
                        <Link to={`/events/calendar`} className="pull-right">See all</Link>
                    </div>
                    <div className="ui-box-content">
                        <BigCalendar
                            selectable
                            popup
                            {...this.props}
                            events={events}
                            views={['month']}
                            step={60}
                            defaultDate={new Date(2015, 3, 1)}
                            onSelectEvent={event => this.handleClickEvent(event)}
                            onSelectSlot={(slotInfo) => alert(
                                `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                                `\nend: ${slotInfo.end.toLocaleString()}` +
                                `\naction: ${slotInfo.action}`
                            )}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeCalendar;