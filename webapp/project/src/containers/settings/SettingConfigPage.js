import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import SettingConfig from "../../components/settings/SettingConfig";
import '../../components/settings/setting.css'
import {settingActions} from "../../actions/settingActions";
import {appUtils} from "../../utils";
import {userActions} from "../../actions";

class SettingConfigPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loggedInFb: false,
            fbAccount: {}
        }

        this.responseFacebook = this.responseFacebook.bind(this)
        this.handleDisconnectFBAccount = this.handleDisconnectFBAccount.bind(this)
    }

    componentWillMount() {
        this.props.dispatch(settingActions.getFbAppAccessToken())
        const {currentUser} = this.props
        if (currentUser && currentUser.fbAccount && currentUser.fbAccount.id) {
            this.setState({
                loggedInFb: true,
                fbAccount: currentUser.fbAccount
            })
        } else{
            this.setState({
                loggedInFb: false,
                fbAccount: {}
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser !== this.props.currentUser) {
            const {currentUser} = nextProps
            if (currentUser && currentUser.fbAccount && currentUser.fbAccount.id) {
                this.setState({
                    loggedInFb: true,
                    fbAccount: currentUser.fbAccount
                })
            } else{
                this.setState({
                    loggedInFb: false,
                    fbAccount: {}
                })
            }
        }
    }

    responseFacebook(response) {
        if(response.id){
            const {currentUser} = this.props
            if (currentUser) {
                var tempUser = {...currentUser}
                tempUser.fbAccount = response;
                if(tempUser.gender && tempUser.gender.enum_id != 'undefined'){
                    tempUser.gender = tempUser.gender.enum_id
                }
                if(tempUser.typeuser && tempUser.typeuser.enum_id != 'undefined'){
                    tempUser.typeuser = tempUser.typeuser.enum_id
                }
                this.props.dispatch(userActions.update(tempUser))
            }
            this.setState({
                loggedInFb: true,
                fbAccount: response
            })
        }
    }

    handleDisconnectFBAccount(){
        const {currentUser} = this.props
        if (currentUser) {
            var tempUser = {...currentUser}
            tempUser.fbAccount = {};
            if(tempUser.gender && tempUser.gender.enum_id != 'undefined'){
                tempUser.gender = tempUser.gender.enum_id
            }
            if(tempUser.typeuser && tempUser.typeuser.enum_id != 'undefined'){
                tempUser.typeuser = tempUser.typeuser.enum_id
            }
            this.props.dispatch(userActions.update(tempUser))
        }
        this.setState({
            loggedInFb: false,
            fbAccount: null
        })
    }

    render() {
        const {loggedInFb, fbAccount} = this.state
        return (
            <div className="setting-page">
                <SettingConfig responseFacebook={this.responseFacebook} loggedInFb={loggedInFb} fbAccount={fbAccount}
                               handleDisconnectFBAccount={this.handleDisconnectFBAccount}/>
            </div>
        )

    }
}

function mapStateToProps(state) {
    const {currentUser} = state.authentication
    return {
        currentUser
    };
}

export default withRouter(connect(mapStateToProps)(SettingConfigPage));