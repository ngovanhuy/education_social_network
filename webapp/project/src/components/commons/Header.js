import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './common.css';
import CreateClassModal from "../class/views/CreateClassModal";

class Header extends Component {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    static propTypes = {
        user: PropTypes.object,
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        const {user} = this.props
        return (
            <header>
                <nav className="navbar navbar-default navbar-static-top no-margin" role="navigation">
                    <div className="container">
                        <ul className="nav navbar-nav navbar-nav-expanded">
                            <li>
                                <Link to={`/`}>
                                    <i className="fa fa-home"></i>
                                    <span>Home</span>
                                </Link>
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
                                        <Link to={`/users/${user.id}`}>Profile</Link>
                                    </li>
                                    {/*<li><a href="javascript:;"><span className="badge badge-danger pull-right">2</span> Inbox</a></li>*/}
                                    <li className="divider"></li>
                                    <li>
                                        <Link to={`/classes`}>Classes</Link>
                                    </li>
                                    <li><a href="javascript:;" onClick={this.openModal}>Create class</a></li>
                                    <CreateClassModal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal}/>
                                    <li className="divider"></li>
                                    <li>
                                        <Link to={`/events`}>Events</Link>
                                    </li>
                                    <li className="divider"></li>
                                    <li><a href="javascript:;">Settings</a></li>
                                    <li>
                                        <Link to={`/logout`}>Logout</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header
