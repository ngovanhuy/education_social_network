import React, {Component} from 'react'
import ClassManageMemberRequest from "./ClassManageMemberRequest";
import ClassManageChangeDetail from "./ClassManageChangeDetail";

class ClassManageMainContent extends Component{
    renderMainContent = (currentViewLink, classId, classDetail, memberRequests) => {
        if(currentViewLink == "memberRequests"){
            return <ClassManageMemberRequest memberRequests={memberRequests} classId={classId}/>
        } else if(currentViewLink == "changeClassDetail"){
            return <ClassManageChangeDetail classDetail={classDetail} classId={classId}/>;
        }
    }
    render(){
        const{currentViewLink, classDetail, classId, memberRequests} = this.props
        return(
            <div className="class-manage-main-content">
                {
                    this.renderMainContent(currentViewLink, classId, classDetail, memberRequests)
                }
            </div>
        )
    }
}

export default ClassManageMainContent;