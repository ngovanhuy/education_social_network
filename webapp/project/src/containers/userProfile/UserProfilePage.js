import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import UserProfileTopContent from "../../components/userProfile/UserProfileTopContent";
import IntroProfiles from "../../components/userProfile/IntroProfiles";
import Feed from "../../components/commons/Feed";
import {postActions, userActions} from "../../actions";
import {userService} from "../../services";
import {postConstants} from "../../constants";
import PageNotFound from "../../components/commons/PageNotFound";
import {appUtils} from "../../utils";

class UserProfilePage extends Component {
    componentWillMount() {
        const {userId} = this.props;
        if (userId) {
            this.props.dispatch(userActions.getById(userId));
            this.props.dispatch(postActions.getPostsByUserId(userId));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userId !== this.props.userId) {
            const {userId} = nextProps;
            if (userId) {
                this.props.dispatch(userActions.getById(userId));
                this.props.dispatch(postActions.getPostsByUserId(userId));
            }
        }
    }

    handleUploadCoverPhoto = (file) => {
        const {userId} = this.props;
        this.props.dispatch(userActions.updateCoverPhoto(userId, file))
    }

    handleUploadProfilePicture = (file) => {
        const {userId} = this.props;
        this.props.dispatch(userActions.updateProfilePicture(userId, file))
    }

    render() {
        const {user, loading, currentUser} = this.props
        var {posts} = this.props
        posts = posts ? posts : []
        posts = (posts && posts.length > 0) && posts.sort(function (a, b) {
            return new Date(b.timeCreate) - new Date(a.timeCreate);
        });
        return (
            <div className="container">{
                (user && user.id) ?
                    <div>
                        <div className="col-sm-10">
                            <div className="row">
                                <div className="col-sm-12">
                                    <UserProfileTopContent user={user} currentLink="timeline"
                                                           onUploadProfilePicture={this.handleUploadProfilePicture}
                                                           onUploadCoverPhoto={this.handleUploadCoverPhoto}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <IntroProfiles user={user}/>
                                </div>
                                <div className="col-sm-8">
                                    <div className="user-profile-feed">
                                        <Feed feed={posts} user={user}
                                              contextView={postConstants.CONTEXT_VIEW.IN_USER_PAGE}/>
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

const mapStateToProps = (state, ownProps) => {
    const userId = ownProps.match.params.userId
    const {user, posts} = state.users
    var loading = appUtils.checkLoading(state)
    return {
        userId,
        user,
        posts,
        loading
    }
}

export default withRouter(connect(mapStateToProps, null)(UserProfilePage));