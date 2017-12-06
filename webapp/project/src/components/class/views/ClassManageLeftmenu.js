import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class ClassManageLeftmenu extends Component {
    renderClassNameCurrentClassManageView(currentView, currentViewLink) {
        if (currentView === currentViewLink) {
            return "class-manage-leftmenu-content current";
        }
        return "class-manage-leftmenu-content";
    }

    render() {
        const {currentViewLink, classId} = this.props
        return (
            <div>
                <div className="ui-box class-manage-leftmenu has-border-radius">
                    <Link to={`/classes/${classId}/mamageClass?currentViewLink=memberRequests`}>
                        <div className={this.renderClassNameCurrentClassManageView("memberRequests", currentViewLink)}>
                            <span>Member Requests</span>
                        </div>
                    </Link>
                    <Link to={`/classes/${classId}/mamageClass?currentViewLink=changeClassDetail`}>
                        <div
                            className={this.renderClassNameCurrentClassManageView("changeClassDetail", currentViewLink)}>
                            <span>Change Info Class</span>
                        </div>
                    </Link>
                    <Link to={`/classes/${classId}/mamageClass?currentViewLink=deleteClass`}>
                        <div
                            className={this.renderClassNameCurrentClassManageView("deleteClass", currentViewLink)}>
                            <span>Delete This Class</span>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default ClassManageLeftmenu;