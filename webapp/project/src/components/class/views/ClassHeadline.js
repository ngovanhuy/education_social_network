import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class ClassHeadline extends Component {
    render() {
        const {classDetail, classId, currentPage} = this.props
        return (
            <div className="class-headline">
                <h1>{classDetail.fullName}</h1>
                <form>
                    <div className="navbar-search">
                        <input type="text" placeholder="Search in this class" className="form-control"/>
                        <button className="btn" type="submit"><i className="fa fa-search"></i></button>
                    </div>
                </form>
                <Link to={`/classes/${classId}`}>
                    <div className={currentPage == "discussion" ? "class-headline-content current" : "class-headline-content"}>
                        <span>Discussion</span>
                    </div>
                </Link>
                <Link to={`/classes/${classId}/members`}>
                    <div className={currentPage == "members" ? "class-headline-content current" : "class-headline-content"}>
                        <span>Members</span>
                    </div>
                </Link>
                <Link to={`/classes/${classId}/events`}>
                    <div className={currentPage == "events" ? "class-headline-content current" : "class-headline-content"}>
                        <span>Events</span>
                    </div>
                </Link>
                <Link to={`/classes/${classId}/calendar`}>
                    <div className={currentPage == "calendar" ? "class-headline-content current" : "class-headline-content"}>
                        <span>Calendar</span>
                    </div>
                </Link>
                <Link to={`/classes/${classId}/files`}>
                    <div className={currentPage == "files" ? "class-headline-content current" : "class-headline-content"}>
                        <span>Files</span>
                    </div>
                </Link>
                <a href="javascript:;">
                    <div className={currentPage == "manage_class" ? "class-headline-content current" : "class-headline-content"}>
                        <span>Manage Class</span>
                    </div>
                </a>
            </div>
        )
    }
}

export default ClassHeadline;