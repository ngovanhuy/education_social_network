import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import ClassRightMenu from "../../components/class/ClassRightMenu";
import '../../components/class/class.css'
import NewPost from "../../components/commons/views/NewPost";
import Feed from "../../components/commons/Feed";
import {classActions} from "../../actions";
import {userUtils} from "../../utils";

class ClassTimelinePage extends Component {
    static defaultProps = {
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
        events: [{
            start: new Date(),
            title: 'Event name 1'
        }, {
            start: new Date(),
            title: 'Event name 2'
        }, {
            start: new Date(),
            title: 'Event name 3'
        }],
        // feed:[{
        //     post:{
        //         id: "123",
        //         classId: "1",
        //         createTime: new Date(),
        //         message: "[SINH VIÊN 5 TỐT]\n" +
        //         "\"Hành trình tìm kiếm Sinh viên 5 tốt 2016-2017: TÔI TỎA SÁNG\" đã chính thức được khởi động.\n" +
        //         "Bạn đã hoàn thành các tiêu chí về Đạo đức - Học tập - Thể lực - Tình nguyện - Hội nhập trong năm học 2016-2017?\n" +
        //         "Bạn đã sẵn sàng nhận được danh hiệu cao quý \"Sinh viên 5 tốt\"",
        //         pictureLink: "/images/cover_photo.jpg",
        //         attachments:[{
        //             type: "image",
        //             typeFile: "jpg",
        //             fileName: "cover_photo.jpg",
        //             source: "/images/cover_photo.jpg",
        //         },{
        //             type: "text",
        //             typeFile: "txt",
        //             fileName: "kinhnghiem.txt",
        //             source: "/uploads/kinhnghiem.txt",
        //         },{
        //             type: "pdf",
        //             typeFile: "pdf",
        //             fileName: "ZenHabitsbook.pdf",
        //             source: "/uploads/ZenHabitsbook.pdf",
        //         }],
        //         favourites: {
        //             favouriteCount: 1,
        //             usersFavourite:[{
        //                 id: "1"
        //             }]
        //         },
        //         comments: [
        //             {
        //                 message: "Nhìn thích quá, một trải nghiệm tuyệt vời, e cũng muốn thử một lần nhưng ở cự ly 5km thành các tiêu chí về Đạo đức",
        //                 pictureLink: "/images/cover_photo.jpg",
        //                 createTime: new Date(),
        //                 favourites: {
        //                     favouriteCount: 1,
        //                     usersFavourite:[{
        //                         id: "1"
        //                     }]
        //                 },
        //                 replies: [
        //                     {
        //                         message: "Nhìn thích quá, một trải nghiệm tuyệt vời, e cũng muốn thử một lần nhưng ở cự ly 5km thành các tiêu chí về Đạo đức",
        //                         pictureLink: "/images/cover_photo.jpg",
        //                         favourites: {
        //                             favouriteCount: 0
        //                         },
        //                     }
        //                 ],
        //                 from: {
        //                     user:{
        //                         id: "1",
        //                         coverPhotoUrl: "/images/cover_photo.jpg",
        //                         profilePictureUrl: "/images/profile_picture.png",
        //                         fullName: "NgoVan Huy",
        //                         userName: "ngovanhuy0241"
        //                     },
        //                 }
        //             }
        //         ],
        //         from: {
        //             user:{
        //                 id: "1",
        //                 coverPhotoUrl: "/images/cover_photo.jpg",
        //                 profilePictureUrl: "/images/profile_picture.png",
        //                 fullName: "NgoVan Huy",
        //                 userName: "ngovanhuy0241"
        //             },
        //         }
        //
        //     }
        // },{
        //     post:{
        //         id: "123",
        //         classId: "huynv",
        //         createTime: new Date(),
        //         message: "[SINH VIÊN 5 TỐT]\n" +
        //         "\"Hành trình tìm kiếm Sinh viên 5 tốt 2016-2017: TÔI TỎA SÁNG\" đã chính thức được khởi động.\n" +
        //         "Bạn đã hoàn thành các tiêu chí về Đạo đức - Học tập - Thể lực - Tình nguyện - Hội nhập trong năm học 2016-2017?\n" +
        //         "Bạn đã sẵn sàng nhận được danh hiệu cao quý \"Sinh viên 5 tốt\"",
        //         pictureLink: "/images/cover_photo.jpg",
        //         attachments:[{
        //             type: "image",
        //             typeFile: "jpg",
        //             fileName: "cover_photo.jpg",
        //             source: "/images/cover_photo.jpg",
        //         },{
        //             type: "text",
        //             typeFile: "txt",
        //             fileName: "kinhnghiem.txt",
        //             source: "/uploads/kinhnghiem.txt",
        //         },{
        //             type: "pdf",
        //             typeFile: "pdf",
        //             fileName: "ZenHabitsbook.pdf",
        //             source: "/uploads/ZenHabitsbook.pdf",
        //         }],
        //         favourites: {
        //             favouriteCount: 1,
        //             usersFavourite:[{
        //                 id: "1"
        //             }]
        //         },
        //         comments: [
        //             {
        //                 message: "Nhìn thích quá, một trải nghiệm tuyệt vời, e cũng muốn thử một lần nhưng ở cự ly 5km thành các tiêu chí về Đạo đức",
        //                 pictureLink: "/images/cover_photo.jpg",
        //                 createTime: new Date(),
        //                 favourites: {
        //                     favouriteCount: 1,
        //                     usersFavourite:[{
        //                         id: "1"
        //                     }]
        //                 },
        //                 replies: [
        //                     {
        //                         message: "Nhìn thích quá, một trải nghiệm tuyệt vời, e cũng muốn thử một lần nhưng ở cự ly 5km thành các tiêu chí về Đạo đức",
        //                         pictureLink: "/images/cover_photo.jpg",
        //                         favourites: {
        //                             favouriteCount: 0
        //                         },
        //                     }
        //                 ],
        //                 from: {
        //                     user:{
        //                         id: "1",
        //                         coverPhotoUrl: "/images/cover_photo.jpg",
        //                         profilePictureUrl: "/images/profile_picture.png",
        //                         fullName: "NgoVan Huy",
        //                         userName: "ngovanhuy0241"
        //                     },
        //                 }
        //             }
        //         ],
        //         from: {
        //             user:{
        //                 id: "1",
        //                 coverPhotoUrl: "/images/cover_photo.jpg",
        //                 profilePictureUrl: "/images/profile_picture.png",
        //                 fullName: "NgoVan Huy",
        //                 userName: "ngovanhuy0241"
        //             },
        //         }
        //
        //     }
        // }]
    }

