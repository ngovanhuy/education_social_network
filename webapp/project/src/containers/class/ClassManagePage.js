import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import '../../components/class/class.css'
import ClassManage from "../../components/class/ClassManage";
import queryString from "query-string"
import {classActions} from "../../actions/classActions";

class ClassManagePage extends Component {
    constructor() {
        super()
        this.state = {
            currentViewLink: "memberRequests",
        }
    }

    static propTypes = {
        classDetail: PropTypes.object,
        classId: PropTypes.string,
        topics: PropTypes.array,
        currentViewLink: PropTypes.string,
        memberRequests: PropTypes.array,
    }

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
        memberRequests: [{
            user: {
                id: "1",
                coverPhotoUrl: "/images/cover_photo.jpg",
                profilePictureUrl: "/images/profile_picture.png",
                fullName: "NgoVan Huy",
                userName: 'ngovanhuy0241',
            },
            createTime: new Date()
        }, {
            user: {
                id: "2",
                coverPhotoUrl: "/images/cover_photo.jpg",
                profilePictureUrl: "/images/profile_picture.png",
                fullName: "NgoVan Huy",
                userName: 'ngovanhuy0241',
            },
            createTime: new Date()
        }]
    }

    handleSubmitChangeDetail = (classId, name, about, location) => {
        this.props.dispatch(classActions.update(classId, name, about, location));
    }

    render() {
        const {classDetail, topics, classId, memberRequests} = this.props
        const queryStringParsed = queryString.parse(this.props.location.search)
        const currentViewLink = (queryStringParsed && queryStringParsed.currentViewLink) ? queryStringParsed.currentViewLink : 'memberRequests'
        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <ClassLeftmenu classDetail={classDetail} topics={topics}
                                           classId={classId} currentPage="manage_class"/>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="row">
                            <ClassManage currentViewLink={currentViewLink} classId={classId}
                                         classDetail={classDetail} memberRequests={memberRequests}
                                         onSubmitChangeDetail={this.handleSubmitChangeDetail}/>
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

export default withRouter(connect(mapStateToProps, null)(ClassManagePage));