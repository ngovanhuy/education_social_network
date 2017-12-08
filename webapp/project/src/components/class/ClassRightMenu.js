import React, {Component} from 'react'
import {connect} from 'react-redux'
import ClassEventsUpcomming from "./views/ClassEventsUpcomming";
import AddMember from "./views/AddMember";
import ClassRecentFiles from "./views/ClassRecentFiles";
import {userUtils} from "../../utils/userUtils";

class ClassRightMenu extends Component{
    render(){
        const {user, classDetail, events, recentFiles} = this.props
        const isTeacher = userUtils.checkIsTeacher(user)
        return(
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <ClassEventsUpcomming events={events} classId={classDetail.id}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="add-member-and-description-and-location has-border-radius">
                            {
                                isTeacher &&
                                (
                                    <AddMember classDetail={classDetail}/>
                                )
                            }
                            <div className="description">
                                <h3>About</h3>
                                <span>{classDetail.about}</span>
                            </div>
                            <div className="location">
                                <h3>Location</h3>
                                <span>{classDetail.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <ClassRecentFiles classId={classDetail.id} recentFiles={recentFiles}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {user} = state.authentication
    return {
        user
    }
}

export default connect(mapStateToProps)(ClassRightMenu);