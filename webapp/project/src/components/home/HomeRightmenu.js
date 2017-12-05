import React, {Component} from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import HomeCalendar from "./views/HomeCalendar";
import HomeNotificationsLatest from "./views/HomeNotificationsLatest";
import HomeSchoolAbout from "./views/HomeSchoolAbout";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class HomeRightmenu extends Component {
    render() {
        const {events, notifcationsLatest, schoolDetail} = this.props
        return (
            <div className="home-rightmenu">
                <HomeCalendar events={events}/>
                <HomeNotificationsLatest notifcationsLatest={notifcationsLatest}/>
                <HomeSchoolAbout schoolDetail={schoolDetail}/>
            </div>
        )
    }
}

export default HomeRightmenu;