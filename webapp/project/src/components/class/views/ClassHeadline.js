import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class ClassHeadline extends Component {
    render() {
        const {classDetail, className} = this.props
        return (
            <div className="class-headline">
                <h1>{classDetail.fullName}</h1>
                <form>
                    <div className="navbar-search">
                        <input type="text" placeholder="Search in this class" className="form-control"/>
                        <button className="btn" type="submit"><i className="fa fa-search"></i></button>
                    </div>
                </form>
                <Link to={`/classes/${className}`}>
                    <div className="class-headline-content">
                        <span>Discussion</span>
                    </div>
                </Link>
                <a href="javascript:;">
                    <div className="class-headline-content">
                        <span>Members</span>
                    </div>
                </a>
                <Link to={`/classes/${className}/events`}>
                    <div className="class-headline-content">
                        <span>Events</span>
                    </div>
                </Link>
                <Link to={`/classes/${className}/calendar`}>
                    <div className="class-headline-content">
                        <span>Calendar</span>
                    </div>
                </Link>
                <Link to={`/classes/${className}/files`}>
                    <div className="class-headline-content">
                        <span>Files</span>
                    </div>
                </Link>
                <a href="javascript:;">
                    <div className="class-headline-content">
                        <span>Manage Class</span>
                    </div>
                </a>
            </div>
        )
    }
}

export default ClassHeadline;