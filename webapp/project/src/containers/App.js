/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Explore from '../components/Explore'
import { resetErrorMessage } from '../actions'
import Header from "../components/common/Header";

class App extends Component {
  static propTypes = {
      user: PropTypes.object,
    children: PropTypes.node
  }

  static defaultProps = {
      user:{
          fullName: "NgoVan Huy",
          profilePictureUrl: "images/profile_picture.png"
      }
  }

  render() {
    const { children, user } = this.props
    return (
      <div>
        <Header user={user}/>
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
})

export default withRouter(connect(mapStateToProps, {
  resetErrorMessage
})(App))