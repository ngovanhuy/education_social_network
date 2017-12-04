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
import {postActions} from "../../actions";

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
        var {user} = this.props;
        if(!user || !user.id){
            user = JSON.parse(localStorage.getItem('user'))
        }
        this.props.dispatch(userActions.getById(user.id));
        this.props.dispatch(userActions.getClassJoined(user.id));
        this.props.dispatch(postActions.getPostsByUserId(user.id));
    }

    render() {
        const {schoolDetail, user, classUserJoined, events, notifcationsLatest} = this.props
        var {posts} = this.props
        posts = posts ? posts : []
        posts = posts.sort(function(a,b){
            return new Date(b.timeCreate) - new Date(a.timeCreate);
        });
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
                                        <Feed feed={posts} user={user}/>
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
    const {user, classUserJoined, posts} = state.authentication;
    return {
        user,
        classUserJoined,
        posts
    };
}


export default withRouter(connect(mapStateToProps)(HomePage));