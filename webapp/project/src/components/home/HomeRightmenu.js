import React, {Component} from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import HomeCalendar from "./views/HomeCalendar";
import HomeNotificationsLatest from "./views/HomeNotificationsNewest";
import HomeSchoolAbout from "./views/HomeSchoolAbout";

class HomeRightmenu extends Component {
    render() {
        const {events, announcements, schoolDetail} = this.props
        return (
            <div className="home-rightmenu">
                <HomeNotificationsLatest announcements={announcements}/>
                <HomeCalendar events={events}/>
                <HomeSchoolAbout schoolDetail={schoolDetail}/>
            </div>
        )
    }
}

export default HomeRightmenu;