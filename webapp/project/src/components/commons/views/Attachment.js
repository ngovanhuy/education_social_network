import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Attachment = ({attachment}) => {
    const {type, typeFile, fileName, fileSize, source} = attachment
    const defaultImageDocument = "/images/basic-document.png"

    return (
        <div className="file clearfix">
            <div className="preview-file">
                {
                    type == "image" ?
                        <div className="preview-image">
                            <img src={source}/>
                        </div> :
                        <div className="document">
                            <img src={defaultImageDocument}/>
                        </div>
                }
            </div>
            <div className="file-content">
                <div className="file-file-name">{fileName}</div>
                <div className="file-type">{type}</div>
            </div>
        </div>
    )
}

Attachment.propTypes = {
    type: PropTypes.string,
    typeFile: PropTypes.string,
    fileName: PropTypes.string,
    fileSize: PropTypes.number,
    source: PropTypes.string
}

export default Attachment