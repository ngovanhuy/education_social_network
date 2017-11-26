import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import UserProfileInfo from "../commons/views/UserProfileInfo";
import FileInput from '@ranyefet/react-file-input'
import * as FileUtil from '../../utils/fileUtils'
import ClassMembersHeadline from "./views/ClassMembersHeadline";
import {defaultConstants} from "../../constants/defaultConstant";
import {fileUtils} from "../../utils/fileUtils";

class ClassMembers extends Component {

    renderMember = (member, index) => {
        return (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                <div className="panel panel-default panel-member">
                    <div className="panel-body">
                        <Link to={`/users/${member._id}`}>
                            <div className="text-center panel-member-col">
                                <img
                                    src={member.profileImageID ? fileUtils.renderFileSource(member.profileImageID) : defaultConstants.USER_PROFILE_PICTURE_URL}
                                    className="img-circle" alt="image"/>

                                <h4 className="thin">
                                    {member.firstName} {member.lastName}
                                </h4>
                            </div>
                        </Link>
                        <div className="dropdown panel-member-col">
                            <button data-toggle="dropdown" className="btn btn-white dropdown-toggle" type="button">
                                <span className="fa fa-cog"></span>
                                <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul role="menu" className="dropdown-menu pull-right-xs">
                                <li><a href="javascript:;">Remove from Class</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {members, classId, classMemberTitle} = this.props
        return (
            <div className="class-members">
                {/*<ClassMembersHeadline currentHeadline="members" className={className}/>*/}
                <div className="class-members-headline container-fluid-md clearfix">
                    <div className="clearfix col-sm-12">
                        <ul className="clearfix">
                            <li>
                                <span className='current'>{classMemberTitle}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="class-members-content container-fluid-md clearfix">
                    {
                        members && members.length > 0 ?
                            (
                                members.map((member, index) => this.renderMember(member, index))
                            ) :
                            (
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <div className="panel panel-default panel-member">
                                        <div className="panel-body">
                                            <p>No members</p>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}

export default ClassMembers;