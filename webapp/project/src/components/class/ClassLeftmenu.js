import React, {Component} from 'react'
import CoverPhotoClass from "./views/ClassCoverPhoto";
import ClassHeadline from "./views/ClassHeadline";
import ClassTopics from "./views/ClassTopics";

const defaultProfilePictureUrl = '/images/cover_photo.jpg'

class ClassLeftmenu extends Component{
    render(){
        var {classDetail, topics, classId, currentPage} = this.props
        if (classDetail && classDetail.coverPhotoUrl){
            classDetail = {
                ...classDetail,
                profilePictureUrl: defaultProfilePictureUrl
            };
        }
        return(
            <div>
                <div className="col-sm-12">
                    <div className="row">
                        <CoverPhotoClass profilePictureUrl={classDetail.profilePictureUrl} classId={classId}/>
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