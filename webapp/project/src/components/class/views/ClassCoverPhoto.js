import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class CoverPhotoClass extends Component {
    render() {
        const {coverPhotoUrl, className} = this.props
        return (
            <div>
                <img src={coverPhotoUrl} className="class-cover-photo"></img>
                <div className="action-with-class clearfix">
                    <div className="dropdown">
                        <button data-toggle="dropdown" className="btn btn-default dropdown-toggle" type="button">
                            <span>Joined</span>
                            <span className="caret"></span>
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul role="menu" className="dropdown-menu">
                            <li><a href="javascript:;">Leave Class</a></li>
                        </ul>
                    </div>
                    <div className="dropdown pull-right">
                        <button className="btn btn-default btn-share-class" type="button">
                            <span className="fa fa-share"></span>
                            <span>Share</span>
                        </button>
                        <button data-toggle="dropdown" className="btn btn-default dropdown-toggle btn-manage-class" type="button">
                            <span className="fa fa-ellipsis-h"></span>
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul role="menu" className="dropdown-menu pull-right-xs">
                            <li><a href="javascript:;">Add member</a></li>
                            <li><a href="javascript:;">Manage Requests</a></li>
                            <li className="divider"></li>
                            <li><a href="javascript:;">Report Class</a></li>
                            <li className="divider"></li>
                            <li><a href="javascript:;">Create New Class</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default CoverPhotoClass