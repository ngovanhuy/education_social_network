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

    componentWillMount() {
        const {loggedIn} = this.props
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.props.dispatch(userActions.loginById(user.id));
        } else {
            this.props.dispatch(userActions.logout());
            history.push('/login')
        }
    }

    render() {
        const {children, currentUser} = this.props
        return (
            <div>
                {
                    (currentUser) ? <Header/> : ''
                }
                <div className="page-content">
                    {children}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const {currentUser} = state.authentication;
    return {
        currentUser
    };
}

export default withRouter(connect(mapStateToProps, null)(App))
