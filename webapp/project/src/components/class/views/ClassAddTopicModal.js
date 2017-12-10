import React, {Component} from 'react'
import Modal from 'react-modal';
// import TagsInput from 'react-tagsinput'
// import 'react-tagsinput/react-tagsinput.css'
import '../class.css'

const customStylesModal = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        position: 'absolute',
        top: '25%',
        left: '25%',
        right: '25%',
        bottom: 'unset',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
    }
};

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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStylesModal}
                contentLabel="Create Topic Modal">
                <h2>{modalTitle}</h2>
                <a href='#' className="mm-popup__close"
                        data-toggle="tooltip" data-placement="bottom" data-original-title="Close Modal"
                        onClick={this.props.closeModal}>×
                </a>
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