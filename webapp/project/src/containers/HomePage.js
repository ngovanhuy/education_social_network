import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class HomePage extends Component{

    render(){
        return(
            <div>
                <h1>
                    Home Page
                </h1>
            </div>
        )
    }
}


export default withRouter(HomePage);