import React, {Component} from 'react'
import ClassManageMemberRequest from "./ClassManageMemberRequest";
import ClassManageChangeDetail from "./ClassManageChangeDetail";

class ClassManageMainContent extends Component{
    renderMainContent = (currentViewLink) => {
        if(currentViewLink == "memberRequests"){
            return <ClassManageMemberRequest/>
        } else if(currentViewLink == "changeClassDetail"){
            return <ClassManageChangeDetail/>;
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