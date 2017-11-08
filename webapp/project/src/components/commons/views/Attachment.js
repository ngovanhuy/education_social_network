import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Attachment = ({attachment}) => {
    const {type, typeFile, fileName, fileSize, source} = attachment
    const defaultImageDocument = "/images/basic-document.png"

    return(
        <div className="attachment clearfix">
            <Link to="#" target="_blank">
                <div className="preview-attachment">
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
                <div className="attachment-content">
                    <div className="attachment-file-name">{fileName}</div>
                    <div className="attachment-type">{type}</div>
                </div>
            </Link>
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