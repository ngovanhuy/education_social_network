import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import DevTools from './DevTools'
import {Router, Route, Switch} from 'react-router-dom'
import App from './App'
import HomePage from "./home/HomePage";
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
import {LoginPage} from "./authen/LoginPage";
import {RegisterPage} from "./authen/RegisterPage";
import {PrivateRoute} from "../components/commons/PrivateRoute";
import {history} from "../helpers/history";
import LogoutPage from "./authen/LogoutPage";
import ClassManagePage from "./class/ClassManagePage";
import ClassTopicPage from "./class/ClassTopicPage";
import AnnouncementsPage from "./announcement/AnnouncementsPage";
import AnnouncementDetailPage from "./announcement/AnnouncementDetailPage";
import SettingConfigPage from "./settings/SettingConfigPage";

const Root = ({store}) => (
    <Provider store={store}>
        <div>
            <Router history={history}>
                <div>
                    <Route component={App}/>
                    <Switch history={history}>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/register" component={RegisterPage}/>
                        <Route exact path="/logout" component={LogoutPage}/>
                        <PrivateRoute exact path="/" component={HomePage}/>
                        <PrivateRoute exact path="/users/:userId/about" component={AboutPage}/>
                        <PrivateRoute exact path="/users/:userId" component={UserProfilePage}/>
                        <PrivateRoute exact path="/classes" component={ClassesPage}/>
                        <PrivateRoute exact path="/classes/:classId" component={ClassTimelinePage}/>
                        <PrivateRoute exact path="/classes/:classId/topics/:topicName" component={ClassTopicPage}/>
                        <PrivateRoute exact path="/classes/:classId/files" component={ClassFilePage}/>
                        <PrivateRoute exact path="/classes/:classId/calendar" component={ClassCalendarPage}/>
                        <PrivateRoute exact path="/classes/:classId/events" component={ClassEventPage}/>
                        <PrivateRoute exact path="/classes/:classId/members" component={ClassMembersPage}/>
                        <PrivateRoute exact path="/classes/:classId/admins" component={ClassMembersPage}/>
                        <PrivateRoute exact path="/classes/:classId/teachers" component={ClassMembersPage}/>
                        <PrivateRoute exact path="/classes/:classId/mamageClass" component={ClassManagePage}/>
                        <PrivateRoute exact path="/events" component={EventsPage}/>
                        <PrivateRoute exact path="/events/discovery" component={DiscoveryPage}/>
                        <PrivateRoute exact path="/events/calendar" component={CalendarPage}/>
                        <PrivateRoute exact path="/events/:eventId" component={EventDetailPage}/>
                        <PrivateRoute exact path="/announcements" component={AnnouncementsPage}/>
                        <PrivateRoute exact path="/announcements/:announcementId" component={AnnouncementDetailPage}/>
                        <PrivateRoute exact path="/settings" component={SettingConfigPage}/>
                    </Switch>
                </div>
            </Router>
            <DevTools/>
        </div>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root
