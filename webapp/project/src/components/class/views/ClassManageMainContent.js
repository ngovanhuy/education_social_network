import React, {Component} from 'react'
import ClassManageMemberRequest from "./ClassManageMemberRequest";
import ClassManageChangeDetail from "./ClassManageChangeDetail";

class ClassManageMainContent extends Component{
    renderMainContent = (currentViewLink, classId, classDetail, memberRequests, onSubmitChangeDetail, isSubmitting) => {
        if(currentViewLink == "memberRequests"){
            return <ClassManageMemberRequest classId={classId}/>
        } else if(currentViewLink == "changeClassDetail"){
            return <ClassManageChangeDetail/>;
        }
    }
    render(){
        const{currentViewLink, classDetail, classId, memberRequests, onSubmitChangeDetail} = this.props
        return(
            <div className="class-manage-main-content">
                {
                    this.renderMainContent(currentViewLink, classId, classDetail, memberRequests, onSubmitChangeDetail)
                }
            </div>
        )
    }
}

export default ClassManageMainContent;