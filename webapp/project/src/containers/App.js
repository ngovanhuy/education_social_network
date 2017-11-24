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
        // user: PropTypes.object,
        children: PropTypes.node
    }

    static defaultProps = {
        // user: {
        //     id: 1,
        //     fullName: "NgoVan Huy",
        //     profilePictureUrl: "/images/profile_picture.png",
        //     username: "ngovanhuy0241",
        // }
    }

    componentWillMount(){
        const {loggedIn} = this.props
        if(!loggedIn){
            this.props.dispatch(userActions.logout());
            const { history } = this.props
            // history.pushState(null, '/login')
            history.replace('/login', null)
        }
    }

    render() {
        const {children, loggedIn} = this.props
        return (
            <div>
                {
                    (loggedIn) ? <Header/> : ''
                }
                {children}
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
