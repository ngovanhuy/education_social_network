import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import HomeLeftmenu from "../../components/home/HomeLeftmenu";
import '../../components/home/home.css'
import Feed from "../../components/commons/Feed";
import HomeRightmenu from "../../components/home/HomeRightmenu";
import {classActions} from "../../actions/classActions";
import {userActions} from "../../actions/userActions";
import {eventActions, postActions} from "../../actions";
import {eventUtils} from "../../utils";
import {postConstants} from "../../constants";

class HomePage extends Component {
    static defaultProps = {
        schoolDetail: {
            schoolLogoUrl: '/images/school-logo.jpg',
            profilePictureUrl: '/images/school-picture.jpg',
            location: 'Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
            phone: '+243 62 31732',
            website: 'www.hust.edu.vn',
            schoolMap: '/images/school-map.png',
        },
        notifcationsLatest: [{
            title: 'Giao lưu hỏi đáp "Cuộc đua số - Xe tự hành 2017 - 2018',
            createTime: new Date(),
            from: {
                user: {
                    id: "1",
                    coverPhotoUrl: "/images/cover_photo.jpg",
                    profilePictureUrl: "/images/profile_picture.png",
                    fullName: "Trung TT",
                    userName: "ngovanhuy0241"
                }
            }
        }, {
            title: 'Giao lưu hỏi đáp "Cuộc đua số - Xe tự hành 2017 - 2018',
            createTime: new Date(),
            from: {
                user: {
                    id: "1",
                    coverPhotoUrl: "/images/cover_photo.jpg",
                    profilePictureUrl: "/images/profile_picture.png",
                    fullName: "Trung TT",
                    userName: "ngovanhuy0241"
                }
            }
        }, {
            title: 'Giao lưu hỏi đáp "Cuộc đua số - Xe tự hành 2017 - 2018',
            createTime: new Date(),
            from: {
                user: {
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
        var {user} = this.props;
        if (!user || !user.id) {
            user = JSON.parse(localStorage.getItem('user'))
        }
        this.props.dispatch(userActions.getById(user.id));
        this.props.dispatch(userActions.getClassJoined(user.id));
        this.props.dispatch(postActions.getPostsByUserId(user.id));
        this.props.dispatch(eventActions.getEventsByUserId(user.id));
    }

    render() {
        const {schoolDetail, user, classUserJoined, notifcationsLatest} = this.props
        var {posts} = this.props
        posts = posts ? posts : []
        posts = posts.sort(function (a, b) {
            return new Date(b.timeCreate) - new Date(a.timeCreate);
        });

        var {eventsByUser} = this.props
        var eventsByUserAfterUpdateInfo = eventUtils.updateInfoEvents(eventsByUser)
        return (
            <div>
                <div className="container">
                    <div className="home-page clearfix">
                        <div className="col-sm-2">
                            <HomeLeftmenu schoolDetail={schoolDetail} classes={classUserJoined}/>
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
                                        <Feed feed={posts} user={user}
                                              contextView={postConstants.CONTEXT_VIEW.IN_HOME_PAGE}/>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <HomeRightmenu events={eventsByUserAfterUpdateInfo}
                                                   notifcationsLatest={notifcationsLatest}
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
    const {user, classUserJoined, posts} = state.authentication;
    const {eventsByUser} = state.events
    return {
        user,
        classUserJoined,
        posts,
        eventsByUser
    };
}


export default withRouter(connect(mapStateToProps)(HomePage));