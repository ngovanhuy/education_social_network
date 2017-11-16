import React, {Component} from 'react'
import ClassEventsUpcomming from "./views/ClassEventsUpcomming";
import AddMember from "./views/AddMember";
import ClassRecentFiles from "./views/ClassRecentFiles";

class ClassRightMenu extends Component{
    render(){
        const {classDetail, events, recentFiles} = this.props
        return(
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <ClassEventsUpcomming events={events}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="add-member-and-description">
                            <AddMember memberCount={classDetail.memberCount}/>
                            <h3>Description</h3>
                            <span>{classDetail.description}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <ClassRecentFiles recentFiles={recentFiles}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClassRightMenu;