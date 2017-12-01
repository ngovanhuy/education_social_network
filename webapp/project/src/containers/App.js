/* eslint-disable no-undef */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Header from "../components/commons/Header";
import {history} from "../helpers/history";
import {userActions} from "../actions";

class App extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        children: PropTypes.node
    }

    componentWillMount(){
        const {loggedIn} = this.props
        let user = JSON.parse(localStorage.getItem('user'))
        if(!loggedIn){
            if(user){
                history.push('/')
            } else {
                this.props.dispatch(userActions.logout());
                const { history } = this.props
                // history.pushState(null, '/login')
                history.replace('/login', null)
            }
        }
    }

    render() {
        const {children, loggedIn} = this.props
        return (
            <div>
                {
                    (loggedIn) ? <Header/> : ''
                }
                <div className="page-content">
                    {children}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const {loggedIn} = state.authentication;
    return {
        loggedIn
    };
}

export default withRouter(connect(mapStateToProps, null)(App))
