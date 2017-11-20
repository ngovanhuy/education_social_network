import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import DevTools from './DevTools'
import {Route, Switch} from 'react-router-dom'
import App from './App'
import HomePage from "./HomePage";
import UserProfilePage from "./userProfile/UserProfilePage";
import AboutPage from "./userProfile/AboutPage";
import ClassTimelinePage from "./class/ClassTimelinePage";
import ClassFilePage from "./class/ClassFilePage";
import ClassCalendarPage from "./class/ClassCalendarPage";
import ClassEventPage from "./class/ClassEventPage";
import ClassMembersPage from "./class/ClassMembersPage";
import EventsPage from "./event/EventsPage";
import CalendarPage from "./event/CalendarPage";
import DiscoveryPage from "./event/DiscoveryPage";
import EventDetailPage from "./event/EventDetailPage";
import ClassesPage from "./class/ClassesPage";

const Root = ({store}) => (
    <Provider store={store}>
        <div>
            <Route component={App}/>
            <Switch>
                <Route exact path="/" component={HomePage}> </Route>
                <Route exact path="/users/:userName/about" component={AboutPage}/>
                <Route exact path="/users/:userName" component={UserProfilePage}/>
                <Route exact path="/classes" component={ClassesPage}/>
                <Route exact path="/classes/:classId" component={ClassTimelinePage}/>
                <Route exact path="/classes/:classId/files" component={ClassFilePage}/>
                <Route exact path="/classes/:classId/calendar" component={ClassCalendarPage}/>
                <Route exact path="/classes/:classId/events" component={ClassEventPage}/>
                <Route exact path="/classes/:classId/members" component={ClassMembersPage}/>
                <Route exact path="/classes/:classId/admins" component={ClassMembersPage}/>
                <Route exact path="/classes/:classId/teachers" component={ClassMembersPage}/>
                <Route exact path="/events" component={EventsPage}/>
                <Route exact path="/events/discovery" component={DiscoveryPage}/>
                <Route exact path="/events/calendar" component={CalendarPage}/>
                <Route exact path="/events/:eventId" component={EventDetailPage}/>
            </Switch>
            {/*<DevTools />*/}
        </div>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root
