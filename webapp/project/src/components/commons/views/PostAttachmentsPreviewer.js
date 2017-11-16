import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as FileUtil from '../../../utils/fileUtil'

class PostAttachmentsPreviewer extends Component{
    constructor(props) {
        super(props);
        this.renderFile = this.renderFile.bind(this);
    }

    static propTypes = {
        files: PropTypes.array,
    }

    renderFile(file, index) {
        return (
            <tr key={index}>
                <td>{file.name}</td>
                {/*<td>{file.type}</td>*/}
                {/*<td>{FileUtil.prettyFileSize(file.size)}</td>*/}
                {/*<td>{file.lastModifiedDate.toLocaleDateString()}</td>*/}
                <td className="text-right">
                    <a href="#" onClick={() => this.props.onRemoveFile(index)}><i className="fa fa-fw fa-times"></i></a>
                </td>
            </tr>
        );
    }

    render(){
        if (!this.props.files.length) return <div></div>;
        return(
            <table className="pure-table post-attachments-previewer table table-hover">
                <tbody>
                {this.props.files.map((file, index) => this.renderFile(file, index))}
                </tbody>
            </table>
        )
    }
}

export default PostAttachmentsPreviewer;