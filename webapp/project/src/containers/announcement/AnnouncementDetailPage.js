import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../../components/announcement/announcement.css'
import {announcementActions} from "../../actions";
import {appUtils, dateUtils, fileUtils} from "../../utils";
import PageNotFound from "../../components/commons/PageNotFound";
import AnnouncementLeftmenu from '../../components/announcement/views/AnnouncementLeftmenu'
import UserProfileInfo from "../../components/commons/views/UserProfileInfo";

class EventDetailPage extends Component {
    componentWillMount() {
        const {announcementId} = this.props;
        this.props.dispatch(announcementActions.getAll());
        this.props.dispatch(announcementActions.getById(announcementId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.announcementId !== this.props.announcementId) {
            const {announcementId} = nextProps;
            this.props.dispatch(announcementActions.getAll());
            this.props.dispatch(announcementActions.getById(announcementId));
        }
    }

    render() {
        const {announcementDetail, announcementId, loading} = this.props
        return (
            <div className="container">
                {
                    (announcementDetail && announcementDetail.id) ?
                        <div className="announcement-page clearfix">
                            <div className="col-sm-2">
                                <div className="row">
                                    <AnnouncementLeftmenu announcementId={announcementDetail.id}/>
                                </div>
                            </div>
                            <div className="col-sm-7 announcement-main-content clearfix">
                                <h1 className="title">{announcementDetail.title}</h1>
                                <div className="announcement-usercreate clearfix">
                                    <div className="user-create-image">
                                        <img src={(announcementDetail && announcementDetail.userCreate) && fileUtils.renderFileSource(announcementDetail.userCreate.profileImageID)}/>
                                    </div>
                                    <div className="user-create-info">
                                        <UserProfileInfo user={announcementDetail && announcementDetail.userCreate}/>
                                        <div className="announcement-createtime">{dateUtils.convertISOToLocaleString(announcementDetail.timeCreate)}</div>
                                    </div>
                                </div>
                                <div className="announcement-detail">
                                    {announcementDetail.content}
                                </div>
                            </div>
                        </div>
                        : <PageNotFound loading={loading}/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const announcementId = ownProps.match.params.announcementId
    const {announcementDetail} = state.announcements
    var loading = appUtils.checkLoading(state)
    return {
        announcementId,
        announcementDetail,
        loading
    }
}

export default withRouter(connect(mapStateToProps, null)(EventDetailPage));