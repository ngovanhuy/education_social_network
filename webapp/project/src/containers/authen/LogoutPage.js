import React from 'react';
import {connect} from 'react-redux';

import {userActions} from '../../actions';

class LogoutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(userActions.logout());
        const { history } = this.props
        history.replace('/login', null)
    };

    render(){
        return(
            <div></div>
        )
    }
}

export default connect(null)(LogoutPage);