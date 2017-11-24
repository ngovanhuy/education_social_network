import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import '../../components/class/class.css'
import ClassFiles from "../../components/class/ClassFiles";
import {classActions} from "../../actions";

class ClassFilePage extends Component{

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
        // files: [{
        //     type: "jpg",
        //     typeFile: "jpg",
        //     fileName: "cover_photo.jpg",
        //     source: "/images/cover_photo.jpg",
        //     createTime: new Date(),
        //     from: {
        //         user:{
        //             id: "1",
        //             coverPhotoUrl: "/images/cover_photo.jpg",
        //             profilePictureUrl: "/images/profile_picture.png",
        //             fullName: "NgoVan Huy",
        //             userName: "ngovanhuy0241"
        //         },
        //     },
        // },{
        //     type: "text",
        //     typeFile: "txt",
        //     fileName: "kinhnghiem.txt",
        //     source: "/uploads/kinhnghiem.txt",
        //     createTime: new Date(),
        //     from: {
        //         user:{
        //             id: "1",
        //             coverPhotoUrl: "/images/cover_photo.jpg",
        //             profilePictureUrl: "/images/profile_picture.png",
        //             fullName: "NgoVan Huy",
        //             userName: "ngovanhuy0241"
        //         },
        //     },
        // },{
        //     type: "pdf",
        //     typeFile: "pdf",
        //     fileName: "ZenHabitsbook.pdf",
        //     source: "/uploads/ZenHabitsbook.pdf",
        //     createTime: new Date(),
        //     from: {
        //         user:{
        //             id: "1",
        //             coverPhotoUrl: "/images/cover_photo.jpg",
        //             profilePictureUrl: "/images/profile_picture.png",
        //             fullName: "NgoVan Huy",
        //             userName: "ngovanhuy0241"
        //         },
        //     },
        // }],
    }

    componentWillMount() {
        const {classId} = this.props;
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getFiles(classId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId) {
            const {classId} = nextProps;
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getFiles(classId));
        }
    }

    render(){
        const {classDetail, topics, classId} = this.props
        return(
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <ClassLeftmenu classDetail={classDetail} topics={topics}
                                           classId={classId} currentPage="files"/>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="row">
                            <ClassFiles files={classDetail.files}/>
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

export default withRouter(connect(mapStateToProps, null)(ClassFilePage));