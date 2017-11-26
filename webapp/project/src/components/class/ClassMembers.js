import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserProfileInfo from "../commons/views/UserProfileInfo";
import FileInput from '@ranyefet/react-file-input'
import * as FileUtil from '../../utils/fileUtil'
import ClassMembersHeadline from "./views/ClassMembersHeadline";

class ClassMembers extends Component {

    renderMember = (member, index) => {
        return (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                <div className="panel panel-default panel-member">
                    <div className="panel-body">
                        <a href="#">
                            <div className="text-center panel-member-col">
                                <img src={member.profilePictureUrl} className="img-circle" alt="image"/>

                                <h4 className="thin">
                                    {member.fullName}
                                </h4>
                            </div>
                        </a>
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
                                <p>No members</p>
                            )
                    }
                </div>
            </div>
        )
    }
}

export default ClassMembers;