    componentWillMount() {
        const {classId, user} = this.props;
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getFiles(classId));
        this.props.dispatch(classActions.getPosts(classId));
        if(user){
            this.props.dispatch(classActions.getPostsByUser(classId, user.id));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId) {
            const {classId, user} = nextProps;
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getFiles(classId));
            this.props.dispatch(classActions.getPosts(classId));
            if(user){
                this.props.dispatch(classActions.getPostsByUser(classId, user.id));
            }
        }
    }

    render() {
        const {classDetail, classId, user, topics, events} = this.props
        const recentFiles = (classDetail && classDetail.files) ? classDetail.files.slice(0, 3) : []
        const isTeacher = userUtils.checkIsTeacher(user)
        var posts = []
        if(isTeacher){
            posts = (classDetail && classDetail.posts) ? classDetail.posts : []
        } else {
            posts = (classDetail && classDetail.postsByUser) ? classDetail.postsByUser : []
        }
        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <ClassLeftmenu classDetail={classDetail} topics={topics}
                                           classId={classId} currentPage="discussion"/>
                        </div>
                    </div>
                    <div className="col-sm-7 class-main-content">
                        <div className="row">
                            <NewPost classDetail={classDetail} isTeacher={isTeacher}/>
                        </div>
                        <div className="row">
                            <div className="class-feed">
                                <Feed feed={posts}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="row">
                            <ClassRightMenu classDetail={classDetail} events={events}
                                            recentFiles={recentFiles}/>
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
    const {user} = state.authentication
    return {
        classId,
        classDetail,
        user
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassTimelinePage));