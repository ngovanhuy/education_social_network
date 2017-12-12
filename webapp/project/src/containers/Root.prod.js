import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import {Router, Route, Switch} from 'react-router-dom'
import App from './App'
import ClassTimelinePage from "./class/ClassTimelinePage";
import AnnouncementDetailPage from "./announcement/AnnouncementDetailPage";
import {LoginPage} from "./authen/LoginPage";
import ClassesPage from "./class/ClassesPage";
import AboutPage from "./userProfile/AboutPage";
import ClassManagePage from "./class/ClassManagePage";
import {history} from "../helpers/history";
import ClassEventPage from "./class/ClassEventPage";
import DiscoveryPage from "./event/DiscoveryPage";
import ClassTopicPage from "./class/ClassTopicPage";
import ClassFilePage from "./class/ClassFilePage";
import EventDetailPage from "./event/EventDetailPage";
import EventsPage from "./event/EventsPage";
import CalendarPage from "./event/CalendarPage";
import LogoutPage from "./authen/LogoutPage";
import ClassMembersPage from "./class/ClassMembersPage";
import HomePage from "./home/HomePage";
import AnnouncementsPage from "./announcement/AnnouncementsPage";
import ClassCalendarPage from "./class/ClassCalendarPage";
import {RegisterPage} from "./authen/RegisterPage";
import UserProfilePage from "./userProfile/UserProfilePage";

const Root = ({ store }) => (
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
                  </Switch>
              </div>
          </Router>
      </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root
