/* eslint-disable no-undef */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Header from "../components/commons/Header";
import {history} from "../helpers/history";
import {alertAuthenActions} from "../actions/alertAuthenActions";

class App extends Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        history.listen((location, action) => {
            dispatch(alertAuthenActions.clear());
        });
    }

    static propTypes = {
        user: PropTypes.object,
        children: PropTypes.node
    }

    static defaultProps = {
        user: {
            id: 1,
            fullName: "NgoVan Huy",
            profilePictureUrl: "/images/profile_picture.png",
            username: "ngovanhuy0241",
        }
    }

    render() {
        const {children, user, loggedIn} = this.props
        return (
            <div>
                {
                    (loggedIn) ? <Header user={user}/> : ''
                }
                {children}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const {loggedIn, user} = state.authentication;
    return {
        loggedIn
    };
}

export default withRouter(connect(mapStateToProps, null)(App))
