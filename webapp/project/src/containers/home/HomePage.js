import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import HomeLeftmenu from "../../components/home/HomeLeftmenu";
import '../../components/home/home.css'
import Feed from "../../components/commons/Feed";
import HomeRightmenu from "../../components/home/HomeRightmenu";
import {classActions} from "../../actions/classActions";

class HomePage extends Component {

    static propTypes = {
        schoolDetail: PropTypes.object,
        user: PropTypes.object,
        classesByUserId: PropTypes.array,
        feed: PropTypes.array,
        events: PropTypes.array,
        notifcationsLatest: PropTypes.array,
    }

    static defaultProps = {
        schoolDetail: {
            schoolLogoUrl: '/images/school-logo.jpg',
            profilePictureUrl: '/images/school-picture.jpg',
            location: 'Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
            phone: '+243 62 31732',
            website: 'www.hust.edu.vn',
            schoolMap: '/images/school-map.png',
        },
        // user: {
        //     id: "1",
        //     coverPhotoUrl: "/images/cover_photo.jpg",
        //     profilePictureUrl: "/images/profile_picture.png",
        //     fullName: "NgoVan Huy",
        //     userName: "ngovanhuy0241"
        // },
        // classesByUserId: [{
        //     id: "1",
        //     profilePictureUrl: '/images/cover_photo.jpg',
        //     fullName: 'Chung ta la Anh em',
        //     memberCount: 489,
        //     description: 'Mục tiêu của group: Tập hợp sinh viên theo học CNTT của ĐHBKHN K60 và các Khóa trên để cùng nhau chia sẻ kinh nghiệm học tập, giải đáp các thắc mắc, bài tập liên quan, chia sẻ tài liệu, giáo trình, tìm nhóm bài tập lớn, tim môn dễ kiếm điểm,... và chém gió ngoài lề cho cuộc đời sinh viên thêm thú vị',
        // },{
        //     id: 2,
        //     profilePictureUrl: '/images/cover_photo.jpg',
        //     fullName: 'Chung ta la Anh em',
        //     memberCount: 489,
        //     description: 'Mục tiêu của group: Tập hợp sinh viên theo học CNTT của ĐHBKHN K60 và các Khóa trên để cùng nhau chia sẻ kinh nghiệm học tập, giải đáp các thắc mắc, bài tập liên quan, chia sẻ tài liệu, giáo trình, tìm nhóm bài tập lớn, tim môn dễ kiếm điểm,... và chém gió ngoài lề cho cuộc đời sinh viên thêm thú vị',
        // },{
        //     id: 3,
        //     profilePictureUrl: '/images/cover_photo.jpg',
        //     fullName: 'Chung ta la Anh em',
        //     memberCount: 489,
        //     description: 'Mục tiêu của group: Tập hợp sinh viên theo học CNTT của ĐHBKHN K60 và các Khóa trên để cùng nhau chia sẻ kinh nghiệm học tập, giải đáp các thắc mắc, bài tập liên quan, chia sẻ tài liệu, giáo trình, tìm nhóm bài tập lớn, tim môn dễ kiếm điểm,... và chém gió ngoài lề cho cuộc đời sinh viên thêm thú vị',
        // }],
        feed:[{
            post:{
                id: "123",
                classId: "1",
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
                                userName: "ngovanhuy0241"
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
                        userName: "ngovanhuy0241"
                    },
                }

            }
        },{
            post:{
                id: "123",
                classId: "huynv",
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
                                userName: "ngovanhuy0241"
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
                        userName: "ngovanhuy0241"
                    },
                }

            }
        }],
        events: [
            {
                id:'1',
                title: 'All Day Event very long title',
                allDay: true,
                start: new Date(2015, 3, 0),
                end: new Date(2015, 3, 1)
            },
            {
                id:'1',
                title: 'Long Event',
                start: new Date(2015, 3, 7),
                end: new Date(2015, 3, 10)
            },

            {
                id:'1',
                title: 'DTS STARTS',
                start: new Date(2016, 2, 13, 0, 0, 0),
                end: new Date(2016, 2, 20, 0, 0, 0)
            },

            {
                id:'1',
                title: 'DTS ENDS',
                start: new Date(2016, 10, 6, 0, 0, 0),
                end: new Date(2016, 10, 13, 0, 0, 0)
            },

            {
                id:'1',
                title: 'Some Event',
                start: new Date(2015, 3, 9, 0, 0, 0),
                end: new Date(2015, 3, 9, 0, 0, 0)
            },
            {
                id:'1',
                title: 'Conference',
                start: new Date(2015, 3, 11),
                end: new Date(2015, 3, 13),
                desc: 'Big conference for important people'
            },
            {
                id:'1',
                title: 'Meeting',
                start: new Date(2015, 3, 12, 10, 30, 0, 0),
                end: new Date(2015, 3, 12, 12, 30, 0, 0),
                desc: 'Pre-meeting meeting, to prepare for the meeting'
            },
            {
                id:'1',
                title: 'Lunch',
                start:new Date(2015, 3, 12, 12, 0, 0, 0),
                end: new Date(2015, 3, 12, 13, 0, 0, 0),
                desc: 'Power lunch'
            },
            {
                id:'1',
                title: 'Meeting',
                start:new Date(2015, 3, 12,14, 0, 0, 0),
                end: new Date(2015, 3, 12,15, 0, 0, 0)
            },
            {
                id:'1',
                title: 'Happy Hour',
                start:new Date(2015, 3, 12, 17, 0, 0, 0),
                end: new Date(2015, 3, 12, 17, 30, 0, 0),
                desc: 'Most important meal of the day'
            },
            {
                id:'1',title: 'Dinner',
                start:new Date(2015, 3, 12, 20, 0, 0, 0),
                end: new Date(2015, 3, 12, 21, 0, 0, 0)
            },
            {
                id:'1',title: 'Birthday Party',
                start: new Date(2015, 3, 13, 7, 0, 0),
                end: new Date(2015, 3, 13, 10, 30, 0)
            },
            {
                id:'1',title: 'Birthday Party 2',
                start:new Date(2015, 3, 13, 7, 0, 0),
                end: new Date(2015, 3, 13, 10, 30, 0)
            },
            {
                id:'1',title: 'Birthday Party 3',
                start:new Date(2015, 3, 13, 7, 0, 0),
                end: new Date(2015, 3, 13, 10, 30, 0)
            },
            {
                id:'1',title: 'Late Night Event',
                start:new Date(2015, 3, 17, 19, 30, 0),
                end: new Date(2015, 3, 18, 2, 0, 0)
            },
            {
                id:'1',title: 'Multi-day Event',
                start:new Date(2015, 3, 20, 19, 30, 0),
                end: new Date(2015, 3, 22, 2, 0, 0)
            }
        ],
        notifcationsLatest: [{
            title: 'Giao lưu hỏi đáp "Cuộc đua số - Xe tự hành 2017 - 2018',
            createTime: new Date(),
            from:{
                user:{
                    id: "1",
                    coverPhotoUrl: "/images/cover_photo.jpg",
                    profilePictureUrl: "/images/profile_picture.png",
                    fullName: "Trung TT",
                    userName: "ngovanhuy0241"
                }
            }
        },{
            title: 'Giao lưu hỏi đáp "Cuộc đua số - Xe tự hành 2017 - 2018',
            createTime: new Date(),
            from:{
                user:{
                    id: "1",
                    coverPhotoUrl: "/images/cover_photo.jpg",
                    profilePictureUrl: "/images/profile_picture.png",
                    fullName: "Trung TT",
                    userName: "ngovanhuy0241"
                }
            }
        },{
            title: 'Giao lưu hỏi đáp "Cuộc đua số - Xe tự hành 2017 - 2018',
            createTime: new Date(),
            from:{
                user:{
                    id: "1",
                    coverPhotoUrl: "/images/cover_photo.jpg",
                    profilePictureUrl: "/images/profile_picture.png",
                    fullName: "Trung TT",
                    userName: "ngovanhuy0241"
                }
            }
        }]
    }

    componentWillMount() {
        // loadData(this.props)
        const {dispatch, user} = this.props;
        dispatch(classActions.getByUserId(user.id));
    }

    render() {
        const {schoolDetail, user, classesByUserId, feed, events, notifcationsLatest} = this.props
        return (
            <div>
                <div className="container">
                    <div className="home-page clearfix">
                        <div className="col-sm-2">
                            <HomeLeftmenu schoolDetail={schoolDetail} classes={classesByUserId}/>
                        </div>
                        <div className="col-sm-10">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="school-profile-picture">
                                        <img src={schoolDetail.profilePictureUrl}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="home-feed">
                                        <Feed feed={feed}/>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <HomeRightmenu events={events} notifcationsLatest={notifcationsLatest}
                                                   schoolDetail={schoolDetail}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state.authentication;
    const {classesByUserId} = state.classes;
    return {
        user,
        classesByUserId
    };
}


export default withRouter(connect(mapStateToProps)(HomePage));