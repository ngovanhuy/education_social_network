import React, {Component} from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import HomeCalendar from "./views/HomeCalendar";
import HomeAnnouncementsNewest from "./views/HomeAnnouncementsNewest";
import HomeSchoolAbout from "./views/HomeSchoolAbout";

class HomeRightmenu extends Component {
    render() {
        const {events, announcements, schoolDetail} = this.props
        return (
            <div className="home-rightmenu">
                <HomeAnnouncementsNewest announcements={announcements}/>
                <HomeCalendar events={events}/>
                <HomeSchoolAbout schoolDetail={schoolDetail}/>
            </div>
        )
    }
}

export default HomeRightmenu;