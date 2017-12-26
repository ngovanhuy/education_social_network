import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserProfileTopContent from "../../components/userProfile/UserProfileTopContent";
import UserAbout from "../../components/userProfile/UserAbout";
import {userActions} from "../../actions";
import PageNotFound from "../../components/commons/PageNotFound";
import {appUtils} from "../../utils";

class AboutPage extends Component{

    componentWillMount() {
        const {userId} = this.props;
        if(userId) {
            this.props.dispatch(userActions.getById(userId));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            const {userId} = nextProps;
            if(userId) {
                this.props.dispatch(userActions.getById(userId));
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

    render(){
        const {loading, user} = this.props
        return(
            <div>
                <div className="container">
                    {
                        (user && user.id) ?
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <UserProfileTopContent user={user} currentLink="about"
                                                               onUploadProfilePicture={this.handleUploadProfilePicture}
                                                               onUploadCoverPhoto={this.handleUploadCoverPhoto}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <UserAbout user={user}/>
                                    </div>
                                </div>
                            </div>
                            : <PageNotFound loading={loading}/>
                    }
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const userId = ownProps.match.params.userId
    const {user} = state.users
    var loading = appUtils.checkLoading(state)
    return{
        userId,
        user,
        loading
    }
}

export default withRouter(connect(mapStateToProps, null)(AboutPage));