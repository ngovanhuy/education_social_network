import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../../components/class/class.css'
import EventLeftmenu from "../../components/event/EventLeftmenu";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class CalendarPage extends Component {
    static propTypes = {
        events: PropTypes.array,
    }

    static defaultProps = {
        events: [
            {
                'title': 'All Day Event very long title',
                'allDay': true,
                'start': new Date(2015, 3, 0),
                'end': new Date(2015, 3, 1),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                'title': 'Long Event',
                'start': new Date(2015, 3, 7),
                'end': new Date(2015, 3, 10),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },

            {
                'title': 'DTS STARTS',
                'start': new Date(2016, 2, 13, 0, 0, 0),
                'end': new Date(2016, 2, 20, 0, 0, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },

            {
                'title': 'DTS ENDS',
                'start': new Date(2016, 10, 6, 0, 0, 0),
                'end': new Date(2016, 10, 13, 0, 0, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },

            {
                'title': 'Some Event',
                'start': new Date(2015, 3, 9, 0, 0, 0),
                'end': new Date(2015, 3, 9, 0, 0, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            },
            {
                'title': 'Conference',
                'start': new Date(2015, 3, 11),
                'end': new Date(2015, 3, 13),
                desc: 'Big conference for important people',
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            }
        ]
    }

    render() {
        const {events} = this.props
        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <EventLeftmenu currentPage="calendar"/>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="row">
                            <div className="calendar">
                                <BigCalendar
                                    selectable
                                    {...this.props}
                                    events={events}
                                    views={allViews}
                                    step={60}
                                    defaultDate={new Date(2015, 3, 1)}
                                    onSelectEvent={event => alert(event.title)}
                                    onSelectSlot={(slotInfo) => alert(
                                        `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                                        `\nend: ${slotInfo.end.toLocaleString()}` +
                                        `\naction: ${slotInfo.action}`
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CalendarPage);