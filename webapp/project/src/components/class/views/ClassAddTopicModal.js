import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
// import TagsInput from 'react-tagsinput'
// import 'react-tagsinput/react-tagsinput.css'
import '../class.css'

const customTagsInput = {
    inputProps: {
        placeholder: 'Enter name or email'
    }
}

class ClassAddTopicModal extends Component {
    constructor() {
        super()
        this.state = {
            topicName: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        const {classId, modalIsOpen, onSubmit} = this.props
        var modalTitle = 'Add Topic';
        return (
            <Modal open={modalIsOpen}
                   onClose={this.props.closeModal} little>
                <h2 className="title-modal">{modalTitle}</h2>
                <form className="class-add-topic-modal form-horizontal" role="form">
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Topic Name</label>
                        <div className="col-sm-9 ">
                            <input type="text" className="form-control" id="topicName" name="topicName"
                                   value={this.state.topicName}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="modal-bottom clearfix">
                        <div className="pull-right">
                            <a href='#' className="btn btn-white" onClick={this.props.closeModal}>Cancel</a>
                            <a href='#' className="btn btn-primary"
                               onClick={() => onSubmit(classId, this.state.topicName)}>Create
                            </a>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default ClassAddTopicModal;