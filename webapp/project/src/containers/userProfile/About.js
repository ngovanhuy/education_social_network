import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class About extends Component{
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
            ],
            about: {

            }
        },
    }

    render(){
        return(
            <div></div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const userName = ownProps.match.params.userName
    return{
        userName
    }
}

export default withRouter(connect(mapStateToProps, null)(About));