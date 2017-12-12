import React, {Component} from 'react'
import ClassManageLeftmenu from "./views/ClassManageLeftmenu";
import ClassManageMainContent from "./views/ClassManageMainContent";

class ClassManage extends Component{
    render(){
        const {currentViewLink, classId} = this.props
        return(
            <div className="class-manage row">
                <div className="col-sm-3">
                    <ClassManageLeftmenu currentViewLink={currentViewLink} classId={classId}/>
                </div>
                <div className="col-sm-9">
                    <ClassManageMainContent currentViewLink={currentViewLink}/>
                </div>
            </div>
        )
    }
}

export default ClassManage;