import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class ClassMembersHeadline extends Component {
    render() {
        const {currentHeadline, className} = this.props
        return (
            <div className="class-members-headline container-fluid-md clearfix">
                <div className="clearfix col-sm-12">
                    <ul className="clearfix">
                        <li>
                            <Link to={`/classes/${className}/members`}>
                                <span className={currentHeadline == "members" && 'current'}>Members</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={`/classes/${className}/admins`}>
                                <span className={currentHeadline == "admins" && 'current'}>Admins</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={`/classes/${className}/teachers`}>
                                <span className={currentHeadline == "teachers" && 'current'}>Teachers</span>
                            </Link>
                        </li>
                        <li className="pull-right">
                            <button className="btn btn-default">
                                <i className="fa fa-plus"></i>
                                Add
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ClassMembersHeadline;