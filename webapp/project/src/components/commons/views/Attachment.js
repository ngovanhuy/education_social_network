import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {fileUtils} from "../../../utils";

const Attachment = ({attachment}) => {
    const {id, name, type, size} = attachment
    const defaultImageDocument = "/images/basic-document.png"

    return (
        <div className="file clearfix">
            <div className="preview-file">
                {
                    (type.indexOf("image") !== -1) ?
                        <div className="preview-image">
                            <img src={fileUtils.renderFileSource(id)}/>
                        </div> :
                        <div className="document">
                            <img src={defaultImageDocument}/>
                        </div>
                }
            </div>
            <div className="file-content">
                <div className="file-file-name">{name}</div>
                <div className="file-type">{type}</div>
                <div className="button-actions">
                    <a href={fileUtils.renderFileSource(id)} download className="btn btn-white">Download</a>
                </div>
            </div>
        </div>
    )
}

export default Attachment