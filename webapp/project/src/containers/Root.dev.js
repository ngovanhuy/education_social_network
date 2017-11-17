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

const Root = ({store}) => (
    <Provider store={store}>
        <div>
            <Route component={App}/>
            <Switch>
                <Route exact path="/" component={HomePage}> </Route>
                <Route exact path="/users/:userName/about" component={AboutPage}/>
                <Route exact path="/users/:userName" component={UserProfilePage}/>
                <Route exact path="/classes/:className" component={ClassTimelinePage}/>
                <Route exact path="/classes/:className/files" component={ClassFilePage}/>
                <Route exact path="/classes/:className/calendar" component={ClassCalendarPage}/>
                <Route exact path="/classes/:className/events" component={ClassEventPage}/>
                <Route exact path="/classes/:className/members" component={ClassMembersPage}/>
                <Route exact path="/classes/:className/admins" component={ClassMembersPage}/>
                <Route exact path="/classes/:className/teachers" component={ClassMembersPage}/>
            </Switch>
            {/*<DevTools />*/}
        </div>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root
