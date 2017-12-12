import React, {Component} from 'react'
import ClassManageMemberRequest from "./ClassManageMemberRequest";
import ClassManageChangeDetail from "./ClassManageChangeDetail";
import DeleteClass from "./DeleteClass";

class ClassManageMainContent extends Component{
    renderMainContent = (currentViewLink) => {
        const {classId} = this.props
        if(currentViewLink === "memberRequests"){
            return <ClassManageMemberRequest classId={classId}/>
        } else if(currentViewLink === "changeClassDetail"){
            return <ClassManageChangeDetail classId={classId}/>;
        } else if(currentViewLink === "deleteClass"){
            return <DeleteClass classId={classId}/>;
        }
    }
    render(){
        const{currentViewLink} = this.props
        return(
            <div className="class-manage-main-content">
                {
                    this.renderMainContent(currentViewLink)
                }
            </div>
        )
    }
}

export default ClassManageMainContent;