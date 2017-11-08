import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './common.css';

const Header = ({user}) => {
    const {fullName, profilePictureUrl} = user

    return (
        <header>
            <nav className="navbar navbar-default navbar-static-top no-margin" role="navigation">
                <div className="container">
                    <ul className="nav navbar-nav navbar-nav-expanded">
                        <li>
                            <a href="javascript:;">
                                <i className="fa fa-home"></i>
                                <span>Home</span>
                            </a>
                        </li>
                        <li className="dropdown">
                            <a data-toggle="dropdown" className="dropdown-toggle" href="javascript:;">
                                <i className="glyphicon glyphicon-globe"></i>
                                <span className="badge badge-up badge-danger badge-small">3</span>
                                <span>Notifications</span>
                            </a>
                            <ul className="dropdown-menu dropdown-notifications">
                                <li className="dropdown-title bg-inverse">Notifications (3)</li>
                                <li>
                                    <a href="javascript:;" className="notification">
                                        <div className="notification-thumb pull-left">
                                            <i className="fa fa-clock-o fa-2x text-info"></i>
                                        </div>
                                        <div className="notification-body">
                                            <strong>Call with John</strong><br/>
                                            <small className="text-muted">8 minutes ago</small>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;" className="notification">
                                        <div className="notification-thumb pull-left">
                                            <i className="fa fa-life-ring fa-2x text-warning"></i>
                                        </div>
                                        <div className="notification-body">
                                            <strong>New support ticket</strong><br/>
                                            <small className="text-muted">21 hours ago</small>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;" className="notification">
                                        <div className="notification-thumb pull-left">
                                            <i className="fa fa-exclamation fa-2x text-danger"></i>
                                        </div>
                                        <div className="notification-body">
                                            <strong>Running low on space</strong><br/>
                                            <small className="text-muted">3 days ago</small>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;" className="notification">
                                        <div className="notification-thumb pull-left">
                                            <i className="fa fa-user fa-2x text-muted"></i>
                                        </div>
                                        <div className="notification-body">
                                            New customer registered<br/>
                                            <small className="text-muted">06/18/2014 12:31 am</small>
                                        </div>
                                    </a>
                                </li>
                                <li className="dropdown-footer">
                                    <a href="javascript:;"><i className="fa fa-share"></i> See all notifications</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav text-center">
                        <li className="hidden-xs">
                            <form className="navbar-form">
                                <div className="navbar-search">
                                    <input type="text" placeholder="Search …" className="form-control"/>
                                    <button className="btn" type="submit"><i className="fa fa-search"></i></button>
                                </div>
                            </form>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-nav-expanded pull-right margin-md-right">
                        <li className="dropdown">
                            <a data-toggle="dropdown" className="dropdown-toggle navbar-user" href="javascript:;">
                                <img className="img-circle" src={user.profilePictureUrl}/>
                                <span className="hidden-xs user_full_name">{user.fullName}</span>
                                <b className="caret"></b>
                            </a>
                            <ul className="dropdown-menu pull-right-xs">
                                <li className="arrow"></li>
                                <li>
                                    <Link to={`/users/${user.userName}`}>Profile</Link>
                                </li>
                                {/*<li><a href="javascript:;"><span className="badge badge-danger pull-right">2</span> Inbox</a></li>*/}
                                <li className="divider"></li>
                                <li><a href="javascript:;">Create class</a></li>
                                <li className="divider"></li>
                                <li><a href="javascript:;">Create event</a></li>
                                <li className="divider"></li>
                                <li><a href="javascript:;">Settings</a></li>
                                <li><a href="pages-sign-in.html">Log Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

Header.propTypes = {
    user: PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        profilePictureUrl: PropTypes.string.isRequired,
    }).isRequired
}

export default Header
