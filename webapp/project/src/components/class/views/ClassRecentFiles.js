import React, {Component} from 'react'

import '../../commons/common.css'
import {Link} from 'react-router-dom'
import {fileUtils} from "../../../utils";

class ClassRecentFiles extends Component{
    renderFile = (file, index) => {
        const defaultImageDocument = "/images/basic-document.png"
        return(
            <div key={index} className="file clearfix">
                <div className="preview-file clearfix">
                    {
                        (file.type && file.type.indexOf("image") !== -1) ?
                            <div className="preview-image">
                                <img src={file && fileUtils.renderFileSource(file.id)}/>
                            </div> :
                            <div className="document">
                                <img src={defaultImageDocument}/>
                            </div>
                    }
                </div>
                <div className="file-content">
                    <div className="file-file-name">{file.name}</div>
                    <div className="file-type">{file.type}</div>
                </div>
                <div className="dropdown pull-right action-with-file">
                    <a data-toggle="dropdown" className="btn dropdown-toggle" href="javascript:;">
                        <span className="fa fa-ellipsis-v"></span>
                        <span className="sr-only">Toggle Dropdown</span>
                    </a>
                    <ul role="menu" className="dropdown-menu">
                        <li><a href={file && fileUtils.renderFileSource(file.id)} target="_blank" download="proposed_file_name">Download</a></li>
                    </ul>
                </div>
            </div>
        )
    }

    render(){
        const {classId, recentFiles} = this.props
        return(
            <div className="class-recent-files files has-border-radius">
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