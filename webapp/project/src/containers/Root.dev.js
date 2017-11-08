import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { Route } from 'react-router-dom'
import App from './App'
import UserProfile from "./userProfile/UserProfile";
import About from "./userProfile/About";

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Route path="/" component={App} />
      <Route path="/users/:userName" component={UserProfile} />
        <Route path="/users/:userName/about" component={About} />
      {/*<DevTools />*/}
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
