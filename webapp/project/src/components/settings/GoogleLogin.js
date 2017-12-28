/* global gapi */
/* global auth2 */
import React from 'react';

export default class GoogleLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true
        };
    }

    componentDidMount() {
        const {socialId, apiKey, scope} = this.props;
        ((d, s, id, callback) => {
            let js, gs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                this.setState({
                    disabled: false
                });
            } else {
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://apis.google.com/js/api.js';
                gs.parentNode.insertBefore(js, gs);
                js.onload = callback;
            }
        })(document, 'script', 'google-platform', () => {
            gapi.load('client:auth2', () => {
                this.setState({
                    disabled: false
                });
                // gapi.client.init({
                //     apiKey: apiKey,
                //     clientId: socialId,
                //     scope: scope
                // });
            });
        });
    }

    listUpcomingEvents() {
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function (response) {
            var events = response.result.items;
            console.log(events)
        });
    }

    clickHandler() {
        // const auth2 = gapi.auth2.getAuthInstance();
        // auth2.signIn().then(response => this.props.responseHandler(response));
        const {socialId, apiKey, scope} = this.props;
        gapi.auth2.authorize({
            client_id: socialId,
            scope: scope,
            response_type: 'id_token permission code'
        }, function(response) {
            if (response.error) {
                // An error happened!
                return;
            }
            var accessToken = response.access_token;
            var idToken = response.id_token;
            var code = response.code;
            // this.props.responseHandler(response)
            console.log(code)
            console.log(accessToken)
        });
    }

    render() {
        const {
            socialId, scope, fetchBasicProfile, responseHandler,
            children, buttonText
        } = this.props;

        return (
            <button onClick={this.clickHandler.bind(this)}>
                {children}
                {buttonText}
            </button>
        )
    }
}

GoogleLogin.defaultProps = {
    fetchBasicProfile: false,
    scope: 'profile'
}
