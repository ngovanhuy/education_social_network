import React, {Component} from 'react'

import '../../commons/common.css'
import {Link} from 'react-router-dom'

class ClassRecentFiles extends Component{
    renderFile = (file, index) => {
        const defaultImageDocument = "/images/basic-document.png"
        return(
            <div key={index} className="file clearfix">
                <div className="preview-file clearfix">
                    {
                        file.type == "image" ?
                            <div className="preview-image">
                                <img src={file.source}/>
                            </div> :
                            <div className="document">
                                <img src={defaultImageDocument}/>
                            </div>
                    }
                </div>
                <div className="file-content">
                    <div className="file-file-name">{file.fileName}</div>
                    <div className="file-type">{file.type}</div>
                </div>
                <div className="dropdown pull-right action-with-file">
                    <a data-toggle="dropdown" className="btn dropdown-toggle" href="javascript:;">
                        <span className="fa fa-ellipsis-v"></span>
                        <span className="sr-only">Toggle Dropdown</span>
                    </a>
                    <ul role="menu" className="dropdown-menu">
                        <li><a href="javascript:;">Download</a></li>
                    </ul>
                </div>
            </div>
        )
    }

    render(){
        const {classId, recentFiles} = this.props
        return(
            <div className="class-recent-files files">
                <div>
                    <h3>
                        Recent class files
                        <Link to={`/classes/${classId}/files`} className="pull-right">See all</Link>
                    </h3>
                </div>
                {
                    recentFiles && recentFiles.length > 0 ?
                        (
                            recentFiles.map((file, index) => this.renderFile(file, index))
                        ) :
                        (
                            <p>No recent files</p>
                        )
                }
            </div>
        )
    }
}

export default ClassRecentFiles;