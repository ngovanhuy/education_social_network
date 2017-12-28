import React, {Component} from 'react'
import {FacebookLogin} from 'react-facebook-login-component'
import {Link} from 'react-router-dom'
import {FB_APP_ID} from "../../constants";

class SettingConfigFacebook extends Component{
    constructor (props, context) {
        super(props, context);
    }

    render() {
        const {fbAccount, loggedInFb} = this.props
        return (
            <div className="container-fluid-md">
                <div className="row">
                    <div className="col-md-4 col-lg-3">
                        <h4>Kết nối tài khoản Facebook</h4>
                        <p className="text-muted">Gửi các thông báo tới tài khoản facebook của bạn</p>
                    </div>
                    <div className="col-md-8 col-lg-9">
                        <div className="panel panel-default panel-light table-users">
                            <div className="panel-body">
                                <div className="form-group">
                                    <label className="strong control-label">Kết nối tài khoản Facebook</label>
                                    {
                                        !loggedInFb &&
                                        <div className="controls">
                                            <span className="social-button">
                                                <i className="fa fa-facebook"></i>
                                                <FacebookLogin socialId={FB_APP_ID}
                                                               language="en_US"
                                                               scope="public_profile,email"
                                                               responseHandler={this.props.responseFacebook}
                                                               xfbml={true}
                                                               fields="id,email,name"
                                                               version="v2.11"
                                                               className="btn social-login facebook-login"
                                                               buttonText="Login With Facebook"/>
                                            </span>
                                        </div>
                                    }
                                    {
                                        !loggedInFb ?
                                            <p className="fb-first-time text-muted">* Bạn chưa chọn Tài khoản để sử dụng Facebook</p>
                                            :
                                            <div>
                                                <p className="fb-second-time">
                                                    Tài khoản Facebook đã được kết nối:&nbsp;
                                                    <a href={`https://fb.com/${fbAccount.id}`} target='_blank'>{fbAccount.name}</a>
                                                </p>
                                                <div>
                                                    <a href="javascript:;" className="btn btn-danger" onClick={this.props.handleDisconnectFBAccount}>Disconnect Facebook Account</a>
                                                </div>
                                            </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default SettingConfigFacebook;