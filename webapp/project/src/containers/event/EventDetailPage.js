import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../../components/class/class.css'
import EventLeftmenu from "../../components/event/EventLeftmenu";
import EventTopContent from "../../components/event/EventTopContent";
import UserProfileInfo from "../../components/commons/views/UserProfileInfo";

class EventDetailPage extends Component {
    static propTypes = {
        eventDetail: PropTypes.object,
        eventId: PropTypes.string,
    }

    static defaultProps = {
        eventDetail: {
            id: 1,
            title: 'All Day Event very long title',
            allDay: true,
            start: new Date(2015, 3, 0),
            end: new Date(2015, 3, 1),
            location: ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
            source: '/images/cover_photo.jpg',
            description: '250 gian hàng các đặc sản vùng miền nổi tiếng của Việt Nam được giới thiệu. Lần đầu tiên không gian thưởng trà, không gian bánh dân gian Nam Bộ... được giới thiệu vô cùng đặc sắc',
            from: {
                user: {
                    id: "1",
                    coverPhotoUrl: "/images/cover_photo.jpg",
                    profilePictureUrl: "/images/profile_picture.png",
                    fullName: "NgoVan Huy",
                    username: "ngovanhuy0241"
                },
            }
        }
    }

    render() {
        const {eventDetail, eventId} = this.props
        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <EventLeftmenu currentPage="eventDetail" eventDetailTitle={eventDetail.title}/>
                        </div>
                    </div>
                    <div className="col-sm-7 event-main-content">
                        <EventTopContent eventDetail={eventDetail}/>
                        <div className="ui-box event-description clearfix">
                            <div className="ui-box-title">
                                <span>Details</span>
                            </div>
                            <div className="ui-box-content">
                                {eventDetail.description}
                            </div>
                        </div>
                        {
                            eventDetail.from.user ?
                                (
                                    <div className="ui-box event-about-user clearfix">
                                        <div className="ui-box-title">
                                            <span>About {eventDetail.from.user.fullName}</span>
                                        </div>
                                        <div className="ui-box-content clearfix">
                                            <div className="user-profile-picture">
                                                <img src={eventDetail.from.user.profilePictureUrl}/>
                                            </div>
                                            <div className="user-detail">
                                                <UserProfileInfo user={eventDetail.from.user}/>
                                            </div>
                                        </div>
                                    </div>
                                ) : ''
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id
    return {
        eventId
    }
}

export default withRouter(connect(mapStateToProps, null)(EventDetailPage));