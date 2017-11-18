import React, {Component} from 'react'
import CoverPhotoClass from "./views/ClassCoverPhoto";
import ClassHeadline from "./views/ClassHeadline";
import ClassTopics from "./views/ClassTopics";

class ClassLeftmenu extends Component{
    render(){
        const {classDetail, topics, className, currentPage} = this.props
        return(
            <div>
                <div className="col-sm-12">
                    <div className="row">
                        <CoverPhotoClass coverPhotoUrl={classDetail.coverPhotoUrl} className={className}/>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <ClassHeadline classDetail={classDetail} className={className}
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