import React, {Component} from 'react'
import Modal from 'react-modal';

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

class CreateAnnouncementModal extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            content: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        const {userId, modalIsOpen, onSubmit} = this.props
        const {title, content} = this.state
        var modalTitle = 'Create New Announcement';
        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStylesModal}
                contentLabel="Create Announcement Modal">
                <h2>{modalTitle}</h2>
                <a href='#' className="mm-popup__close"
                   data-toggle="tooltip" data-placement="bottom" data-original-title="Close Modal"
                   onClick={this.props.closeModal}>×</a>
                <form className="create-class-modal form-horizontal" role="form">
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Title</label>
                        <div className="col-sm-9 ">
                            <input type="text" className="form-control" id="title" name="title"
                                   value={title}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Content</label>
                        <div className="col-sm-9 ">
                            <textarea className="form-control announcement-content" rows="4" name="content"
                                      value={content}
                                      onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    <div className="modal-bottom clearfix">
                        <div className="pull-right">
                            <a href='#' className="btn btn-white" onClick={this.props.closeModal}>Cancel</a>
                            <a href='#' className="btn btn-primary"
                               onClick={() => onSubmit(userId, title, content)}>Create</a>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default CreateAnnouncementModal;