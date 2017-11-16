import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import ClassRightMenu from "../../components/class/ClassRightMenu";
import '../../components/class/class.css'
import NewPost from "../../components/commons/views/NewPost";
import ClassFeed from "../../components/class/ClassFeed";

class ClassTimelinePage extends Component {
    static propTypes = {
        classDetail: PropTypes.object,
        className: PropTypes.string,
        topics: PropTypes.array,
        events: PropTypes.array,
        recentFiles: PropTypes.array,
        feed: PropTypes.array,
    }

    static defaultProps = {
        classDetail: {
            coverPhotoUrl: '/images/cover_photo.jpg',
            fullName: 'Chung ta la Anh em',
            memberCount: 489,
            description: 'Mục tiêu của group: Tập hợp sinh viên theo học CNTT của ĐHBKHN K60 và các Khóa trên để cùng nhau chia sẻ kinh nghiệm học tập, giải đáp các thắc mắc, bài tập liên quan, chia sẻ tài liệu, giáo trình, tìm nhóm bài tập lớn, tim môn dễ kiếm điểm,... và chém gió ngoài lề cho cuộc đời sinh viên thêm thú vị',
        },
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
            startTime: new Date(),
            eventName: 'Event name 1'
        }, {
            startTime: new Date(),
            eventName: 'Event name 2'
        }, {
            startTime: new Date(),
            eventName: 'Event name 3'
        }],
        recentFiles: [{
            type: "image",
            typeFile: "jpg",
            fileName: "cover_photo.jpg",
            source: "/images/cover_photo.jpg",
        },{
            type: "text",
            typeFile: "txt",
            fileName: "kinhnghiem.txt",
            source: "/uploads/kinhnghiem.txt",
        },{
            type: "pdf",
            typeFile: "pdf",
            fileName: "ZenHabitsbook.pdf",
            source: "/uploads/ZenHabitsbook.pdf",
        }],
        feed:[{
            post:{
                id: "123",
                className: "huynv",
                createTime: new Date(),
                message: "[SINH VIÊN 5 TỐT]\n" +
                "\"Hành trình tìm kiếm Sinh viên 5 tốt 2016-2017: TÔI TỎA SÁNG\" đã chính thức được khởi động.\n" +
                "Bạn đã hoàn thành các tiêu chí về Đạo đức - Học tập - Thể lực - Tình nguyện - Hội nhập trong năm học 2016-2017?\n" +
                "Bạn đã sẵn sàng nhận được danh hiệu cao quý \"Sinh viên 5 tốt\"",
                pictureLink: "/images/cover_photo.jpg",
                attachments:[{
                    type: "image",
                    typeFile: "jpg",
                    fileName: "cover_photo.jpg",
                    source: "/images/cover_photo.jpg",
                },{
                    type: "text",
                    typeFile: "txt",
                    fileName: "kinhnghiem.txt",
                    source: "/uploads/kinhnghiem.txt",
                },{
                    type: "pdf",
                    typeFile: "pdf",
                    fileName: "ZenHabitsbook.pdf",
                    source: "/uploads/ZenHabitsbook.pdf",
                }],
                favourites: {
                    favouriteCount: 1,
                    usersFavourite:[{
                        id: "1"
                    }]
                },
                comments: [
                    {
                        message: "Nhìn thích quá, một trải nghiệm tuyệt vời, e cũng muốn thử một lần nhưng ở cự ly 5km thành các tiêu chí về Đạo đức",
                        pictureLink: "/images/cover_photo.jpg",
                        createTime: new Date(),
                        favourites: {
                            favouriteCount: 1,
                            usersFavourite:[{
                                id: "1"
                            }]
                        },
                        replies: [
                            {
                                message: "Nhìn thích quá, một trải nghiệm tuyệt vời, e cũng muốn thử một lần nhưng ở cự ly 5km thành các tiêu chí về Đạo đức",
                                pictureLink: "/images/cover_photo.jpg",
                                favourites: {
                                    favouriteCount: 0
                                },
                            }
                        ],
                        from: {
                            user:{
                                id: "1",
                                coverPhotoUrl: "/images/cover_photo.jpg",
                                profilePictureUrl: "/images/profile_picture.png",
                                fullName: "NgoVan Huy",
                                username: "ngovanhuy0241"
                            },
                        }
                    }
                ],
                from: {
                    user:{
                        id: "1",
                        coverPhotoUrl: "/images/cover_photo.jpg",
                        profilePictureUrl: "/images/profile_picture.png",
                        fullName: "NgoVan Huy",
                        username: "ngovanhuy0241"
                    },
                }

            }
        },{
            post:{
                id: "123",
                className: "huynv",
                createTime: new Date(),
                message: "[SINH VIÊN 5 TỐT]\n" +
                "\"Hành trình tìm kiếm Sinh viên 5 tốt 2016-2017: TÔI TỎA SÁNG\" đã chính thức được khởi động.\n" +
                "Bạn đã hoàn thành các tiêu chí về Đạo đức - Học tập - Thể lực - Tình nguyện - Hội nhập trong năm học 2016-2017?\n" +
                "Bạn đã sẵn sàng nhận được danh hiệu cao quý \"Sinh viên 5 tốt\"",
                pictureLink: "/images/cover_photo.jpg",
                attachments:[{
                    type: "image",
                    typeFile: "jpg",
                    fileName: "cover_photo.jpg",
                    source: "/images/cover_photo.jpg",
                },{
                    type: "text",
                    typeFile: "txt",
                    fileName: "kinhnghiem.txt",
                    source: "/uploads/kinhnghiem.txt",
                },{
                    type: "pdf",
                    typeFile: "pdf",
                    fileName: "ZenHabitsbook.pdf",
                    source: "/uploads/ZenHabitsbook.pdf",
                }],
                favourites: {
                    favouriteCount: 1,
                    usersFavourite:[{
                        id: "1"
                    }]
                },
                comments: [
                    {
                        message: "Nhìn thích quá, một trải nghiệm tuyệt vời, e cũng muốn thử một lần nhưng ở cự ly 5km thành các tiêu chí về Đạo đức",
                        pictureLink: "/images/cover_photo.jpg",
                        createTime: new Date(),
                        favourites: {
                            favouriteCount: 1,
                            usersFavourite:[{
                                id: "1"
                            }]
                        },
                        replies: [
                            {
                                message: "Nhìn thích quá, một trải nghiệm tuyệt vời, e cũng muốn thử một lần nhưng ở cự ly 5km thành các tiêu chí về Đạo đức",
                                pictureLink: "/images/cover_photo.jpg",
                                favourites: {
                                    favouriteCount: 0
                                },
                            }
                        ],
                        from: {
                            user:{
                                id: "1",
                                coverPhotoUrl: "/images/cover_photo.jpg",
                                profilePictureUrl: "/images/profile_picture.png",
                                fullName: "NgoVan Huy",
                                username: "ngovanhuy0241"
                            },
                        }
                    }
                ],
                from: {
                    user:{
                        id: "1",
                        coverPhotoUrl: "/images/cover_photo.jpg",
                        profilePictureUrl: "/images/profile_picture.png",
                        fullName: "NgoVan Huy",
                        username: "ngovanhuy0241"
                    },
                }

            }
        }]
    }

    render() {
        const {classDetail, topics, events, className, recentFiles, feed} = this.props
        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <ClassLeftmenu classDetail={classDetail} topics={topics}
                                           className={className}/>
                        </div>
                    </div>
                    <div className="col-sm-7 class-main-content">
                        <div className="row">
                            <NewPost className={className} classFullName={classDetail.fullName}/>
                        </div>
                        <div className="row">
                            <ClassFeed feed={feed}/>
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
    const className = ownProps.match.params.className
    return {
        className
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassTimelinePage));