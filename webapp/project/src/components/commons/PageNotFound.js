import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class PageNotFound extends Component {
    render() {
        const {loading} = this.props
        return (
            <div>
                {
                    loading ? (<div id="divLoading" className="show"></div>) :
                        (
                            <div className="not-found">
                                <div className="ui-box">
                                    <div className="ui-box-title">
                                        <i className="warning-icon"></i>
                                        <span>Sorry, this content isn't available right now</span>
                                    </div>
                                    <div className="ui-box-content">
                                        <Link to={`/`}>Go to Home page</Link>
                                        <span role="presentation" aria-hidden="true"> · </span>
                                        <Link to={`/login`}>Go to Login page</Link>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        )
    }
}

export default PageNotFound;