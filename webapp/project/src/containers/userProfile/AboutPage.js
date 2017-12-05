import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserProfileTopContent from "../../components/userProfile/UserProfileTopContent";
import UserAbout from "../../components/userProfile/UserAbout";
import {userActions} from "../../actions/userActions";
import {userService} from "../../services/userService";

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

    render(){
        const {user} = this.props
        return(
            <div>
                <div className="container">
                    <div className="col-sm-10">
                        <div className="row">
                            <div className="col-sm-12">
                                <UserProfileTopContent user={user} currentLink="about"
                                                       onUploadProfilePicture={this.handleUploadProfilePicture}
                                                       onUploadCoverPhoto={this.handleUploadCoverPhoto}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <UserAbout/>
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
    const {user} = state.authentication
    return{
        userId,
        user
    }
}

export default withRouter(connect(mapStateToProps, null)(AboutPage));