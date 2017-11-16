import React, {Component} from 'react'
import { connect } from 'react-redux'
import FileInput from '@ranyefet/react-file-input'
import * as FileUtil from '../../../utils/fileUtil'
import PostAttachmentsPreviewer from "./PostAttachmentsPreviewer";

class PostAddAttachment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleRemoveFile = this.handleRemoveFile.bind(this);
    }

    handleUploadFile(event) {
        const file = event.target.files[0];
        this.setState({
            files: [
                ...this.state.files,
                FileUtil.fileToPlainObject(file)
            ]
        });
    }

    handleRemoveFile(index){
        this.setState({
            files: this.state.files.filter((_, i) => i !== index)
        })
    }

    render() {
        return (
            <div>
                <PostAttachmentsPreviewer files={this.state.files} onRemoveFile={this.handleRemoveFile}/>
                <div className="post-add-attachment">
                    <div className="row">
                        <div className="col-sm-12">
                            <a href="javascript:;" className="post-add-file">
                                <FileInput name="file" onChange={this.handleUploadFile}>
                                    <i className="fa fa-file"></i>
                                    Add file
                                </FileInput>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PostAddAttachment;