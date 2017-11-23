import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../../actions';

class LogoutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(userActions.logout());
        const { history } = this.props
        // history.pushState(null, '/login')
        history.replace('/login', null)
    };

    render(){
        return(
            <div></div>
        )
    }
}

export default connect(null)(LogoutPage);