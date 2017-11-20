import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class HomeSchoolAbout extends Component{
    render(){
        const {schoolDetail} = this.props
        return(
            <div className="home-school-about">
                <div className="ui-box">
                    <div className="ui-box-title">
                        <span>About School</span>
                    </div>
                    <div className="ui-box-content">
                        <div className="school-map">
                            <img src={schoolDetail.schoolMap}/>
                        </div>
                        <div className="school-about-detail school-location">
                            <i className="fa fa-location-arrow"></i>
                            <span>{schoolDetail.location}</span>
                        </div>
                        <div className="school-about-detail school-phone">
                            <i className="fa fa-phone"></i>
                            <span>{schoolDetail.phone}</span>
                        </div>
                        <div className="school-about-detail school-website">
                            <i className="fa fa-globe"></i>
                            <Link to={`//${schoolDetail.website}`} target="_blank">
                                <span>{schoolDetail.website}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeSchoolAbout;