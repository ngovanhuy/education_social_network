import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserProfileTopContent from "../../components/userProfile/UserProfileTopContent";
import IntroProfiles from "../../components/userProfile/IntroProfiles";
import Feed from "../../components/commons/Feed";

class UserProfilePage extends Component{
    static propTypes = {
        user: PropTypes.object,
        userName: PropTypes.string,
        feed: PropTypes.array,
    }

    static defaultProps = {
        user:{
            coverPhotoUrl: "/images/cover_photo.jpg",
            profilePictureUrl: "/images/profile_picture.png",
            fullName: "NgoVan Huy",
            intros:[
                {
                    type: "education",
                    message: "Studied at class 12A2"
                },
                {
                    type: "education",
                    message: "Studied at class 11A2"
                },
                {
                    type: "education",
                    message: "Studied at class 10A2"
                },
                {
                    type: "home_place",
                    message: "Lives in HaNoi, VietNam"
                }
            ]
        },
        feed:[{
            post:{
                id: "123",
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

    render(){
        const {user, feed} = this.props
        return(
            <div>
                <div className="container">
                    <div className="col-sm-10">
                        <div className="row">
                            <div className="col-sm-12">
                                <UserProfileTopContent user={user}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <IntroProfiles user={user}/>
                            </div>
                            <div className="col-sm-8">
                                <div className="user-profile-feed">
                                    <Feed feed={feed}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const userName = ownProps.match.params.userName
    return{
        userName
    }
}

export default withRouter(connect(mapStateToProps, null)(UserProfilePage));