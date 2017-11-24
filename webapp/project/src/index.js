import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
// import { configureFakeBackend } from './helpers';

const store = configureStore()

// configureFakeBackend();

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
)
