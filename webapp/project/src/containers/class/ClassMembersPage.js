import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import '../../components/class/class.css'
import ClassMembers from "../../components/class/ClassMembers";
import AddMember from "../../components/class/views/AddMember";
import {classActions} from "../../actions";
import {classConstants} from "../../constants";

class ClassMembersPage extends Component{

    static defaultProps = {
        // classDetail: {
        //     coverPhotoUrl: '/images/cover_photo.jpg',
        //     fullName: 'Chung ta la Anh em',
        //     memberCount: 489,
        //     description: 'Mục tiêu của group: Tập hợp sinh viên theo học CNTT của ĐHBKHN K60 và các Khóa trên để cùng nhau chia sẻ kinh nghiệm học tập, giải đáp các thắc mắc, bài tập liên quan, chia sẻ tài liệu, giáo trình, tìm nhóm bài tập lớn, tim môn dễ kiếm điểm,... và chém gió ngoài lề cho cuộc đời sinh viên thêm thú vị',
        // },
        topics: [{
            fullName: 'Task 1',
            topicName: 'task_1',
        }, {
            fullName: 'Task 2',
            topicName: 'task_2',
        }, {
            fullName: 'Task 3',
            topicName: 'task_3',
        }],
        teacher: [
            {
                id: "1",
                coverPhotoUrl: "/images/cover_photo.jpg",
                profilePictureUrl: "/images/profile_picture.png",
                name: "NgoVan Huy",
                userName: "ngovanhuy0241"
            }
        ],
        // members: [
        //     {
        //         id: "1",
        //         coverPhotoUrl: "/images/cover_photo.jpg",
        //         profilePictureUrl: "/images/profile_picture.png",
        //         fullName: "NgoVan Huy",
        //         userName: "ngovanhuy0241"
        //     },{
        //         id: "1",
        //         coverPhotoUrl: "/images/cover_photo.jpg",
        //         profilePictureUrl: "/images/profile_picture.png",
        //         fullName: "NgoVan Huy",
        //         userName: "ngovanhuy0241"
        //     },{
        //         id: "1",
        //         coverPhotoUrl: "/images/cover_photo.jpg",
        //         profilePictureUrl: "/images/profile_picture.png",
        //         fullName: "NgoVan Huy",
        //         userName: "ngovanhuy0241"
        //     },{
        //         id: "1",
        //         coverPhotoUrl: "/images/cover_photo.jpg",
        //         profilePictureUrl: "/images/profile_picture.png",
        //         fullName: "NgoVan Huy",
        //         userName: "ngovanhuy0241"
        //     },{
        //         id: "1",
        //         coverPhotoUrl: "/images/cover_photo.jpg",
        //         profilePictureUrl: "/images/profile_picture.png",
        //         fullName: "NgoVan Huy",
        //         userName: "ngovanhuy0241"
        //     }
        // ]
    }

    componentWillMount() {
        const {classId} = this.props;
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getMembers(classId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId) {
            const {classId} = nextProps;
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getMembers(classId));
        }
    }

    render(){
        const {classId, classDetail, topics} = this.props
        const members = (classDetail.members && classDetail.members.length > 0) ?
            classDetail.members.filter(function (member) {
                return member.isAdmin == false
            }) : [];
        const teachers = (classDetail.members && classDetail.members.length > 0) ?
            classDetail.members.filter(function (member) {
                return member.isAdmin == true
            }) : [];
        return(
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <ClassLeftmenu classDetail={classDetail} topics={topics}
                                           classId={classId} currentPage="members"/>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="row">
                                    <ClassMembers members={teachers} classId={classId} classMemberTitle="Teachers"/>
                                </div>
                            </div>
                            <div className="col-sm-3 add-member-and-description">
                               <div className="row">
                                   <div className="container-fluid-md">
                                       <AddMember memberCount={classDetail.memberCount} classId={classId}/>
                                   </div>
                               </div>
                            </div>
                        </div>
                        <div className="row">
                            <ClassMembers members={members} classId={classId} classMemberTitle="Members"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classId = ownProps.match.params.classId
    const {classDetail} = state.classes
    return {
        classId,
        classDetail
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassMembersPage));