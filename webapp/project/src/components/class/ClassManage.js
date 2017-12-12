import React, {Component} from 'react'
import ClassManageLeftmenu from "./views/ClassManageLeftmenu";
import ClassManageMainContent from "./views/ClassManageMainContent";

class ClassManage extends Component {
    render() {
        const {currentViewLink, classId} = this.props
        return (
            <div className="class-manage row clearfix">
                <div className="col-sm-4 col-md-3">
                        <ClassManageLeftmenu currentViewLink={currentViewLink} classId={classId}/>
                </div>
                <div className="col-sm-8 col-md-9">
                    <ClassManageMainContent currentViewLink={currentViewLink} classId={classId}/>
                </div>
            </div>
        )
    }
}

export default ClassManage;