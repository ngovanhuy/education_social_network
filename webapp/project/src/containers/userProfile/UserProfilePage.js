import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import UserProfileTopContent from "../../components/userProfile/UserProfileTopContent";
import IntroProfiles from "../../components/userProfile/IntroProfiles";
import Feed from "../../components/commons/Feed";
import {postActions, userActions} from "../../actions";
import {userService} from "../../services";

class UserProfilePage extends Component {
    componentWillMount() {
        const {userId} = this.props;
        if(userId) {
            this.props.dispatch(userActions.getById(userId));
            this.props.dispatch(postActions.getPostsByUserId(userId));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userId !== this.props.userId) {
            const {userId} = nextProps;
            if(userId) {
                this.props.dispatch(userActions.getById(userId));
                this.props.dispatch(postActions.getPostsByUserId(userId));
            }
        }
    }

    handleUploadCoverPhoto = (file) => {
        const {userId} = this.props;
        userService.updateCoverPhoto(userId, file)
            .then(
                this.props.dispatch(userActions.getById(userId))
            )
    }

    handleUploadProfilePicture = (file) => {
        const {userId} = this.props;

        userService.updateProfilePicture(userId, file)
            .then(
                this.props.dispatch(userActions.getById(userId))
            )
    }

    render() {
        const {user } = this.props
        var {posts} = this.props
        posts = posts ? posts : []
        posts = posts.sort(function(a, b){
            return new Date(b.timeCreate) - new Date(a.timeCreate);
        });
        return (
            <div>
                <div className="container">
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
                                    <Feed feed={posts} user={user}/>
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
    const userId = ownProps.match.params.userId
    const {user, posts} = state.authentication
    return {
        userId,
        user,
        posts
    }
}

export default withRouter(connect(mapStateToProps, null)(UserProfilePage));