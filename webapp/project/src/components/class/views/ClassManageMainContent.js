import React, {Component} from 'react'
import ClassManageMemberRequest from "./ClassManageMemberRequest";
import ClassManageChangeDetail from "./ClassManageChangeDetail";
import DeleteClass from "./DeleteClass";

class ClassManageMainContent extends Component{
    renderMainContent = (currentViewLink) => {
        if(currentViewLink === "memberRequests"){
            return <ClassManageMemberRequest/>
        } else if(currentViewLink === "changeClassDetail"){
            return <ClassManageChangeDetail/>;
        } else if(currentViewLink === "deleteClass"){
            return <DeleteClass/>;
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