import React, {Component} from 'react'
// import { GoogleLogin } from 'react-google-login-component';
import {Link} from 'react-router-dom'
import {GG_APP_ID, GG_SECRET_, GG_SECRET_KEY} from "../../constants";
import GoogleLogin from "./GoogleLogin";

class SettingConfigGoogle extends Component{
    constructor (props) {
        super(props);
    }

    render() {
        const {ggAccount, loggedInGg} = this.props
        return (
            <div className="container-fluid-md">
                <div className="row">
                    <div className="col-md-4 col-lg-3">
                        <h4>Kết nối tài khoản Google</h4>
                        <p className="text-muted">Tạo các sự kiện tới tài khoản Google</p>
                    </div>
                    <div className="col-md-8 col-lg-9">
                        <div className="panel panel-default panel-light table-users">
                            <div className="panel-body">
                                <div className="form-group">
                                    <label className="strong control-label">Kết nối tài khoản Google</label>
                                    {
                                        !loggedInGg &&
                                        <div className="controls">
                                            <span className="social-button">
                                                <i className="fa fa-google"></i>
                                                {/*<GoogleLogin socialId={GG_APP_ID}*/}
                                                             {/*apiKey={GG_SECRET_KEY}*/}
                                                             {/*className="btn social-login google-login"*/}
                                                             {/*scope="https://www.googleapis.com/auth/calendar"*/}
                                                             {/*fetchBasicProfile={true}*/}
                                                             {/*responseHandler={this.props.responseGoogle}*/}
                                                             {/*buttonText="Login With Google"/>*/}
                                            </span>
                                        </div>
                                    }
                                    {
                                        !loggedInGg ?
                                            <p className="gg-first-time text-muted">* Bạn chưa chọn Tài khoản để sử dụng Google</p>
                                            :
                                            <div>
                                                <p className="gg-second-time">
                                                    Tài khoản Google đã được kết nối:&nbsp;
                                                    <a href={`https://plus.google.com/${ggAccount.id}`} target='_blank'>{ggAccount.name}</a>
                                                </p>
                                                <div>
                                                    <a href="javascript:;" className="btn btn-danger" onClick={this.props.handleDisconnectGGAccount}>Disconnect Google Account</a>
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

export default SettingConfigGoogle;