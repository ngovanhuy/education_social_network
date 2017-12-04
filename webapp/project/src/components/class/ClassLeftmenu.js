import React, {Component} from 'react'
import CoverPhotoClass from "./views/ClassCoverPhoto";
import ClassHeadline from "./views/ClassHeadline";
import ClassTopics from "./views/ClassTopics";
import {defaultConstants} from "../../constants/defaultConstant";
import {fileUtils} from "../../utils/fileUtils";

class ClassLeftmenu extends Component{
    render(){
        const {classDetail, topics, classId, currentPage} = this.props
        return(
            <div className="class-left-menu">
                <div className="col-sm-12">
                    <div className="row">
                        <CoverPhotoClass profilePictureUrl={fileUtils.renderFileSource(classDetail.profileImageID, defaultConstants.CLASS_PROFILE_PICTURE_URL)}
                                         classId={classId}/>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <ClassHeadline classDetail={classDetail} classId={classId}
                            currentPage={currentPage}/>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <ClassTopics topics={topics}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClassLeftmenu;