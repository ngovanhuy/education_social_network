import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ClassInfo from "../commons/views/ClassInfo";
import {defaultConstants} from "../../constants/defaultConstant";
import {fileUtils} from "../../utils/fileUtils";

class Classes extends Component {
    renderClassDetail = (classDetail, index) => {
        return (
            <div key={index} className="col-sm-6">
                <div className="class-detail clearfix">
                    <div className="class-detail-left">
                        <div className="class-profile-picture">
                            <Link to={`/classes/${classDetail.id}`}>
                                <img src={classDetail.profileImageID ? fileUtils.renderFileSource(classDetail.profileImageID) : defaultConstants.CLASS_PROFILE_PICTURE_URL}/>
                            </Link>
                        </div>
                        <div className="class-info">
                            <ClassInfo classDetail={classDetail}/>
                        </div>
                    </div>
                    <div className="button-join">
                        <a className="btn btn-white">
                            <i className="fa fa-plus"></i>
                            Join
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {classes} = this.props
        return (
            <div className="classes-content clearfix">
                {
                    classes && classes.length > 0 ?
                        (
                            classes.map((classDetail, index) => this.renderClassDetail(classDetail, index))
                        ) : ''
                }
            </div>
        )
    }
}

export default Classes;