import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class PageNotFound extends Component{
    render(){
        return(
            <div className="not-found">
                <div className="ui-box">
                    <div className="ui-box-title">
                        <i className="warning-icon"></i>
                        <span>Sorry, this content isn't available right now</span>
                    </div>
                    <div className="ui-box-content">
                        <Link to={`/`}>Go to Home page</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageNotFound;