import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import HomeLeftmenu from "../../components/home/HomeLeftmenu";
import '../../components/home/home.css'
import Feed from "../../components/commons/Feed";
import HomeRightmenu from "../../components/home/HomeRightmenu";
import {userActions, eventActions, postActions, announcementActions} from "../../actions";
import {appUtils, eventUtils} from "../../utils";
import {postConstants} from "../../constants";
import PageNotFound from "../../components/commons/PageNotFound";

class HomePage extends Component {
    static defaultProps = {
        schoolDetail: {
            schoolLogoUrl: '/images/school-logo.jpg',
            profilePictureUrl: '/images/school-picture.jpg',
            location: 'Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
            phone: '+243 62 31732',
            website: 'www.hust.edu.vn',
            schoolMap: '/images/school-map.png',
        }
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
        this.props.dispatch(announcementActions.getAnnouncementNewest());
        this.props.dispatch(announcementActions.getAll());
    }

    render() {
        const {schoolDetail, user, classUserJoined, announcementsNewest, loading} = this.props
        var {posts} = this.props
        posts = posts ? posts : []
        posts = posts.sort(function (a, b) {
            return new Date(b.timeCreate) - new Date(a.timeCreate);
        });

        var {eventsByUser} = this.props
        var eventsByUserAfterUpdateInfo = eventUtils.updateInfoEvents(eventsByUser)
        return (
            <div className="container">
                {
                    (user && user.id) ?
                        <div>
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
                                                           announcements={announcementsNewest}
                                                           schoolDetail={schoolDetail}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <PageNotFound loading={loading}/>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user, classUserJoined, posts, loggedIn} = state.authentication;
    const {eventsByUser} = state.events
    const {announcementsNewest} = state.announcements
    const announcements = state.announcements.items
    var loading = appUtils.checkLoading(state)
    return {
        loading,
        loggedIn,
        user,
        classUserJoined,
        posts,
        eventsByUser,
        announcements,
        announcementsNewest,
    };
}


export default withRouter(connect(mapStateToProps)(HomePage));