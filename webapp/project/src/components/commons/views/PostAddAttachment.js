import React, {Component} from 'react'
import FileInput from '@ranyefet/react-file-input'
import {fileUtils} from '../../../utils'
import PostAttachmentsPreviewer from "./PostAttachmentsPreviewer";

class PostAddAttachment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filesInfo: []
        };
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleRemoveFile = this.handleRemoveFile.bind(this);
    }

    componentWillMount() {
        this.setState({
            filesInfo: fileUtils.filesToPlainArray(this.props.files),
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.files !== this.props.files) {
            this.setState({
                filesInfo: fileUtils.filesToPlainArray(nextProps.files),
            });
        }
    }

    handleUploadFile(event) {
        const file = event.target.files[0];
        if(file){
            this.props.onUploadFile(file)
            this.setState({
                filesInfo: [
                    ...this.state.filesInfo,
                    fileUtils.fileToPlainObject(file)
                ]
            });
        }
    }

    handleRemoveFile(index) {
        this.props.onRemoveUploadFile(index)
        this.setState({
            filesInfo: this.state.filesInfo.filter((_, i) => i !== index)
        })
    }

    render() {
        return (
            <div>
                <PostAttachmentsPreviewer filesInfo={this.state.filesInfo} onRemoveFile={this.handleRemoveFile}/>
                <div className="post-add-attachment">
                    <div className="row">
                        <div className="col-sm-12">
                            <FileInput name="file" onChange={this.handleUploadFile}>
                                <div className="post-add-file">
                                    <i className="fa fa-file"></i>
                                    Add file
                                </div>
                            </FileInput>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostAddAttachment;